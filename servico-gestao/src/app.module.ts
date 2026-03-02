import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/database/typeorm.config';
import { PlanosModule } from './infrastructure/modules/planos.module';
import { ClientesModule } from './infrastructure/modules/clientes.module';
import { ClienteSchema } from './infrastructure/database/schemas/cliente.schema';
import { PlanoSchema } from './infrastructure/database/schemas/plano.schema';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...typeOrmConfig,
            entities: [PlanoSchema, ClienteSchema], 
        }),
        PlanosModule,
        ClientesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }