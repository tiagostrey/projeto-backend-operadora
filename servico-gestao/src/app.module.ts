import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/database/typeorm.config';
import { PlanosModule } from './infrastructure/modules/planos.module';

@Module({
    imports: [
        // Inicializa a conexão com o banco de dados usando as configurações globais
        TypeOrmModule.forRoot(typeOrmConfig),

        // Importa o módulo de Planos para que suas rotas e lógicas fiquem disponíveis
        PlanosModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }