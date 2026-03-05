import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PlanoSchema } from './schemas/plano.schema';
import { ClienteSchema } from './schemas/cliente.schema';
import { AssinaturaSchema } from './schemas/assinatura.schema';
import { PagamentoSchema } from './schemas/pagamento.schema';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
    entities: [
        PlanoSchema,
        ClienteSchema,
        AssinaturaSchema,
        PagamentoSchema,
    ],
};