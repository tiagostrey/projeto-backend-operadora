import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
    constructor(private readonly httpService: HttpService) { }

    // Encaminha a requisição para o ServicoGestao e retorna a lista de clientes cadastrados
    @Get('gestao/clientes')
    async listarClientes() {
        const resposta = await firstValueFrom(
            this.httpService.get('http://servico-gestao:3001/gestao/clientes'),
        );
        return resposta.data;
    }

    // Encaminha a requisição para o ServicoGestao e retorna a lista de planos disponíveis
    @Get('gestao/planos')
    async listarPlanos() {
        const resposta = await firstValueFrom(
            this.httpService.get('http://servico-gestao:3001/gestao/planos'),
        );
        return resposta.data;
    }

    // Encaminha a atualização do custo mensal do plano para o ServicoGestao
    @Patch('gestao/planos/:codigo')
    async atualizarCustoPlano(@Param('codigo') codigo: string, @Body() body: any) {
        const resposta = await firstValueFrom(
            this.httpService.patch(`http://servico-gestao:3001/gestao/planos/${codigo}`, body),
        );
        return resposta.data;
    }

    // Encaminha a criação de uma nova assinatura para o ServicoGestao
    @Post('gestao/assinaturas')
    async criarAssinatura(@Body() body: any) {
        const resposta = await firstValueFrom(
            this.httpService.post('http://servico-gestao:3001/gestao/assinaturas', body),
        );
        return resposta.data;
    }

    // Encaminha a requisição para o ServicoGestao filtrando assinaturas por tipo (TODOS, ATIVOS, CANCELADOS)
    @Get('gestao/assinaturas/:tipo')
    async listarAssinaturasPorTipo(@Param('tipo') tipo: string) {
        const resposta = await firstValueFrom(
            this.httpService.get(`http://servico-gestao:3001/gestao/assinaturas/${tipo}`),
        );
        return resposta.data;
    }

    // Encaminha a requisição para o ServicoGestao retornando as assinaturas de um cliente específico
    @Get('gestao/assinaturascliente/:codcli')
    async listarAssinaturasPorCliente(@Param('codcli') codcli: string) {
        const resposta = await firstValueFrom(
            this.httpService.get(`http://servico-gestao:3001/gestao/assinaturascliente/${codcli}`),
        );
        return resposta.data;
    }

    // Encaminha a requisição para o ServicoGestao retornando os assinantes de um plano específico
    @Get('gestao/assinaturasplano/:codplano')
    async listarAssinaturasPorPlano(@Param('codplano') codplano: string) {
        const resposta = await firstValueFrom(
            this.httpService.get(`http://servico-gestao:3001/gestao/assinaturasplano/${codplano}`),
        );
        return resposta.data;
    }

    // Encaminha o registro de pagamento para o ServicoFaturamento
    @Post('registrarpagamento')
    async registrarPagamento(@Body() body: any) {
        const resposta = await firstValueFrom(
            this.httpService.post('http://servico-faturamento:3002/registrarpagamento', body),
        );
        return resposta.data;
    }

    // Encaminha a consulta de plano ativo para o ServicoPlanosAtivos
    @Get('planosativos/:codass')
    async verificarPlanoAtivo(@Param('codass') codass: string) {
        const resposta = await firstValueFrom(
            this.httpService.get(`http://servico-planos-ativos:3003/planosativos/${codass}`),
        );
        return resposta.data;
    }
}