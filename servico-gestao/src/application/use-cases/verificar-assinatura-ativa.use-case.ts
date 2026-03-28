import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';

@Injectable()
export class VerificarAssinaturaAtivaUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) { }

    // Verifica se a assinatura informada está ativa
    async executar(codAss: number): Promise<boolean> {
        const assinatura = await this.assinaturaRepository.buscarPorCodigo(codAss);

        if (!assinatura) {
            throw new NotFoundException(`Assinatura ${codAss} não encontrada.`);
        }

        // Verifica se o último pagamento foi há menos de 30 dias
        const hoje = new Date();
        const diasSemPagamento = Math.floor(
            (hoje.getTime() - new Date(assinatura.dataUltimoPagamento).getTime()) /
            (1000 * 60 * 60 * 24),
        );

        return diasSemPagamento <= 30;
    }
}