import { Module } from '@nestjs/common';
import { GatewayModule } from './infrastructure/modules/gateway.module';

// Módulo raiz do API Gateway — ponto de entrada único para todos os serviços
@Module({
  imports: [GatewayModule],
})
export class AppModule { }