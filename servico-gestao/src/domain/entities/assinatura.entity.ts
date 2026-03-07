export class Assinatura {
  codigo: number;
  codPlano: number;
  codCli: number;
  inicioFidelidade: Date;
  fimFidelidade: Date;
  dataUltimoPagamento: Date;
  custoFinal: number;
  descricao: string;

  constructor(props?: Partial<Assinatura>) {
    if (props) {
      Object.assign(this, props);
    }
  }
}