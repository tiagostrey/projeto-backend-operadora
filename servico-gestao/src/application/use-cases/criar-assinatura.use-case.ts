import { Injectable, Inject } from '@nestjs/common';
import { IAssinaturaRepository } from '../repositories/assinatura-repository.interface';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { CriarAssinaturaDto } from '../dtos/criar-assinatura.dto';

@Injectable()
export class CriarAssinaturaUseCase {
    constructor(
        @Inject('IAssinaturaRepository')
        private readonly assinaturaRepository: IAssinaturaRepository,
    ) { }

    // Executa o fluxo de criação de uma nova assinatura
    async executar(dados: CriarAssinaturaDto): Promise<any> {
        // Controle: Define data de início (hoje) e término da fidelidade (+1 ano).
        const hoje = new Date();
        const fimFidelidade = new Date();
        fimFidelidade.setFullYear(hoje.getFullYear() + 1);

        // Mapeamento: Converte os dados brutos do DTO para a Entidade de Domínio Assinatura.
        const novaAssinatura = new Assinatura({
            codPlano: Number(dados.codPlano),
            codCli: Number(dados.codCli),
            inicioFidelidade: hoje,
            fimFidelidade: fimFidelidade,
            custoFinal: dados.custoFinal,
            descricao: dados.descricao,
            dataUltimoPagamento: hoje
        });

        // Persistência: Solicita ao repositório a gravação da entidade no banco de dados.
        return this.assinaturaRepository.salvar(novaAssinatura);
    }
}