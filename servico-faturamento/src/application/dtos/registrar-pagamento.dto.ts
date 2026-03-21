// Define os dados esperados na requisição de pagamento
export class RegistrarPagamentoDto {
    dia: number;
    mes: number;
    ano: number;
    codAss: number;
    valorPago: number;
}