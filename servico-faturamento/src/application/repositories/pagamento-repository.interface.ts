import { Pagamento } from '../../domain/entities/pagamento.entity';

export interface IPagamentoRepository {
  // Persiste um pagamento no banco de dados
  salvar(pagamento: Pagamento): Promise<Pagamento>;
}