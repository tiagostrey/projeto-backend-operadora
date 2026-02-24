import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Definindo uma porta para o servidor
  await app.listen(3000);
  console.log('Servidor rodando em: http://localhost:3000');
}
bootstrap();