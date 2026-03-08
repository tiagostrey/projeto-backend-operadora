import { Controller, Get, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ListarPlanosUseCase } from '../../application/use-cases/listar-planos.use-case';
import { AtualizarCustoPlanoUseCase } from '../../application/use-cases/atualizar-custo-plano.use-case';
import { AtualizarPlanoCustoDto } from '../../application/dtos/atualizar-plano-custo.dto';

@Controller('gestao/planos')
export class PlanosController {
    constructor(
        private readonly listarPlanosUseCase: ListarPlanosUseCase,
        private readonly atualizarCustoUseCase: AtualizarCustoPlanoUseCase,
    ) { }

    @Get()
    async listarTodos() {
        // Executa a lógica de listagem de todos os planos de assinatura disponíveis
        return this.listarPlanosUseCase.executar();
    }

    @Patch(':codigo')
    async atualizarCusto(
        @Param('codigo', ParseIntPipe) codigo: number,
        @Body() dto: AtualizarPlanoCustoDto,
    ) {
        // Realiza a atualização do custo mensal de um plano identificado pelo código numérico
        return this.atualizarCustoUseCase.executar(codigo, dto.custoMensal);
    }
}