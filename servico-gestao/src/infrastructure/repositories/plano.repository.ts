import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plano } from '../../domain/entities/plano.entity';
import { IPlanoRepository } from '../../application/repositories/plano-repository.interface';
import { PlanoSchema } from '../database/schemas/plano.schema';

@Injectable()
export class PlanoRepository implements IPlanoRepository {
    constructor(
        // Injeta o repositório padrão do TypeORM configurado com o Schema
        @InjectRepository(PlanoSchema)
        private readonly ormRepository: Repository<Plano>,
    ) { }

    // Salva um plano no banco de dados
    async salvar(plano: Plano): Promise<Plano> {
        return await this.ormRepository.save(plano);
    }

    // Retorna a lista completa, com todos os planos cadastrados
    async findAll(): Promise<Plano[]> {
        return await this.ormRepository.find();
    }

    // Busca um plano específico pelo 'codigo'
    async findByCodigo(codigo: number): Promise<Plano | null> {
        return await this.ormRepository.findOne({ where: { codigo } });
    }
}