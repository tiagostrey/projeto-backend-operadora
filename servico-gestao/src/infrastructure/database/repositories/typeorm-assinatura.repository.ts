import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThanOrEqual } from 'typeorm';
import { IAssinaturaRepository } from '../../../application/repositories/assinatura-repository.interface';
import { AssinaturaSchema } from '../schemas/assinatura.schema';
import { Assinatura } from '../../../domain/entities/assinatura.entity';

@Injectable()
export class TypeOrmAssinaturaRepository implements IAssinaturaRepository {
    constructor(
        @InjectRepository(AssinaturaSchema)
        private readonly repository: Repository<Assinatura>,
    ) { }

    // Busca assinaturas filtrando por tipo de status
    async buscarPorTipo(tipo: string): Promise<Assinatura[]> {
        const hoje = new Date();

        // Filtra por datas de fidelidade para determinar ATIVOS ou CANCELADOS.
        if (tipo === 'ATIVOS') {
            return this.repository.find({ where: { fimFidelidade: MoreThan(hoje) } });
        }
        if (tipo === 'CANCELADOS') {
            return this.repository.find({ where: { fimFidelidade: LessThanOrEqual(hoje) } });
        }
        return this.repository.find();
    }

    // Busca todas as assinaturas vinculadas a um cliente
    async buscarPorCliente(codCli: number): Promise<Assinatura[]> {
        return this.repository.find({ where: { codCli } });
    }

    // Busca todas as assinaturas vinculadas a um plano
    async buscarPorPlano(codPlano: number): Promise<Assinatura[]> {
        return this.repository.find({ where: { codPlano } });
    }
    
    // Persiste uma nova assinatura no banco de dados
    async salvar(assinatura: Assinatura): Promise<Assinatura> {
        // Grava os dados da assinatura na tabela correspondente.
        return this.repository.save(assinatura);
    }

    async buscarPorCodigo(codigo: number): Promise<Assinatura | null> {
        return this.repository.findOne({ where: { codigo } });
    }
}