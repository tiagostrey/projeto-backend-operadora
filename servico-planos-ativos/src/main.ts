import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  // Cria a instância do servidor NestJS usando o módulo raiz
  const app = await NestFactory.create(AppModule);

  // Conecta ao RabbitMQ para consumir eventos de pagamento
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: 'pagamento_planos_ativos_queue',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();

  // Define a porta onde o ServicoPlanosAtivos vai escutar as requisições
  await app.listen(3003);

  console.log('ServicoPlanosAtivos rodando em: http://localhost:3003');
}

bootstrap();