import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../../domain/entities/cliente.entity';
import { IClienteRepository } from '../../../application/repositories/cliente-repository.interface';
import { ClienteSchema } from '../schemas/cliente.schema';

@Injectable()
export class ClienteRepository implements IClienteRepository {
    constructor(
        @InjectRepository(ClienteSchema)
        private readonly repository: Repository<ClienteSchema>,
    ) { }

    async findAll(): Promise<Cliente[]> {
        const schemas = await this.repository.find();
        return schemas.map(s => new Cliente(s.cpf, s.nome, s.email));
    }

    async findByCpf(cpf: string): Promise<Cliente | null> {
        const schema = await this.repository.findOne({ where: { cpf } });
        if (!schema) return null;
        return new Cliente(schema.cpf, schema.nome, schema.email);
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        const novoSchema = this.repository.create({
            cpf: cliente.cpf,
            nome: cliente.nome,
            email: cliente.email
        });

        await this.repository.save(novoSchema);
        return cliente;
    }

    async atualizar(cliente: Cliente): Promise<Cliente> {
        // O TypeORM reconhece o CPF (Primary Key). 
        // Como ele já existe no banco, o comando 'save' fará um UPDATE automaticamente.
        const schemaAtualizado = this.repository.create({
            cpf: cliente.cpf,
            nome: cliente.nome,
            email: cliente.email
        });

        await this.repository.save(schemaAtualizado);
        return cliente;
    }
}