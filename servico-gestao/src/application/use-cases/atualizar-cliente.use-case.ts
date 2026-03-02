import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClienteRepository } from '../repositories/cliente-repository.interface';
import { AtualizarClienteDto } from '../dtos/atualizar-cliente.dto';
import { Cliente } from '../../domain/entities/cliente.entity';

@Injectable()
export class AtualizarClienteUseCase {
    constructor(
        @Inject('IClienteRepository')
        private readonly clienteRepository: IClienteRepository,
    ) { }

    async executar(cpf: string, dados: AtualizarClienteDto): Promise<Cliente> {
        // Busca cliente no banco de dados
        const clienteExistente = await this.clienteRepository.findByCpf(cpf);

        // Valida se o cliente existe
        if (!clienteExistente) {
            throw new NotFoundException('Cliente não encontrado.');
        }

        // Atualiza os campos enviados
        const clienteAtualizado = new Cliente(
            clienteExistente.cpf, // O CPF nunca muda
            dados.nome ?? clienteExistente.nome,
            dados.email ?? clienteExistente.email
        );

        // Persiste a alteração no banco
        return await this.clienteRepository.atualizar(clienteAtualizado);
    }
}