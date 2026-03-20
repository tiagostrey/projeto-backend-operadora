import { Cliente } from '../../domain/entities/cliente.entity';

export interface IClienteRepository {
    // Busca a lista completa, com todos os clientes cadastrados
    buscarTodos(): Promise<Cliente[]>;

    // Salva cadastro de novo cliente
    salvar(cliente: Cliente): Promise<Cliente>;

}