import { EntitySchema } from 'typeorm';
import { Cliente } from '../../../domain/entities/cliente.entity';

export const ClienteSchema = new EntitySchema<Cliente>({
  name: 'Cliente',
  target: Cliente,
  columns: {
    codigo: {
      type: Number,
      primary: true,
      generated: true,
    },
    nome: {
      type: String,
      length: 150,
    },
    email: {
      type: String,
      length: 150,
      unique: true,
    },
  },
});