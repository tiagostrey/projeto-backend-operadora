import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';

@Injectable()
export class ListarAssinaturasPorTipoUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) { }

    async executar(tipo: string): Promise<any[]> {
        const tipoUpper = tipo.toUpperCase();
        const tiposValidos = ['TODOS', 'ATIVOS', 'CANCELADOS'];

        if (!tiposValidos.includes(tipoUpper)) {
            throw new BadRequestException('Tipo inválido. Use TODOS, ATIVOS ou CANCELADOS.');
        }

        const assinaturas = await this.assinaturaRepository.buscarPorTipo(tipoUpper);

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