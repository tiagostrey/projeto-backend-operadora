import { Injectable, Inject } from '@nestjs/common';
import { IPlanoRepository } from '../repositories/plano-repository.interface';
import { Plano } from '../../domain/entities/plano.entity';

@Injectable()
export class ListarPlanosUseCase {
    constructor(
        @Inject('IPlanoRepository')
        private readonly planoRepository: IPlanoRepository,
    ) { }

    // Executa a listagem de todos os planos disponíveis
    async executar(): Promise<Plano[]> {
        // Busca: Localiza todos os planos através do repositório.
        return this.planoRepository.buscarTodos();
    }
}