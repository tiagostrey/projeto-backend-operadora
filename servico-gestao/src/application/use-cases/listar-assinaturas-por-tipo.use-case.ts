import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';

@Injectable()
export class ListarAssinaturasPorTipoUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) { }

    // Executa a listagem de assinaturas filtradas por tipo
    async executar(tipo: string): Promise<any[]> {
        // Preparação: Normaliza o parâmetro de entrada e define as opções válidas para filtragem.
        const tipoUpper = tipo.toUpperCase();
        const tiposValidos = ['TODOS', 'ATIVOS', 'CANCELADOS'];

        // Validação: Garante que o tipo fornecido é aceito pelo sistema.
        if (!tiposValidos.includes(tipoUpper)) {
            throw new BadRequestException('Tipo inválido. Use TODOS, ATIVOS ou CANCELADOS.');
        }

        // Busca: Localiza as assinaturas através do repositório baseada no tipo.
        const assinaturas = await this.assinaturaRepository.buscarPorTipo(tipoUpper);
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