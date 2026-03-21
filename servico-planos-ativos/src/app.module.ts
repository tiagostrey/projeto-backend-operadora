import { Module } from '@nestjs/common';
import { PlanosAtivosModule } from './infrastructure/modules/planos-ativos.module';

// Módulo raiz do ServicoPlanosAtivos
@Module({
  imports: [PlanosAtivosModule],
})
export class AppModule { }