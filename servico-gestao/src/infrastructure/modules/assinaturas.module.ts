import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssinaturaSchema } from '../database/schemas/assinatura.schema';
import { AssinaturaRepository } from '../database/repositories/assinatura.repository';
import { AssinaturaController } from '../../interface/controllers/assinatura.controller';
import { CriarAssinaturaUseCase } from '../../application/use-cases/criar-assinatura.use-case';
import { BuscarAssinaturasPorCpfUseCase } from '../../application/use-cases/buscar-assinaturas-por-cpf.use-case';
import { ClientesModule } from './clientes.module';
import { PlanosModule } from './planos.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AssinaturaSchema]),
        ClientesModule,
        PlanosModule,
    ],
    controllers: [AssinaturaController],
    providers: [
        CriarAssinaturaUseCase,
        BuscarAssinaturasPorCpfUseCase,
        {
            provide: 'IAssinaturaRepository',
            useClass: AssinaturaRepository,
        },
    ],
})
export class AssinaturasModule {}