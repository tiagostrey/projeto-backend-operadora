import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CriarClienteDto {
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}