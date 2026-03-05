import { Body, Controller, Post } from '@nestjs/common';
import { CriarAssinaturaUseCase, CriarAssinaturaDto } from '../../application/use-cases/criar-assinatura.use-case';

@Controller('assinaturas')
export class AssinaturaController {
    constructor(
        private readonly criarAssinaturaUseCase: CriarAssinaturaUseCase,
    ) {}

    @Post()
    async criar(@Body() dados: CriarAssinaturaDto) {
        return await this.criarAssinaturaUseCase.executar(dados);
    }
}