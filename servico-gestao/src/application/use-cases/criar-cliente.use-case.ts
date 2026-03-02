import { Inject, Injectable } from '@nestjs/common';
import { Cliente } from '../../domain/entities/cliente.entity';
import { CriarClienteDto } from '../dtos/criar-cliente.dto';
import { IClienteRepository } from '../repositories/cliente-repository.interface';

@Injectable()
export class CriarClienteUseCase {
    constructor(
        // Chama o contrato (interface) para acessar o banco de dados.
        @Inject('IClienteRepository')
        private readonly clienteRepository: IClienteRepository,
    ) { }

    // Recebe os dados do envelope (DTO) e promete devolver o Cliente criado
    async executar(dados: CriarClienteDto): Promise<Cliente> {

        // Verifica se o CPF já existe no banco de dados
        const clienteExistente = await this.clienteRepository.findByCpf(dados.cpf);

        if (clienteExistente) {
            throw new Error("CPF já cadastrado.");
        }

        // Cria uma nova entidade Cliente com os dados recebidos do DTO.
        const novoCliente = new Cliente(dados.cpf, dados.nome, dados.email);

        // Aguarda o banco de dados salvar o novo cliente antes de finalizar
        return await this.clienteRepository.salvar(novoCliente);
    }
}