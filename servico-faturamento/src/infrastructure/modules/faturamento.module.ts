import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PagamentoSchema } from '../database/schemas/pagamento.schema';
import { PagamentoController } from '../../interface/controllers/pagamento.controller';
import { RegistrarPagamentoUseCase } from '../../application/use-cases/registrar-pagamento.use-case';
import { TypeOrmPagamentoRepository } from '../database/repositories/typeorm-pagamento.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PagamentoSchema]),
    // Configura o cliente RabbitMQ para publicação de eventos
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'pagamento_gestao_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [PagamentoController],
  providers: [
    RegistrarPagamentoUseCase,
    {
      provide: 'IPagamentoRepository',
      useClass: TypeOrmPagamentoRepository,
    },
  ],
})
export class FaturamentoModule {}