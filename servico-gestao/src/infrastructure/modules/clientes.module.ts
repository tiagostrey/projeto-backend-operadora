import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteSchema } from '../database/schemas/cliente.schema';
import { ClienteRepository } from '../database/repositories/cliente.repository';
import { ClienteController } from '../../interface/controllers/cliente.controller';
import { CriarClienteUseCase } from '../../application/use-cases/criar-cliente.use-case';
import { ListarClientesUseCase } from '../../application/use-cases/listar-clientes.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([ClienteSchema])],
    controllers: [ClienteController],
    providers: [
        CriarClienteUseCase,
        ListarClientesUseCase,
        {
            provide: 'IClienteRepository',
            useClass: ClienteRepository,
        },
    ],
    exports: ['IClienteRepository'], // Importante para o módulo de Assinaturas depois
})
export class ClientesModule { }