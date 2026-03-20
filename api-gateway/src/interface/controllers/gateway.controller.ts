import { Controller, Get, Post, Patch, Param, Body, All } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(private readonly httpService: HttpService) {}

  // Rota: listar todos os clientes
  @Get('gestao/clientes')
  async listarClientes() {
    const resposta = await firstValueFrom(
      this.httpService.get('http://localhost:3001/gestao/clientes'),
    );
    return resposta.data;
  }

  // Rota: listar todos os planos
  @Get('gestao/planos')
  async listarPlanos() {
    const resposta = await firstValueFrom(
      this.httpService.get('http://localhost:3001/gestao/planos'),
    );
    return resposta.data;
  }

  // Rota: atualizar custo mensal de um plano
  @Patch('gestao/planos/:codigo')
  async atualizarCustoPlano(@Param('codigo') codigo: string, @Body() body: any) {
    const resposta = await firstValueFrom(
      this.httpService.patch(`http://localhost:3001/gestao/planos/${codigo}`, body),
    );
    return resposta.data;
  }

  // Rota: criar uma assinatura
  @Post('gestao/assinaturas')
  async criarAssinatura(@Body() body: any) {
    const resposta = await firstValueFrom(
      this.httpService.post('http://localhost:3001/gestao/assinaturas', body),
    );
    return resposta.data;
  }

  // Rota: listar assinaturas por tipo (TODOS, ATIVOS, CANCELADOS)
  @Get('gestao/assinaturas/:tipo')
  async listarAssinaturasPorTipo(@Param('tipo') tipo: string) {
    const resposta = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/gestao/assinaturas/${tipo}`),
    );
    return resposta.data;
  }

  // Rota: listar assinaturas de um cliente
  @Get('gestao/assinaturascliente/:codcli')
  async listarAssinaturasPorCliente(@Param('codcli') codcli: string) {
    const resposta = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/gestao/assinaturascliente/${codcli}`),
    );
    return resposta.data;
  }

  // Rota: listar assinaturas de um plano
  @Get('gestao/assinaturasplano/:codplano')
  async listarAssinaturasPorPlano(@Param('codplano') codplano: string) {
    const resposta = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/gestao/assinaturasplano/${codplano}`),
    );
    return resposta.data;
  }

  // Rota: registrar pagamento
  @Post('registrarpagamento')
  async registrarPagamento(@Body() body: any) {
    const resposta = await firstValueFrom(
      this.httpService.post('http://localhost:3002/registrarpagamento', body),
    );
    return resposta.data;
  }

  // Rota: verificar se plano está ativo
  @Get('planosativos/:codass')
  async verificarPlanoAtivo(@Param('codass') codass: string) {
    const resposta = await firstValueFrom(
      this.httpService.get(`http://localhost:3003/planosativos/${codass}`),
    );
    return resposta.data;
  }
}