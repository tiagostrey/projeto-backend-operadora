import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GatewayController } from '../../interface/controllers/gateway.controller';

@Module({
    imports: [HttpModule],
    controllers: [GatewayController],
})
export class GatewayModule { }