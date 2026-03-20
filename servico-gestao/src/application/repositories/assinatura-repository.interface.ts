import { Assinatura } from '../../domain/entities/assinatura.entity';

export interface IAssinaturaRepository {
    salvar(assinatura: Assinatura): Promise<Assinatura>;
    buscarPorCodigo(codigo: number): Promise<Assinatura | null>;
    buscarPorTipo(tipo: string): Promise<Assinatura[]>;
    buscarPorCliente(codCli: number): Promise<Assinatura[]>;
    buscarPorPlano(codPlano: number): Promise<Assinatura[]>;
}