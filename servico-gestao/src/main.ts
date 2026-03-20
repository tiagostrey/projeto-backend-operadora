import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

// Inicia a aplicação
async function bootstrap() {
    // Cria a instância do servidor NestJS usando o módulo raiz (AppModule)
    const app = await NestFactory.create(AppModule);

    // Conecta ao RabbitMQ para consumir eventos de pagamento
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://guest:guest@localhost:5672'],
            queue: 'pagamento_gestao_queue',
            queueOptions: { durable: true },
        },
    });

    await app.startAllMicroservices();

    // Define a porta onde o servidor vai "escutar" as requisições
    await app.listen(3000);

    // Exibe uma mensagem no console para confirmar que o sistema está ativo
    console.log('Servidor rodando em: http://localhost:3000');
}

// Chama a função para iniciar o processo
bootstrap();