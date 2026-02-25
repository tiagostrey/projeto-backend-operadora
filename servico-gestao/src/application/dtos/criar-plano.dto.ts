/**
 * Data Transfer Object (DTO) para a criação de um Plano.
 * Na Arquitetura Limpa, o DTO atua como um "envelope" de transporte. 
 * Ele garante que a Camada de Aplicação (Use Case) receba apenas os dados 
 * estritamente necessários do mundo externo (ex: requisição HTTP), 
 * isolando e protegendo a Entidade de Domínio principal.
 */

export class CriarPlanoDto {
    nome: string;
    custoMensal: number;
    descricao: string;
}