import { Injectable, Inject } from '@nestjs/common';
import { IClienteRepository } from '../repositories/cliente-repository.interface';
import { Cliente } from '../../domain/entities/cliente.entity';

@Injectable()
export class ListarClientesUseCase {
    constructor(
        @Inject('IClienteRepository')
        private readonly clienteRepository: IClienteRepository,
    ) { }

    // Executa a listagem de todos os clientes cadastrados
    async executar(): Promise<Cliente[]> {
        // Busca: Localiza todos os clientes através do repositório.
        return this.clienteRepository.buscarTodos();
    }
}