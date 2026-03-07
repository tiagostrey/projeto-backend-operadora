import { EntitySchema } from 'typeorm';
import { Plano } from '../../../domain/entities/plano.entity';

export const PlanoSchema = new EntitySchema<Plano>({
  name: 'Plano',
  target: Plano,
  tableName: 'planos',
  columns: {
    codigo: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    nome: {
      type: 'varchar',
    },
    custoMensal: {
      type: 'float',
    },
    data: {
      type: 'datetime',
      updateDate: true,
    },
    descricao: {
      type: 'text',
    },
  },
});