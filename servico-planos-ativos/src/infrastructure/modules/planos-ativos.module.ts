import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConsultarPlanoAtivoUseCase } from '../../application/use-cases/consultar-plano-ativo.use-case';
import { PlanosAtivosController } from '../../interface/controllers/planos-ativos.controller';
import { PagamentoConsumer } from '../messaging/pagamento.consumer';

// Módulo responsável por consultar e informar se uma assinatura de plano está ativa
@Module({
    imports: [HttpModule],
    controllers: [PlanosAtivosController, PagamentoConsumer],
    providers: [
        {
            provide: 'HTTP_SERVICE',
            useExisting: HttpService,
        },
        ConsultarPlanoAtivoUseCase,
    ],
})
export class PlanosAtivosModule { }