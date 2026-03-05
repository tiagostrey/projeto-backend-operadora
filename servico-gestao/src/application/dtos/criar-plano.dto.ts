import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CriarPlanoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    custoMensal: number;
    
    @IsString()
    @IsNotEmpty()
    descricao: string;
}