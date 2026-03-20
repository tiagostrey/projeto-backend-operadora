import { Injectable, Inject } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';

@Injectable()
export class ListarAssinaturasPorClienteUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) { }

    // Executa a listagem de assinaturas de um cliente específico
    async executar(codCli: number): Promise<any[]> {
        // Busca: Localiza as assinaturas associadas ao código do cliente através do repositório.
        const assinaturas = await this.assinaturaRepository.buscarPorCliente(codCli);
        const hoje = new Date();

        // Mapeamento: Converte as entidades para o formato JSON com acentuação conforme a especificação.
        return assinaturas.map(ass => {
            const dataFim = new Date(ass.fimFidelidade);
            const isAtivo = dataFim > hoje;

            return {
                "código assinatura": ass.codigo || ass.id,
                "código cliente": ass.codCli,
                "código plano": ass.codPlano,
                "data de início": ass.inicioFidelidade,
                "data de fim": ass.fimFidelidade,
                "status": isAtivo ? 'ATIVO' : 'CANCELADO'
            };
        });
    }
}