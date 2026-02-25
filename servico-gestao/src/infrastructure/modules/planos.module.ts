import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanosController } from '../../interface/controllers/planos.controller';
import { CriarPlanoUseCase } from '../../application/use-cases/criar-plano.use-case';
import { ListarPlanosUseCase } from '../../application/use-cases/listar-planos.use-case';
import { BuscarPlanoPorCodigoUseCase } from '../../application/use-cases/buscar-plano.use-case';
import { PlanoRepository } from '../repositories/plano.repository';
import { PlanoSchema } from '../database/schemas/plano.schema';

@Module({
    // Registra o Schema do TypeORM para que o repositório consiga acessar a tabela
    imports: [TypeOrmModule.forFeature([PlanoSchema])],

    // Lista as classes que recebem as requisições HTTP (rotas)
    controllers: [PlanosController],

    // Define quem executa as tarefas e resolve a Injeção de Dependência
    providers: [
        CriarPlanoUseCase,
        ListarPlanosUseCase,
        BuscarPlanoPorCodigoUseCase,
        {
            // Quando for pedido 'IPlanoRepository', o NestJS entrega a classe PlanoRepository
            provide: 'IPlanoRepository',
            useClass: PlanoRepository,
        },
    ],
})
export class PlanosModule { }