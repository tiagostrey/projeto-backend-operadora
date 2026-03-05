import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssinaturaSchema } from '../database/schemas/assinatura.schema';
import { AssinaturaRepository } from '../database/repositories/assinatura.repository';
import { AssinaturaController } from '../../interface/controllers/assinatura.controller';
import { CriarAssinaturaUseCase } from '../../application/use-cases/criar-assinatura.use-case';
import { ClientesModule } from './clientes.module'; // Importando para ter acesso ao repositório
import { PlanosModule } from './planos.module';     // Importando para ter acesso ao repositório

@Module({
    imports: [
        TypeOrmModule.forFeature([AssinaturaSchema]),
        ClientesModule,
        PlanosModule,
    ],
    controllers: [AssinaturaController],
    providers: [
        CriarAssinaturaUseCase,
        {
            provide: 'IAssinaturaRepository',
            useClass: AssinaturaRepository,
        },
    ],
})
export class AssinaturasModule {}