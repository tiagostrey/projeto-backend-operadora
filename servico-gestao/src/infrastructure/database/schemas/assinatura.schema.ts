import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('assinaturas')
export class AssinaturaSchema {
    @PrimaryGeneratedColumn()
    codAssinatura: number;

    @Column()
    codPlano: number;

    @Column()
    cpf: string;

    @Column()
    dataInicio: Date;

    @Column({ nullable: true })
    dataFim: Date;

    @Column({ nullable: true })
    dataUltimoPagamento: Date;

    @Column()
    status: boolean;
}