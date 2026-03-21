import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPlanoRepository } from '../../../application/repositories/plano-repository.interface';
import { PlanoSchema } from '../schemas/plano.schema';
import { Plano } from '../../../domain/entities/plano.entity';

// Implementação do repositório de planos
@Injectable()
export class TypeOrmPlanoRepository implements IPlanoRepository {
    constructor(
        @InjectRepository(PlanoSchema)
        private readonly repository: Repository<Plano>,
    ) { }

    // Busca todos os planos disponíveis
    async buscarTodos(): Promise<Plano[]> {
        return this.repository.find();
    }

    // Busca um plano específico pelo seu código identificador
    async buscarPorCodigo(codigo: number): Promise<Plano> {
        return this.repository.findOne({ where: { codigo } });
    }

    // Persiste ou atualiza os dados de um plano
    async salvar(plano: Plano): Promise<Plano> {
        return this.repository.save(plano);
    }
}