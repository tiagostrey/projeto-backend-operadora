import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CriarAssinaturaUseCase, CriarAssinaturaDto } from '../../application/use-cases/criar-assinatura.use-case';
import { BuscarAssinaturasPorCpfUseCase } from '../../application/use-cases/buscar-assinaturas-por-cpf.use-case';

@Controller('assinaturas')
export class AssinaturaController {
    constructor(
        private readonly criarAssinaturaUseCase: CriarAssinaturaUseCase,
        private readonly buscarAssinaturasPorCpfUseCase: BuscarAssinaturasPorCpfUseCase,
    ) {}

    @Post()
    async criar(@Body() dados: CriarAssinaturaDto) {
        return await this.criarAssinaturaUseCase.executar(dados);
    }

    @Get(':cpf')
    async buscarPorCpf(@Param('cpf') cpf: string) {
        return await this.buscarAssinaturasPorCpfUseCase.executar(cpf);
    }
}