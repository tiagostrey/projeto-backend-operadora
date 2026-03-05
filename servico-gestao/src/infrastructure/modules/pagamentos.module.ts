import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoSchema } from '../database/schemas/pagamento.schema';
import { PagamentoRepository } from '../database/repositories/pagamento.repository';
import { PagamentoController } from '../../interface/controllers/pagamento.controller';
import { RegistrarPagamentoUseCase } from '../../application/use-cases/registrar-pagamento.use-case';
import { AssinaturasModule } from './assinaturas.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PagamentoSchema]),
        AssinaturasModule, // Necessário para injetar IAssinaturaRepository no Use Case
    ],
    controllers: [PagamentoController],
    providers: [
        RegistrarPagamentoUseCase,
        {
            provide: 'IPagamentoRepository',
            useClass: PagamentoRepository,
        },
    ],
})
export class PagamentosModule {}