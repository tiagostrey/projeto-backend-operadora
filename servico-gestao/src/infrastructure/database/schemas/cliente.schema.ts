import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('clientes')
export class ClienteSchema {
    @PrimaryColumn()
    cpf: string;

    @Column()
    nome: string;

    @Column()
    email: string;
}