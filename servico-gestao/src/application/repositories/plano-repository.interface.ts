import { Plano } from '../../domain/entities/plano.entity';

export interface IPlanoRepository {
    // Busca a lista completa, com todos os planos cadastrados
    findAll(): Promise<Plano[]>;

    // Busca um plano específico pelo código
    // Se não achar nenhuma, devolve vazio (null).
    findByCodigo(codigo: number): Promise<Plano | null>;

    // Grava o plano no banco de dados.
    // Ele devolve o plano salvo para podermos ver o código (ID) que o banco gerou.
    salvar(plano: Plano): Promise<Plano>;
}