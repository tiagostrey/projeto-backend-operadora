export interface AssinaturaProps {
    codAssinatura?: number;
    codPlano: number;
    cpf: string;
    dataInicio?: Date;
    dataFim?: Date;
    dataUltimoPagamento?: Date;
    status?: boolean;
}

export class Assinatura {
    public readonly codAssinatura?: number;
    public codPlano: number;
    public cpf: string;
    public dataInicio: Date;
    public dataFim?: Date;
    public dataUltimoPagamento?: Date;
    public status: boolean;

    constructor(props: AssinaturaProps) {
        this.codAssinatura = props.codAssinatura;
        this.codPlano = props.codPlano;
        this.cpf = props.cpf;
        
        // Operador ?? garante os valores padrão caso a propriedade venha vazia
        this.dataInicio = props.dataInicio ?? new Date();
        this.status = props.status ?? true;
        
        this.dataFim = props.dataFim;
        this.dataUltimoPagamento = props.dataUltimoPagamento;
    }
}