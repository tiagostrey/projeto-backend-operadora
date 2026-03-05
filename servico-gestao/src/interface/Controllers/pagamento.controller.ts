import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegistrarPagamentoUseCase, RegistrarPagamentoDto } from '../../application/use-cases/registrar-pagamento.use-case';
import { IPagamentoRepository } from '../../application/repositories/pagamento-repository.interface';
import { Inject } from '@nestjs/common';

@Controller('pagamentos')
export class PagamentoController {
    constructor(
        private readonly registrarPagamentoUseCase: RegistrarPagamentoUseCase,
        @Inject('IPagamentoRepository')
        private readonly pagamentoRepository: IPagamentoRepository,
    ) {}

    @Post()
    async registrar(@Body() dados: RegistrarPagamentoDto) {
        return await this.registrarPagamentoUseCase.executar(dados);
    }

    @Get('assinatura/:codAssinatura')
    async buscarPorAssinatura(@Param('codAssinatura') codAssinatura: number) {
        return await this.pagamentoRepository.buscarPorAssinatura(Number(codAssinatura));
    }
}