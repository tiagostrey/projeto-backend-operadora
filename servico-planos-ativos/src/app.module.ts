import { Module } from '@nestjs/common';
import { PlanosAtivosModule } from './infrastructure/modules/planos-ativos.module';

@Module({
  imports: [PlanosAtivosModule],
})
export class AppModule {}