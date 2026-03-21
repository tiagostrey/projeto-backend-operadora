// Representa um plano disponível para assinatura
export class Plano {
  codigo: number;
  nome: string;
  custoMensal: number;
  data: Date;
  descricao: string;

  constructor(props?: Partial<Plano>) {
    // Permite criar o objeto já com os dados preenchidos
    if (props) {
      Object.assign(this, props);
    }
  }
}