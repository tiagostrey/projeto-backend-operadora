import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Schemas
import { ClienteSchema } from './infrastructure/database/schemas/cliente.schema';
import { PlanoSchema } from './infrastructure/database/schemas/plano.schema';
import { AssinaturaSchema } from './infrastructure/database/schemas/assinatura.schema';

// Módulos
import { PlanosModule } from './infrastructure/modules/planos.module';
import { ClientesModule } from './infrastructure/modules/clientes.module';
import { AssinaturasModule } from './infrastructure/modules/assinaturas.module';

// Seed
import { SeedService } from './infrastructure/database/seed.service';

// Módulo raiz do ServicoGestao — configura o banco de dados, módulos e o seed inicial
@Module({
    imports: [
        // Configuração da conexão com o banco de dados e sincronização de esquemas
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [ClienteSchema, PlanoSchema, AssinaturaSchema],
            synchronize: true,
        }),
        PlanosModule,
        ClientesModule,
        AssinaturasModule,
    ],
    providers: [
        // Serviço responsável pela população inicial de dados
        SeedService
    ],
})
export class AppModule { }