import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';
import { IClienteRepository } from '../repositories/cliente-repository.interface';
import { IPlanoRepository } from '../repositories/plano-repository.interface';
import { Assinatura } from '../../domain/entities/assinatura.entity';

export interface CriarAssinaturaDto {
    cpf: string;
    codPlano: number;
}

@Injectable()
export class CriarAssinaturaUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
        @Inject('IClienteRepository')
        private readonly clienteRepository: IClienteRepository,
        @Inject('IPlanoRepository')
        private readonly planoRepository: IPlanoRepository,
    ) {}

    async executar(dados: CriarAssinaturaDto): Promise<Assinatura> {
        // 1. Valida a existência do Cliente
        const cliente = await this.clienteRepository.findByCpf(dados.cpf);
        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado no sistema.');
        }

        // 2. Valida a existência do Plano
        const plano = await this.planoRepository.findByCodigo(dados.codPlano);
        if (!plano) {
            throw new NotFoundException('Plano não encontrado no sistema.');
        }

        // 3. Instancia a Entidade (aplica os valores padrão: status true, data atual)
        const novaAssinatura = new Assinatura({
            cpf: dados.cpf,
            codPlano: dados.codPlano
        });

        // 4. Persiste no banco de dados
        return await this.assinaturaRepository.salvar(novaAssinatura);
    }
}