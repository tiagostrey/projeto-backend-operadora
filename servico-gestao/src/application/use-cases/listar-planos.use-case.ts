import { Inject, Injectable } from '@nestjs/common';
import { Plano } from '../../domain/entities/plano.entity';
import { IPlanoRepository } from '../repositories/plano-repository.interface';

@Injectable()
export class ListarPlanosUseCase {
    constructor(
        // Chama o contrato (interface) para acessar os dados dos planos.
        @Inject('IPlanoRepository')
        private readonly planoRepository: IPlanoRepository,
    ) { }

    // Busca e devolve a lista completa de planos cadastrados
    async executar(): Promise<Plano[]> {
        // Aguarda o repositório buscar todos os registros no banco de dados
        return await this.planoRepository.findAll();
    }
}