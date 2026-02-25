import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Plano } from '../../domain/entities/plano.entity';
import { IPlanoRepository } from '../repositories/plano-repository.interface';

@Injectable()
export class BuscarPlanoPorCodigoUseCase {
    constructor(
        // Chama o contrato (interface) para acessar o banco de dados..
        @Inject('IPlanoRepository')
        private readonly planoRepository: IPlanoRepository,
    ) { }

    // Recebe o número do código e promete devolver os dados do Plano
    async executar(codigo: number): Promise<Plano> {

        // Aguarda a resposta da busca no banco de dados antes de continuar
        const plano = await this.planoRepository.findByCodigo(codigo);

        // Mostra um erro se o banco não achar nada e devolver vazio (null),
        if (!plano) {
            throw new NotFoundException(`Plano com código ${codigo} não encontrado.`);
        }

        return plano;
    }
}