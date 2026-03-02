import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarClienteDto } from '../../application/dtos/criar-cliente.dto';
import { CriarClienteUseCase } from '../../application/use-cases/criar-cliente.use-case';
import { ListarClientesUseCase } from '../../application/use-cases/listar-clientes.use-case';

@Controller('clientes')
export class ClienteController {
    constructor(
        private readonly criarClienteUseCase: CriarClienteUseCase,
        private readonly listarClientesUseCase: ListarClientesUseCase,
    ) { }

    @Post()
    async criar(@Body() dados: CriarClienteDto) {
        return await this.criarClienteUseCase.executar(dados);
    }

    @Get()
    async listar() {
        return await this.listarClientesUseCase.executar();
    }
}