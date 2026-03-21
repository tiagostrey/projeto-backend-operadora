import { EntitySchema } from 'typeorm';
import { Cliente } from '../../../domain/entities/cliente.entity';

// Mapeia a entidade Cliente para a tabela 'clientes' no banco de dados
export const ClienteSchema = new EntitySchema<Cliente>({
  name: 'Cliente',
  target: Cliente,
  tableName: 'clientes',
  columns: {
    codigo: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    nome: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
  },
});