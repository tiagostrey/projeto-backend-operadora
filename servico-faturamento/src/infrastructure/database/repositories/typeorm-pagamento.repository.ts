import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPagamentoRepository } from '../../../application/repositories/pagamento-repository.interface';
import { PagamentoSchema } from '../schemas/pagamento.schema';
import { Pagamento } from '../../../domain/entities/pagamento.entity';

// Implementação concreta do repositório de pagamentos usando o TypeORM
@Injectable()
export class TypeOrmPagamentoRepository implements IPagamentoRepository {
    constructor(
        @InjectRepository(PagamentoSchema)
        private readonly repository: Repository<Pagamento>,
    ) { }

    // Persiste o pagamento na base de dados do serviço de faturamento
    async salvar(pagamento: Pagamento): Promise<Pagamento> {
        return this.repository.save(pagamento);
    }
}