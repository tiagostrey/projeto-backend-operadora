export class Plano {
  codigo: number;
  nome: string;
  custoMensal: number;
  data: Date;
  descricao: string;

  constructor(props?: Partial<Plano>) {
    if (props) {
      Object.assign(this, props);
    }
  }
}