import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RegistrarPagamentoUseCase } from '../../application/use-cases/registrar-pagamento.use-case';

@Controller()
export class PagamentoConsumer {
    constructor(
        private readonly registrarPagamentoUseCase: RegistrarPagamentoUseCase,
    ) { }

    // Consome o evento de pagamento enviado pelo ServicoFaturamento via RabbitMQ
    @EventPattern('PagamentoPlanoServicoGestao')
    async handlePagamento(@Payload() data: any) {
        const dataPagamento = new Date(data.ano, data.mes - 1, data.dia);
        await this.registrarPagamentoUseCase.executar(data.codAss, dataPagamento);
    }
}