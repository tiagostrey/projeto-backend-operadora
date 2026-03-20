import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssinaturaSchema } from '../database/schemas/assinatura.schema';
import { AssinaturasController } from '../../interface/controllers/assinatura.controller';
import { CriarAssinaturaUseCase } from '../../application/use-cases/criar-assinatura.use-case';
import { ListarAssinaturasPorTipoUseCase } from '../../application/use-cases/listar-assinaturas-por-tipo.use-case';
import { ListarAssinaturasPorClienteUseCase } from '../../application/use-cases/listar-assinaturas-por-cliente.use-case';
import { ListarAssinaturasPorPlanoUseCase } from '../../application/use-cases/listar-assinaturas-por-plano.use-case'; // Importado
import { TypeOrmAssinaturaRepository } from '../database/repositories/typeorm-assinatura.repository';

@Module({
    imports: [TypeOrmModule.forFeature([AssinaturaSchema])],
    controllers: [AssinaturasController],
    providers: [
        CriarAssinaturaUseCase,
        ListarAssinaturasPorTipoUseCase,
        ListarAssinaturasPorClienteUseCase,
        ListarAssinaturasPorPlanoUseCase, // Adicionado aqui
        {
            provide: 'IAssinaturaRepository',
            useClass: TypeOrmAssinaturaRepository,
        },
    ],
    exports: ['IAssinaturaRepository'],
})
export class AssinaturasModule { }