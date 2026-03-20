import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Cria a instância do servidor NestJS usando o módulo raiz
  const app = await NestFactory.create(AppModule);

  // Define a porta onde o ServicoFaturamento vai escutar as requisições
  await app.listen(3001);

  console.log('ServicoFaturamento rodando em: http://localhost:3001');
}

bootstrap();