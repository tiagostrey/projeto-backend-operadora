// Representa um pagamento realizado por um cliente para uma assinatura
export class Pagamento {
    codigo: number;
    codAss: number;
    valorPago: number;
    dataPagamento: Date;

    constructor(props?: Partial<Pagamento>) {
        if (props) {
            Object.assign(this, props);
        }
    }
}