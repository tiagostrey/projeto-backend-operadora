import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';

@Injectable()
export class ListarAssinaturasPorTipoUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) { }

    async executar(tipo: string): Promise<any[]> {
        // Normaliza o tipo para maiúsculas e valida se é um valor aceito
        const tipoUpper = tipo.toUpperCase();
        const tiposValidos = ['TODOS', 'ATIVOS', 'CANCELADOS'];

        if (!tiposValidos.includes(tipoUpper)) {
            throw new BadRequestException('Tipo inválido. Use TODOS, ATIVOS ou CANCELADOS.');
        }

        const assinaturas = await this.assinaturaRepository.buscarPorTipo(tipoUpper);

        return assinaturas.map(ass => {
            const isAtivo = this.verificarAtivo(ass.dataUltimoPagamento);
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

    // Verifica se a assinatura está ativa com base no último pagamento (máximo 30 dias)
    private verificarAtivo(dataUltimoPagamento: Date): boolean {
        const hoje = new Date();
        const diasSemPagamento = Math.floor(
            (hoje.getTime() - new Date(dataUltimoPagamento).getTime()) / (1000 * 60 * 60 * 24)
        );
        return diasSemPagamento <= 30;
    }
}