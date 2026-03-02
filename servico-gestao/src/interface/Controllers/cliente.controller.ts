import { Body, Controller, Get, Patch, Param, Post } from '@nestjs/common';
import { CriarClienteDto } from '../../application/dtos/criar-cliente.dto';
import { AtualizarClienteDto } from '../../application/dtos/atualizar-cliente.dto';
import { CriarClienteUseCase } from '../../application/use-cases/criar-cliente.use-case';
import { ListarClientesUseCase } from '../../application/use-cases/listar-clientes.use-case';
import { AtualizarClienteUseCase } from '../../application/use-cases/atualizar-cliente.use-case';

@Controller('clientes')
export class ClienteController {
    constructor(
        private readonly criarClienteUseCase: CriarClienteUseCase,
        private readonly listarClientesUseCase: ListarClientesUseCase,
        private readonly atualizarClienteUseCase: AtualizarClienteUseCase,
    ) { }

    @Post()
    async criar(@Body() dados: CriarClienteDto) {
        return await this.criarClienteUseCase.executar(dados);
    }

    @Get()
    async listar() {
        return await this.listarClientesUseCase.executar();
    }

    @Patch(':cpf')
    async atualizar(
        @Param('cpf') cpf: string, 
        @Body() dados: AtualizarClienteDto
    ) {
        return await this.atualizarClienteUseCase.executar(cpf, dados);
    }
}