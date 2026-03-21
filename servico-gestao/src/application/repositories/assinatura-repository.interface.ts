import { Assinatura } from '../../domain/entities/assinatura.entity';

// Define o contrato que qualquer repositório de assinaturas deve seguir
export interface IAssinaturaRepository {
    // Salva ou atualiza uma assinatura no banco de dados
    salvar(assinatura: Assinatura): Promise<Assinatura>;

    // Busca uma assinatura pelo código — retorna null se não encontrar
    buscarPorCodigo(codigo: number): Promise<Assinatura | null>;

    // Busca assinaturas filtrando por tipo (TODOS, ATIVOS, CANCELADOS)
    buscarPorTipo(tipo: string): Promise<Assinatura[]>;

    // Busca todas as assinaturas de um cliente específico
    buscarPorCliente(codCli: number): Promise<Assinatura[]>;

    // Busca todas as assinaturas de um plano específico
    buscarPorPlano(codPlano: number): Promise<Assinatura[]>;
}