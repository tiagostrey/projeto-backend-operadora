import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IPlanoRepository } from '../repositories/plano-repository.interface';
import { Plano } from '../../domain/entities/plano.entity';

@Injectable()
export class AtualizarCustoPlanoUseCase {
    constructor(
        @Inject('IPlanoRepository')
        private readonly planoRepository: IPlanoRepository,
    ) { }

    // Executa a alteração do valor mensal de um plano
    async executar(idPlano: number, novoCusto: number): Promise<Plano> {
        // Busca: Localiza a entidade através do repositório.
        const plano = await this.planoRepository.buscarPorCodigo(idPlano);

        // Validação: Garante que a operação só ocorra se o plano existir.
        if (!plano) {
            throw new NotFoundException(`Plano ${idPlano} não encontrado.`);
        }

        // Alteração: Altera o estado interno da entidade de domínio.
        plano.custoMensal = novoCusto;

        // Persistência: Devolve a entidade alterada para o repositório salvar no banco.
        return this.planoRepository.salvar(plano);
    }
}