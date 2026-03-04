import { Assinatura } from '../../domain/entities/assinatura.entity';

export interface IAssinaturaRepository {
    // Busca a lista completa, com todas as assinaturas cadastradas
    findAll(): Promise<Assinatura[]>;

    // Busca uma assinatura específica pelo código
    // Se não achar nenhuma, devolve vazio (null).
    findByCodigo(codigo: number): Promise<Assinatura | null>;

    // Salva cadastro de nova assinatura
    salvar(assinatura: Assinatura): Promise<Assinatura>;
    
    // Busca assinatura vinculada ao CPF do cliente
    findByCpf(cpf: string): Promise<Assinatura | null>;
}