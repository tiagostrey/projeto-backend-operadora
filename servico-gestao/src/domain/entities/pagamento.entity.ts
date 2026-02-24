export class Pagamento {
  constructor(
    public readonly codigo: number,
    public codAss: number,
    public valorPago: number,
    public custoFinal: number,
    public descricao: string,
    public dataPagamento: Date,
    
  ) {}
}