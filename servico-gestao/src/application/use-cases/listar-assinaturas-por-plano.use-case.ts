import { Injectable, Inject } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';

@Injectable()
export class ListarAssinaturasPorPlanoUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) { }
    // Busca e retorna todas as assinaturas do plano informado com o status calculado
    async executar(codPlano: number): Promise<any[]> {
        const assinaturas = await this.assinaturaRepository.buscarPorPlano(codPlano);

        return assinaturas.map(ass => {
            const isAtivo = this.verificarAtivo(ass.fimFidelidade, ass.dataUltimoPagamento);
            return {
                "código assinatura": ass.codigo,
                "código cliente": ass.codCli,
                "código plano": ass.codPlano,
                "data de início": ass.inicioFidelidade,
                "data de fim": ass.fimFidelidade,
                "status": isAtivo ? 'ATIVO' : 'CANCELADO'
            };
        });
    }

    // Verifica se a assinatura está ativa considerando fidelidade e último pagamento
    private verificarAtivo(fimFidelidade: Date, dataUltimoPagamento: Date): boolean {
        const hoje = new Date();
        const fimValido = new Date(fimFidelidade) > hoje;
        const diasSemPagamento = Math.floor(
            (hoje.getTime() - new Date(dataUltimoPagamento).getTime()) / (1000 * 60 * 60 * 24)
        );
        return fimValido && diasSemPagamento <= 30;
    }
}