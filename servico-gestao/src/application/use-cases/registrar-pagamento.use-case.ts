import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';

@Injectable()
export class RegistrarPagamentoUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) { }

    // Atualiza a data do último pagamento da assinatura correspondente
    async executar(codAss: number, dataPagamento: Date): Promise<void> {
        const assinatura = await this.assinaturaRepository.buscarPorCodigo(codAss);

        if (!assinatura) {
            throw new NotFoundException(`Assinatura ${codAss} não encontrada.`);
        }

        // Atualiza a data de último pagamento para manter a assinatura ativa
        assinatura.dataUltimoPagamento = new Date(dataPagamento);
        await this.assinaturaRepository.salvar(assinatura);
    }
}