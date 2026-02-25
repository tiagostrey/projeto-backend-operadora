import { Assinatura } from '../../domain/entities/assinatura.entity';

export interface IAssinaturaRepository {
    // Busca a lista completa, com todas as assinaturas cadastradas
    findAll(): Promise<Assinatura[]>;

    // Busca uma assinatura específica pelo código
    // Se não achar nenhuma, devolve vazio (null).
    findByCodigo(codigo: number): Promise<Assinatura | null>;

    /**
    * Grava uma assinatura nova no banco de dados.
    * O 'void' significa que ele só vai salvar e não precisa devolver nenhuma informação para a tela.
    */
    create(assinatura: Assinatura): Promise<void>;
}