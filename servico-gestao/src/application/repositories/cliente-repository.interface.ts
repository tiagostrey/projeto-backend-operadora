import { Cliente } from '../../domain/entities/cliente.entity';

export interface IClienteRepository {
    // Busca a lista completa, ccom todos os clientes cadastrados
    findAll(): Promise<Cliente[]>;

    // Busca um cliente específico pelo código
    // Se não achar nenhuma, devolve vazio (null).
    findByCodigo(codigo: number): Promise<Cliente | null>;
}