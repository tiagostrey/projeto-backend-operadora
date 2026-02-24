import { Assinatura } from '../../domain/entities/assinatura.entity';

export interface IAssinaturaRepository {
  // Busca todas as assinaturas para relatórios
  findAll(): Promise<Assinatura[]>;

  // Busca uma assinatura específica pelo código
  findByCodigo(codigo: number): Promise<Assinatura | null>;

  // Registra uma nova assinatura no sistema
  // Retorna Promise<void> porque apenas confirma a execução, não retorna dados
  create(assinatura: Assinatura): Promise<void>;
}