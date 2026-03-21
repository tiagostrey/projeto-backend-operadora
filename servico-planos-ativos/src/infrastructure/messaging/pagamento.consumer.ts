import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ConsultarPlanoAtivoUseCase } from '../../application/use-cases/consultar-plano-ativo.use-case';

// Consumidor responsável por escutar eventos de pagamento e invalidar o cache correspondente
@Controller()
export class PagamentoConsumer {
    constructor(
        private readonly consultarPlanoAtivoUseCase: ConsultarPlanoAtivoUseCase,
    ) { }

    // Consome evento de pagamento e invalida o cache da assinatura correspondente
    @EventPattern('PagamentoPlanoServicoPlanosAtivos')
    async handlePagamento(@Payload() data: any): Promise<void> {
        this.consultarPlanoAtivoUseCase.invalidarCache(data.codAss);
    }
}