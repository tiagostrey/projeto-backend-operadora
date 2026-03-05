import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAssinaturaRepository } from '../../../application/repositories/assinatura-repository.interface';
import { AssinaturaSchema } from '../schemas/assinatura.schema';
import { Assinatura } from '../../../domain/entities/assinatura.entity';

@Injectable()
export class AssinaturaRepository implements IAssinaturaRepository {
    constructor(
        @InjectRepository(AssinaturaSchema)
        private readonly repository: Repository<AssinaturaSchema>,
    ) { }

    // Mapeador: Transforma o dado do Banco (Schema) na regra de negócio (Entidade)
    private mapToDomain(schema: AssinaturaSchema): Assinatura | null {
        if (!schema) return null;
        
        return new Assinatura({
            codAssinatura: schema.codAssinatura,
            codPlano: schema.codPlano,
            cpf: schema.cpf,
            dataInicio: schema.dataInicio,
            dataFim: schema.dataFim,
            dataUltimoPagamento: schema.dataUltimoPagamento,
            status: schema.status,
        });
    }

    async findAll(): Promise<Assinatura[]> {
        const schemas = await this.repository.find();
        return schemas.map(schema => this.mapToDomain(schema));
    }

    async findByCodigo(codigo: number): Promise<Assinatura | null> {
        const schema = await this.repository.findOne({ where: { codAssinatura: codigo } });
        return this.mapToDomain(schema);
    }

    async findByCpf(cpf: string): Promise<Assinatura | null> {
        const schema = await this.repository.findOne({ where: { cpf } });
        return this.mapToDomain(schema);
    }

    async salvar(assinatura: Assinatura): Promise<Assinatura> {
        const schema = this.repository.create({
            codAssinatura: assinatura.codAssinatura,
            codPlano: assinatura.codPlano,
            cpf: assinatura.cpf,
            dataInicio: assinatura.dataInicio,
            dataFim: assinatura.dataFim,
            dataUltimoPagamento: assinatura.dataUltimoPagamento,
            status: assinatura.status,
        });
        
        const schemaSalvo = await this.repository.save(schema);
        return this.mapToDomain(schemaSalvo);
    }
}