// Representa uma assinatura de plano feita por um cliente
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
    // Permite criar o objeto já com os dados preenchidos
    if (props) {
      Object.assign(this, props);
    }
  }
}