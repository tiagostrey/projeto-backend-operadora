import { Controller, Get } from '@nestjs/common';
import { ListarClientesUseCase } from '../../application/use-cases/listar-clientes.use-case';

@Controller('gestao/clientes')
export class ClientesController {
    constructor(private readonly listarClientesUseCase: ListarClientesUseCase) { }

    @Get()
    async listarTodos() {
        // Aciona o caso de uso para recuperação dos registros de clientes na base de dados
        return this.listarClientesUseCase.executar();
    }
}