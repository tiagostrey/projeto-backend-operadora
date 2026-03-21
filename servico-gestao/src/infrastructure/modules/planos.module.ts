import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoSchema } from '../database/schemas/plano.schema';
import { PlanosController } from '../../interface/controllers/planos.controller';
import { ListarPlanosUseCase } from '../../application/use-cases/listar-planos.use-case';
import { AtualizarCustoPlanoUseCase } from '../../application/use-cases/atualizar-custo-plano.use-case';
import { TypeOrmPlanoRepository } from '../database/repositories/typeorm-plano.repository';

// Módulo responsável por gerenciar os planos disponíveis para assinatura
@Module({
    imports: [TypeOrmModule.forFeature([PlanoSchema])],
    controllers: [PlanosController],
    providers: [
        ListarPlanosUseCase,
        AtualizarCustoPlanoUseCase,
        {
            provide: 'IPlanoRepository',
            useClass: TypeOrmPlanoRepository,
        },
    ],
    exports: ['IPlanoRepository'], // Exportado para o SeedService poder usar
})
export class PlanosModule { }