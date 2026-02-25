import { Inject, Injectable } from '@nestjs/common';
import { Plano } from '../../domain/entities/plano.entity';
import { CriarPlanoDto } from '../dtos/criar-plano.dto';
import { IPlanoRepository } from '../repositories/plano-repository.interface';

@Injectable()
export class CriarPlanoUseCase {
    constructor(
        // Chama o contrato (interface) para acessar o banco de dados.
        @Inject('IPlanoRepository')
        private readonly planoRepository: IPlanoRepository,
    ) { }

    // Recebe os dados do envelope (DTO) e promete devolver o Plano criado
    async executar(dados: CriarPlanoDto): Promise<Plano> {

        // Cria uma nova entidade Plano com os dados recebidos do DTO.
        // O código vai como 'undefined' para o banco de dados assumir o controle e gerar o auto-incremento.
        const novoPlano = new Plano(undefined, dados.nome, dados.custoMensal, new Date(), dados.descricao);

        // Aguarda o banco de dados salvar o novo plano antes de finalizar
        return await this.planoRepository.salvar(novoPlano);
    }
}