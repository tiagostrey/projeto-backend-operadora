import { Cliente } from '../../domain/entities/cliente.entity';

export interface IClienteRepository {
    // Busca todos os planos cadastrados
    findAll(): Promise<Cliente[]>;

    // Busca um cliente específico pelo código
    findByCodigo(codigo: number): Promise<Cliente | null>;
}