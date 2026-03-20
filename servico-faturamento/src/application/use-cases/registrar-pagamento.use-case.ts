import { Injectable, Inject } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import { IPagamentoRepository } from '../repositories/pagamento-repository.interface';
import { Pagamento } from '../../domain/entities/pagamento.entity';
import { RegistrarPagamentoDto } from '../dtos/registrar-pagamento.dto';

@Injectable()
export class RegistrarPagamentoUseCase {
  constructor(
    @Inject('IPagamentoRepository')
    private readonly pagamentoRepository: IPagamentoRepository,
    @Inject('RABBITMQ_CLIENT')
    private readonly rabbitClient: ClientProxy,
  ) {}

  async executar(dto: RegistrarPagamentoDto): Promise<void> {
    // Monta a data de pagamento a partir dos campos separados
    const dataPagamento = new Date(dto.ano, dto.mes - 1, dto.dia);

    // Cria e persiste a entidade de pagamento no banco do faturamento
    const novoPagamento = new Pagamento({
      codAss: dto.codAss,
      valorPago: dto.valorPago,
      dataPagamento,
    });

    await this.pagamentoRepository.salvar(novoPagamento);

    // Monta o corpo do evento conforme especificação
    const corpoEvento = {
      dia: dto.dia,
      mes: dto.mes,
      ano: dto.ano,
      codAss: dto.codAss,
      valorPago: dto.valorPago,
    };

    // Publica evento para o ServicoGestao atualizar a assinatura
    this.rabbitClient.emit('PagamentoPlanoServicoGestao', corpoEvento);

    // Publica evento para o ServicoPlanosAtivos invalidar o cache
    this.rabbitClient.emit('PagamentoPlanoServicoPlanosAtivos', corpoEvento);
  }
}