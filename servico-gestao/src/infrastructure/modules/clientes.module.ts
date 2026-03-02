import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteSchema } from '../database/schemas/cliente.schema';
import { ClienteRepository } from '../database/repositories/cliente.repository';
import { ClienteController } from '../../interface/controllers/cliente.controller';
import { CriarClienteUseCase } from '../../application/use-cases/criar-cliente.use-case';
import { ListarClientesUseCase } from '../../application/use-cases/listar-clientes.use-case';
import { AtualizarClienteUseCase } from '../../application/use-cases/atualizar-cliente.use-case'; // Novo

@Module({
    imports: [TypeOrmModule.forFeature([ClienteSchema])],
    controllers: [ClienteController],
    providers: [
        CriarClienteUseCase,
        ListarClientesUseCase,
        AtualizarClienteUseCase,
        {
            provide: 'IClienteRepository',
            useClass: ClienteRepository,
        },
    ],
    exports: ['IClienteRepository'],
})
export class ClientesModule { }