import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pagamentos')
export class PagamentoSchema {
    @PrimaryGeneratedColumn()
    codPagamento: number;

    @Column()
    codAssinatura: number;

    @Column('decimal', { precision: 10, scale: 2 })
    valorPago: number;

    @Column()
    dataPagamento: Date;
}