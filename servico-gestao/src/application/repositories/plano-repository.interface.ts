import { Plano } from '../../domain/entities/plano.entity';

export interface IPlanoRepository {
    // Busca todos os planos cadastrados
    findAll(): Promise<Plano[]>;

    // Busca um plano específico pelo código
    findByCodigo(codigo: number): Promise<Plano | null>;
}