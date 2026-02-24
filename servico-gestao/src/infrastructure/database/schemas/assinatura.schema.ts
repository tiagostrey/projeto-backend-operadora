import { EntitySchema } from 'typeorm';
import { Assinatura } from '../../../domain/entities/assinatura.entity';

export const AssinaturaSchema = new EntitySchema<Assinatura>({
  name: 'Assinatura',
  target: Assinatura,
  columns: {
    codigo: {
      type: Number,
      primary: true,
      generated: true,
    },
    codPlano: {
      type: Number,
    },
    codCliente: {
      type: Number,
    },
    inicioVigencia: {
      type: Date,
    },
    fimVigencia: {
      type: Date,
    },
  },
});