import { Module } from '@nestjs/common';
import { GatewayModule } from './infrastructure/modules/gateway.module';

@Module({
  imports: [GatewayModule],
})
export class AppModule {}