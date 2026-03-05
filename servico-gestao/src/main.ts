import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Inicia a aplicação
async function bootstrap() {
    // Cria a instância do servidor NestJS usando o módulo raiz (AppModule)
    const app = await NestFactory.create(AppModule);
    
    // Ativa a validação automática para todos os DTOs
    app.useGlobalPipes(new ValidationPipe());

    // Define a porta onde o servidor vai "escutar" as requisições
    await app.listen(3000);

    // Exibe uma mensagem no console para confirmar que o sistema está ativo
    console.log('Servidor rodando em: http://localhost:3000');
}

// Chama a função para iniciar o processo
bootstrap();