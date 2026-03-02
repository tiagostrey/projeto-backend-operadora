import { Inject, Injectable } from '@nestjs/common';
import { Cliente } from '../../domain/entities/cliente.entity';
import { IClienteRepository } from '../repositories/cliente-repository.interface';

@Injectable()
export class ListarClientesUseCase {
    constructor(
        // Chama o contrato (interface) para acessar os dados dos clientes.
        @Inject('IClienteRepository')
        private readonly clienteRepository: IClienteRepository,
    ) { }

    // Busca e devolve a lista completa de clientes cadastrados
    async executar(): Promise<Cliente[]> {
        // Aguarda o repositório buscar todos os registros no banco de dados
        return await this.clienteRepository.findAll();
    }
}