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

        const hoje = new Date();

        // Verifica se o período de fidelidade ainda está vigente
        const fimValido = new Date(assinatura.fimFidelidade) > hoje;

        // Verifica se o último pagamento foi há menos de 30 dias
        const diasSemPagamento = Math.floor(
            (hoje.getTime() - new Date(assinatura.dataUltimoPagamento).getTime()) /
            (1000 * 60 * 60 * 24),
        );

        return fimValido && diasSemPagamento <= 30;
    }
}