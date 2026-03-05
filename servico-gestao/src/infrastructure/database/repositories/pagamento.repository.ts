import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPagamentoRepository } from '../../../application/repositories/pagamento-repository.interface';
import { PagamentoSchema } from '../schemas/pagamento.schema';
import { Pagamento } from '../../../domain/entities/pagamento.entity';

@Injectable()
export class PagamentoRepository implements IPagamentoRepository {
    constructor(
        @InjectRepository(PagamentoSchema)
        private readonly repository: Repository<PagamentoSchema>,
    ) { }

    // Converte o Schema do Banco para a Entidade de Domínio
    private mapToDomain(schema: PagamentoSchema): Pagamento | null {
        if (!schema) return null;
        
        return new Pagamento({
            codPagamento: schema.codPagamento,
            codAssinatura: schema.codAssinatura,
            valorPago: schema.valorPago,
            dataPagamento: schema.dataPagamento,
        });
    }

    async salvar(pagamento: Pagamento): Promise<Pagamento> {
        const schema = this.repository.create({
            codPagamento: pagamento.codPagamento,
            codAssinatura: pagamento.codAssinatura,
            valorPago: pagamento.valorPago,
            dataPagamento: pagamento.dataPagamento,
        });
        
        const schemaSalvo = await this.repository.save(schema);
        return this.mapToDomain(schemaSalvo);
    }

    async buscarPorAssinatura(codAssinatura: number): Promise<Pagamento[]> {
        const schemas = await this.repository.find({ 
            where: { codAssinatura },
            order: { dataPagamento: 'DESC' } 
        });
        return schemas.map(schema => this.mapToDomain(schema));
    }

    async findAll(): Promise<Pagamento[]> {
        const schemas = await this.repository.find();
        return schemas.map(schema => this.mapToDomain(schema));
    }
}