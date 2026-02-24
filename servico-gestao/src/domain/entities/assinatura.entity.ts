export class Assinatura {
  constructor(
    public readonly codigo: number,
    public codPlano: number,
    public codCliente: number,
    public inicioVigencia: Date,
    public fimVigencia: Date,
    public dataUltimoPagamento: Date,
    
  ) {}
}