import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CriarPlanoUseCase } from '../../application/use-cases/criar-plano.use-case';
import { CriarPlanoDto } from '../../application/dtos/criar-plano.dto';
import { ListarPlanosUseCase } from '../../application/use-cases/listar-planos.use-case';
import { BuscarPlanoPorCodigoUseCase } from '../../application/use-cases/buscar-plano.use-case';

@Controller('planos')
export class PlanosController {
    constructor(
        private readonly criarPlanoUseCase: CriarPlanoUseCase,
        private readonly listarPlanosUseCase: ListarPlanosUseCase,
        private readonly buscarPlanoPorCodigoUseCase: BuscarPlanoPorCodigoUseCase,
    ) { }

    // Rota POST: Recebe dados no corpo da requisição para criar um novo plano
    @Post()
    async criar(@Body() dados: CriarPlanoDto) {
        return await this.criarPlanoUseCase.executar(dados);
    }

    // Rota GET: Retorna a lista completa, com todos os planos cadastrados, ao acessar /planos
    @Get()
    async listarTodos() {
        return await this.listarPlanosUseCase.executar();
    }

    // Rota GET: Busca um plano por ID. O '+id' converte o texto da URL em número
    @Get(':id')
    async buscarPorId(@Param('id') id: string) {
        return await this.buscarPlanoPorCodigoUseCase.executar(+id);
    }
}