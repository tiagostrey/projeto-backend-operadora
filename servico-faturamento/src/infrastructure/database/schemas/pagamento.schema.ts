import { EntitySchema } from 'typeorm';
import { Pagamento } from '../../../domain/entities/pagamento.entity';

export const PagamentoSchema = new EntitySchema<Pagamento>({
  name: 'Pagamento',
  target: Pagamento,
  tableName: 'pagamentos',
  columns: {
    codigo: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    codAss: {
      type: 'integer',
    },
    valorPago: {
      type: 'float',
    },
    dataPagamento: {
      type: 'date',
    },
  },
});