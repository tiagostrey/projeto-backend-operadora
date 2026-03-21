import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoSchema } from './infrastructure/database/schemas/pagamento.schema';
import { FaturamentoModule } from './infrastructure/modules/faturamento.module';

@Module({
  imports: [
    // Banco de dados próprio do ServicoFaturamento
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'faturamento.sqlite',
      entities: [PagamentoSchema],
      synchronize: true,
    }),
    FaturamentoModule,
  ],
})
export class AppModule { }