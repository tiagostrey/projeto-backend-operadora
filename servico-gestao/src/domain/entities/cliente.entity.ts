export class Cliente {
  codigo: number;
  nome: string;
  email: string;

  constructor(props?: Partial<Cliente>) {
    if (props) {
      Object.assign(this, props);
    }
  }
}