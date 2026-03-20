import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Cria a instância do API Gateway usando o módulo raiz
  const app = await NestFactory.create(AppModule);

  // Define a porta onde o Gateway vai escutar as requisições
  await app.listen(3000);

  console.log('API Gateway rodando em: http://localhost:3000');
}

bootstrap();