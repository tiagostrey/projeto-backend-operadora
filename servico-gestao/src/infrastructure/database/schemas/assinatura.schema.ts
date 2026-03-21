import { EntitySchema } from 'typeorm';
import { Assinatura } from '../../../domain/entities/assinatura.entity';

// Mapeia a entidade Assinatura para a tabela 'assinaturas' no banco de dados
export const AssinaturaSchema = new EntitySchema<Assinatura>({
  name: 'Assinatura',
  target: Assinatura,
  tableName: 'assinaturas',
  columns: {
    codigo: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    codPlano: {
      type: 'integer',
    },
    codCli: {
      type: 'integer',
    },
    inicioFidelidade: {
      type: 'date',
    },
    fimFidelidade: {
      type: 'date',
    },
    dataUltimoPagamento: {
      type: 'date',
    },
    custoFinal: {
      type: 'float',
    },
    descricao: {
      type: 'text',
    },
  },
});