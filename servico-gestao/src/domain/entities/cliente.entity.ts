// Representa um cliente cadastrado no sistema
export class Cliente {
  codigo: number;
  nome: string;
  email: string;

  constructor(props?: Partial<Cliente>) {
    // Permite criar o objeto já com os dados preenchidos
    if (props) {
      Object.assign(this, props);
    }
  }
}