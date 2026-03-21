import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssinaturaSchema } from '../database/schemas/assinatura.schema';
import { AssinaturasController } from '../../interface/controllers/assinatura.controller';
import { CriarAssinaturaUseCase } from '../../application/use-cases/criar-assinatura.use-case';
import { ListarAssinaturasPorTipoUseCase } from '../../application/use-cases/listar-assinaturas-por-tipo.use-case';
import { ListarAssinaturasPorClienteUseCase } from '../../application/use-cases/listar-assinaturas-por-cliente.use-case';
import { ListarAssinaturasPorPlanoUseCase } from '../../application/use-cases/listar-assinaturas-por-plano.use-case';
import { RegistrarPagamentoUseCase } from '../../application/use-cases/registrar-pagamento.use-case';
import { VerificarAssinaturaAtivaUseCase } from '../../application/use-cases/verificar-assinatura-ativa.use-case';
import { TypeOrmAssinaturaRepository } from '../database/repositories/typeorm-assinatura.repository';
import { PagamentoConsumer } from '../messaging/pagamento.consumer';

// Módulo responsável por gerenciar as assinaturas e consumir eventos de pagamento
@Module({
    imports: [TypeOrmModule.forFeature([AssinaturaSchema])],
    controllers: [AssinaturasController, PagamentoConsumer],
    providers: [
        CriarAssinaturaUseCase,
        ListarAssinaturasPorTipoUseCase,
        ListarAssinaturasPorClienteUseCase,
        ListarAssinaturasPorPlanoUseCase,
        RegistrarPagamentoUseCase,
        VerificarAssinaturaAtivaUseCase,
        {
            provide: 'IAssinaturaRepository',
            useClass: TypeOrmAssinaturaRepository,
        },
    ],
    exports: ['IAssinaturaRepository'],
})
export class AssinaturasModule { }