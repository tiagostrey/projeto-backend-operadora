import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CriarAssinaturaUseCase } from '../../application/use-cases/criar-assinatura.use-case';
import { ListarAssinaturasPorTipoUseCase } from '../../application/use-cases/listar-assinaturas-por-tipo.use-case';
import { ListarAssinaturasPorClienteUseCase } from '../../application/use-cases/listar-assinaturas-por-cliente.use-case';
import { ListarAssinaturasPorPlanoUseCase } from '../../application/use-cases/listar-assinaturas-por-plano.use-case';
import { VerificarAssinaturaAtivaUseCase } from '../../application/use-cases/verificar-assinatura-ativa.use-case';
import { CriarAssinaturaDto } from '../../application/dtos/criar-assinatura.dto';

// Controlador responsável pelos endpoints de gerenciamento de assinaturas
@Controller('gestao')
export class AssinaturasController {
    constructor(
        private readonly criarAssinaturaUseCase: CriarAssinaturaUseCase,
        private readonly listarAssinaturasPorTipoUseCase: ListarAssinaturasPorTipoUseCase,
        private readonly listarAssinaturasPorClienteUseCase: ListarAssinaturasPorClienteUseCase,
        private readonly listarAssinaturasPorPlanoUseCase: ListarAssinaturasPorPlanoUseCase,
        private readonly verificarAssinaturaAtivaUseCase: VerificarAssinaturaAtivaUseCase,
    ) { }

    // Cria uma nova assinatura para um cliente
    @Post('assinaturas')
    async criar(@Body() dto: CriarAssinaturaDto) {
        // O DTO garante a integridade dos dados antes de chegar à camada de aplicação
        return this.criarAssinaturaUseCase.executar(dto);
    }

    // Retorna assinaturas filtradas por tipo (TODOS, ATIVOS, CANCELADOS)
    @Get('assinaturas/:tipo')
    async buscarPorTipo(@Param('tipo') tipo: string) {
        // Recupera assinaturas filtradas pela categoria ou modalidade definida no parâmetro 'tipo'
        return this.listarAssinaturasPorTipoUseCase.executar(tipo);
    }

    // Retorna todas as assinaturas de um cliente específico
    @Get('assinaturascliente/:codcli')
    async buscarPorCliente(@Param('codcli', ParseIntPipe) codcli: number) {
        // Valida e converte a string da URL para number antes do Use Case
        return this.listarAssinaturasPorClienteUseCase.executar(codcli);
    }

    // Retorna todas as assinaturas de um plano específico
    @Get('assinaturasplano/:codplano')
    async buscarPorPlano(@Param('codplano', ParseIntPipe) codplano: number) {
        // Garante que o ID do plano seja tratado como inteiro para busca no SQLite
        return this.listarAssinaturasPorPlanoUseCase.executar(codplano);
    }

    // Verifica se uma assinatura específica está ativa — consumido pelo ServicoPlanosAtivos
    @Get('assinatura/:codass/ativo')
    async verificarAtivo(@Param('codass', ParseIntPipe) codass: number) {
        // Retorna booleano indicando se a assinatura está dentro do prazo e com pagamento em dia
        return this.verificarAssinaturaAtivaUseCase.executar(codass);
    }
}