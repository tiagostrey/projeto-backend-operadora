import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ConsultarPlanoAtivoUseCase } from '../../application/use-cases/consultar-plano-ativo.use-case';

@Controller()
export class PlanosAtivosController {
  constructor(
    private readonly consultarPlanoAtivoUseCase: ConsultarPlanoAtivoUseCase,
  ) {}

  // Retorna se a assinatura informada está ativa ou não
  @Get('planosativos/:codass')
  async verificar(@Param('codass', ParseIntPipe) codass: number): Promise<boolean> {
    return this.consultarPlanoAtivoUseCase.executar(codass);
  }
}