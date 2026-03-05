import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';
import { Assinatura } from '../../domain/entities/assinatura.entity';

@Injectable()
export class BuscarAssinaturasPorCpfUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) {}

    async executar(cpf: string): Promise<Assinatura> {
        const assinatura = await this.assinaturaRepository.findByCpf(cpf);

        if (!assinatura) {
            throw new NotFoundException(`Nenhuma assinatura ativa encontrada para o CPF: ${cpf}`);
        }

        return assinatura;
    }
}