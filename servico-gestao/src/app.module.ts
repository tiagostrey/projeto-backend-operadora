import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/database/typeorm.config';
import { PlanosModule } from './infrastructure/modules/planos.module';
import { ClientesModule } from './infrastructure/modules/clientes.module';
import { AssinaturasModule } from './infrastructure/modules/assinaturas.module'; // Novo
import { PagamentosModule } from './infrastructure/modules/pagamentos.module'; // Novo

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        PlanosModule,
        ClientesModule,
        AssinaturasModule,
        PagamentosModule,
    ],
})
export class AppModule { }