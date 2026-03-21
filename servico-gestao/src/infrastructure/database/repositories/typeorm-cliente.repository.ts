import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IClienteRepository } from '../../../application/repositories/cliente-repository.interface';
import { ClienteSchema } from '../schemas/cliente.schema';
import { Cliente } from '../../../domain/entities/cliente.entity';

// Implementação do repositório de clientes
@Injectable()
export class TypeOrmClienteRepository implements IClienteRepository {
  constructor(
    @InjectRepository(ClienteSchema)
    private readonly repository: Repository<Cliente>,
  ) { }

  // Busca todos os clientes cadastrados na tabela
  async buscarTodos(): Promise<Cliente[]> {
    return this.repository.find();
  }

  // Busca um cliente específico pelo código para evitar duplicados no Seed
  async buscarPorCodigo(codigo: number): Promise<Cliente | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  // Persistência: Grava os dados do cliente (utilizado pelo SeedService)
  async salvar(cliente: Cliente): Promise<Cliente> {
    return this.repository.save(cliente);
  }
}