import { Pagamento } from '../../domain/entities/pagamento.entity';

export interface IPagamentoRepository {
    // Salva um novo registro de pagamento no sistema
    salvar(pagamento: Pagamento): Promise<Pagamento>;

    // Busca o histórico de pagamentos de uma assinatura específica
    buscarPorAssinatura(codAssinatura: number): Promise<Pagamento[]>;

    // Busca todos os pagamentos realizados no sistema (opcional/útil)
    findAll(): Promise<Pagamento[]>;
}