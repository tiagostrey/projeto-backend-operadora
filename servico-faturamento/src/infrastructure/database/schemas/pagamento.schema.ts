import { EntitySchema } from 'typeorm';
import { Pagamento } from '../../../domain/entities/pagamento.entity';

// Mapeia a entidade Pagamento para a tabela 'pagamentos' no banco de dados
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