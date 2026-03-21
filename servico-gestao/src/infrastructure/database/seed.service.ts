import { Injectable, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { IClienteRepository } from '../../application/repositories/cliente-repository.interface';
import { IPlanoRepository } from '../../application/repositories/plano-repository.interface';
import { IAssinaturaRepository } from '../../application/repositories/assinatura-repository.interface';
import { Cliente } from '../../domain/entities/cliente.entity';
import { Plano } from '../../domain/entities/plano.entity';
import { Assinatura } from '../../domain/entities/assinatura.entity';

// Serviço responsável por popular o banco com dados iniciais ao iniciar a aplicação
@Injectable()
// Executa o seed apenas se o banco ainda não tiver dados
export class SeedService implements OnApplicationBootstrap {
    constructor(
        @Inject('IClienteRepository') private readonly clienteRepo: IClienteRepository,
        @Inject('IPlanoRepository') private readonly planoRepo: IPlanoRepository,
        @Inject('IAssinaturaRepository') private readonly assinaturaRepo: IAssinaturaRepository,
    ) { }

    async onApplicationBootstrap() {
        const planos = await this.planoRepo.buscarTodos();
        if (planos.length === 0) {
            await this.runSeed();
        }
    }

    private async runSeed() {
        // 1. Seed de Planos
        const planosDados = [
            { nome: 'Plano Fibra 400', custoMensal: 80, descricao: 'Internet Fibra Óptica 400 Mega' },
            { nome: 'Plano Fibra 500', custoMensal: 90, descricao: 'Internet Fibra Óptica 500 Mega' },
            { nome: 'Plano Fibra 600', custoMensal: 95, descricao: 'Internet Fibra Óptica 600 Mega' },
            { nome: 'Plano Fibra 700', custoMensal: 100, descricao: 'Internet Fibra Óptica 700 Mega' },
            { nome: 'Plano Fibra 1Giga', custoMensal: 300, descricao: 'Internet Fibra Óptica 1 Giga' },
        ];

        const planos: Plano[] = [];
        for (const p of planosDados) {
            planos.push(await this.planoRepo.salvar(new Plano(p)));
        }

        // 2. Seed de Clientes
        const clientes: Cliente[] = [];
        for (let i = 1; i <= 10; i++) {
            const novoCliente = new Cliente({
                nome: `Cliente Exemplo ${i}`,
                email: `cliente${i}@provedor.com`
            });
            clientes.push(await this.clienteRepo.salvar(novoCliente));
        }

        // 3. Seed de Assinaturas (Datas controladas para teste)
        const hoje = new Date();

        const umAnoAtras = new Date();
        umAnoAtras.setFullYear(hoje.getFullYear() - 1);

        const doisAnosAtras = new Date();
        doisAnosAtras.setFullYear(hoje.getFullYear() - 2);

        const umAnoNoFuturo = new Date();
        umAnoNoFuturo.setFullYear(hoje.getFullYear() + 1);

        for (let i = 0; i < 5; i++) {
            // Canceladas (IDs 1, 2, 3) | Ativas (IDs 4, 5)
            const isCancelada = i < 3;

            const dataInicio = isCancelada ? doisAnosAtras : hoje;
            const dataFim = isCancelada ? umAnoAtras : umAnoNoFuturo;

            const novaAssinatura = new Assinatura({
                codPlano: Number(planos[i].codigo),
                codCli: Number(clientes[i].codigo),
                inicioFidelidade: dataInicio,
                fimFidelidade: dataFim,
                custoFinal: planos[i].custoMensal * 0.9,
                descricao: isCancelada
                    ? 'Assinatura antiga já encerrada'
                    : 'Assinatura ativa com fidelidade',
                dataUltimoPagamento: dataInicio
            });

            await this.assinaturaRepo.salvar(novaAssinatura);
        }

        console.log('✅ Seed da Fase 1 finalizado com sucesso.');
    }
}