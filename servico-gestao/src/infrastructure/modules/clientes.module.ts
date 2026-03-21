import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteSchema } from '../database/schemas/cliente.schema';
import { ClientesController } from '../../interface/controllers/cliente.controller';
import { ListarClientesUseCase } from '../../application/use-cases/listar-clientes.use-case';
import { TypeOrmClienteRepository } from '../database/repositories/typeorm-cliente.repository';

// Módulo responsável por gerenciar os clientes cadastrados no sistema
@Module({
    imports: [TypeOrmModule.forFeature([ClienteSchema])],
    controllers: [ClientesController], // O nome da classe exportada deve ser plural
    providers: [
        ListarClientesUseCase,
        {
            provide: 'IClienteRepository',
            useClass: TypeOrmClienteRepository,
        },
    ],
    exports: ['IClienteRepository'], // Exportado para o SeedService poder usar
})
export class ClientesModule { }