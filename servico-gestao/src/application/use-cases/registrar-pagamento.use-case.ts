import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPagamentoRepository } from '../repositories/pagamento-repository.interface';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';
import { Pagamento } from '../../domain/entities/pagamento.entity';

export interface RegistrarPagamentoDto {
    codAssinatura: number;
    valorPago: number;
}

@Injectable()
export class RegistrarPagamentoUseCase {
    constructor(
        @Inject('IPagamentoRepository')
        private readonly pagamentoRepository: IPagamentoRepository,
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) {}

    async executar(dados: RegistrarPagamentoDto): Promise<Pagamento> {
        // 1. Valida se a Assinatura existe
        const assinatura = await this.assinaturaRepository.findByCodigo(dados.codAssinatura);
        if (!assinatura) {
            throw new NotFoundException(`Assinatura ${dados.codAssinatura} não encontrada.`);
        }

        // 2. Cria a entidade de Pagamento (gera data atual automaticamente)
        const novoPagamento = new Pagamento({
            codAssinatura: dados.codAssinatura,
            valorPago: dados.valorPago
        });

        // 3. Persiste o pagamento
        const pagamentoSalvo = await this.pagamentoRepository.salvar(novoPagamento);

        // 4. Atualiza a data do último pagamento na Assinatura
        assinatura.dataUltimoPagamento = pagamentoSalvo.dataPagamento;
        await this.assinaturaRepository.salvar(assinatura);

        return pagamentoSalvo;
    }
}