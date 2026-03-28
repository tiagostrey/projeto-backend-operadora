import { Injectable, Inject } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';

@Injectable()
export class ListarAssinaturasPorClienteUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) { }

    // Busca e retorna todas as assinaturas do cliente informado com o status calculado
    async executar(codCli: number): Promise<any[]> {
        const assinaturas = await this.assinaturaRepository.buscarPorCliente(codCli);

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