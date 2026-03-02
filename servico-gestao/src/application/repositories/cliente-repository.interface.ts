import { Cliente } from '../../domain/entities/cliente.entity';

export interface IClienteRepository {
    // Busca a lista completa, com todos os clientes cadastrados
    findAll(): Promise<Cliente[]>;

    // Busca um cliente específico pelo cpf
    // Se não achar nenhuma, devolve vazio (null).
    findByCpf(cpf: string): Promise<Cliente | null>;

    // Salva cadastro de novo cliente
    salvar(cliente: Cliente): Promise<Cliente>;

    // Atualiza cadastro de um cliente
    atualizar(cliente: Cliente): Promise<Cliente>;

}