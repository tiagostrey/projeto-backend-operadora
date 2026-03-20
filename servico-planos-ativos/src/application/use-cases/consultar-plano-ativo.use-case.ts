import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ConsultarPlanoAtivoUseCase {
  // Cache em memória: chave = codAss, valor = boolean (ativo ou não)
  private readonly cache = new Map<number, boolean>();

  constructor(
    @Inject('HTTP_SERVICE')
    private readonly httpService: HttpService,
  ) {}

  // Retorna se a assinatura está ativa, consultando cache ou ServicoGestao
  async executar(codAss: number): Promise<boolean> {
    // Verifica se a informação já está no cache
    if (this.cache.has(codAss)) {
      return this.cache.get(codAss);
    }

    // Consulta o ServicoGestao de forma síncrona
    const url = `http://localhost:3000/gestao/assinaturas/${codAss}/ativo`;
    const resposta = await firstValueFrom(this.httpService.get<boolean>(url));
    const ativo = resposta.data;

    // Armazena no cache para consultas futuras
    this.cache.set(codAss, ativo);

    return ativo;
  }

  // Remove a entrada do cache quando um pagamento é recebido
  invalidarCache(codAss: number): void {
    this.cache.delete(codAss);
  }
}