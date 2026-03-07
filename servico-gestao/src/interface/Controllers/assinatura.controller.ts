import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CriarAssinaturaUseCase } from '../../application/use-cases/criar-assinatura.use-case';
import { ListarAssinaturasPorTipoUseCase } from '../../application/use-cases/listar-assinaturas-por-tipo.use-case';
import { ListarAssinaturasPorClienteUseCase } from '../../application/use-cases/listar-assinaturas-por-cliente.use-case';
import { ListarAssinaturasPorPlanoUseCase } from '../../application/use-cases/listar-assinaturas-por-plano.use-case';
import { CriarAssinaturaDto } from '../../application/dtos/criar-assinatura.dto';

@Controller('gestao')
export class AssinaturasController {
    constructor(
        private readonly criarAssinaturaUseCase: CriarAssinaturaUseCase,
        private readonly listarAssinaturasPorTipoUseCase: ListarAssinaturasPorTipoUseCase,
        private readonly listarAssinaturasPorClienteUseCase: ListarAssinaturasPorClienteUseCase,
        private readonly listarAssinaturasPorPlanoUseCase: ListarAssinaturasPorPlanoUseCase,
    ) { }

    @Post('assinaturas')
    async criar(@Body() dto: CriarAssinaturaDto) {
        // O DTO garante a integridade dos dados antes de chegar à camada de aplicação
        return this.criarAssinaturaUseCase.executar(dto);
    }

    @Get('assinaturas/:tipo')
    async buscarPorTipo(@Param('tipo') tipo: string) {
        // Recupera assinaturas filtradas pela categoria ou modalidade definida no parâmetro 'tipo'
        return this.listarAssinaturasPorTipoUseCase.executar(tipo);
    }

    @Get('assinaturascliente/:codcli')
    async buscarPorCliente(@Param('codcli', ParseIntPipe) codcli: number) {
        // Valida e converte a string da URL para number antes do Use Case
        return this.listarAssinaturasPorClienteUseCase.executar(codcli);
    }

    @Get('assinaturasplano/:codplano')
    async buscarPorPlano(@Param('codplano', ParseIntPipe) codplano: number) {
        // Garante que o ID do plano seja tratado como inteiro para busca no SQLite
        return this.listarAssinaturasPorPlanoUseCase.executar(codplano);
    }
}