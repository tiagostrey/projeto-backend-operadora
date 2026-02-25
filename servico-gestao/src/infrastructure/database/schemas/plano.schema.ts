import { EntitySchema } from 'typeorm';
import { Plano } from '../../../domain/entities/plano.entity';

export const PlanoSchema = new EntitySchema<Plano>({
  name: 'Plano',
  target: Plano,
  columns: {
    codigo: {
      type: Number,
      primary: true,
      generated: true,
    },
    nome: {
      type: String,
      length: 100,
    },
    custoMensal: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    data: {
      type: Date,
    },
    descricao: {
      type: String,
      length: 1000
    }
  },
});