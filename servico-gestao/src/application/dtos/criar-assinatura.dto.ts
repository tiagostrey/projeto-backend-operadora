// Define os dados esperados para criar uma nova assinatura
export class CriarAssinaturaDto {
    readonly codPlano: number;
    readonly codCli: number;
    readonly custoFinal: number;
    readonly descricao: string;
}