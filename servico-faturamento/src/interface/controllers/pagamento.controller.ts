import { Controller, Post, Body } from '@nestjs/common';
import { RegistrarPagamentoUseCase } from '../../application/use-cases/registrar-pagamento.use-case';
import { RegistrarPagamentoDto } from '../../application/dtos/registrar-pagamento.dto';

// Controlador responsável por receber as requisições de pagamento
@Controller()
export class PagamentoController {
    constructor(
        private readonly registrarPagamentoUseCase: RegistrarPagamentoUseCase,
    ) { }

    // Recebe a notificação de pagamento e aciona o use case correspondente
    @Post('registrarpagamento')
    async registrar(@Body() dto: RegistrarPagamentoDto): Promise<void> {
        await this.registrarPagamentoUseCase.executar(dto);
    }
}