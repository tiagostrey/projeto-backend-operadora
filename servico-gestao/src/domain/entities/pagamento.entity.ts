export interface PagamentoProps {
    codPagamento?: number;
    codAssinatura: number;
    valorPago: number;
    dataPagamento?: Date;
}

export class Pagamento {
    public readonly codPagamento?: number;
    public codAssinatura: number;
    public valorPago: number;
    public dataPagamento: Date;

    constructor(props: PagamentoProps) {
        this.codPagamento = props.codPagamento;
        this.codAssinatura = props.codAssinatura;
        this.valorPago = props.valorPago;
        
        // Garante a data atual caso não seja informada
        this.dataPagamento = props.dataPagamento ?? new Date();
    }
}