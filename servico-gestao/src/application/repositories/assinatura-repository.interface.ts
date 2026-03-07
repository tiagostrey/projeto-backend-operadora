export interface IAssinaturaRepository {
    salvar(assinatura: any): Promise<any>;
    buscarPorTipo(tipo: string): Promise<any[]>;
    buscarPorCliente(codCli: number): Promise<any[]>;
    buscarPorPlano(codPlano: number): Promise<any[]>; // Novo contrato
}