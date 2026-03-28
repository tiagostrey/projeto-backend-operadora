# Sistema de Controle de Planos de Operadora - Projeto (Fase 2)

Projeto desenvolvido em **NestJS** para a disciplina de Desenvolvimento de Sistemas Backend (PUCRS), pelo aluno Tiago Francisco Strey. A aplicação segue os princípios de **Clean Architecture** e **SOLID** para gerenciar clientes, planos, assinaturas e pagamentos de uma operadora de serviços de internet.


## Arquitetura e Tecnologias

* **NestJS**: Framework para gerenciamento de módulos e injeção de dependências.
* **TypeORM**: Camada de persistência para mapeamento objeto-relacional.
* **SQLite**: Motor de banco de dados relacional em arquivo local, um por serviço.
* **RabbitMQ**: Message broker para comunicação assíncrona entre os microsserviços.
* **Docker e Docker Compose**: Orquestração e isolamento dos serviços em containers.
* **Class-validator**: Validação de esquemas e integridade de dados via DTOs.


## Estrutura do Projeto
```
tiago_strey-desenvol-sistemas-backend-fase-2/
  api-gateway/           # Ponto de entrada único (porta 3000)
  servico-gestao/        # Serviço principal (porta 3001)
  servico-faturamento/   # Microsserviço de pagamentos (porta 3002)
  servico-planos-ativos/ # Microsserviço de planos ativos (porta 3003)
  docker-compose.yml     # Orquestração dos serviços
```

Cada serviço segue a organização em camadas:
* **Domain**: Entidades de negócio que definem as regras fundamentais do sistema.
* **Application**: Casos de uso que orquestram a lógica da aplicação.
* **Infrastructure**: Implementações de banco de dados, repositórios, mensageria e módulos.
* **Interface**: Controllers responsáveis por expor os endpoints da API.


## Serviços

### API Gateway
Ponto de entrada único que roteia todas as requisições externas para os serviços internos.

### ServicoGestao
Serviço principal responsável pelo cadastro e manutenção de clientes, planos e assinaturas. Consome eventos de pagamento via RabbitMQ para atualizar a validade das assinaturas.

### ServicoFaturamento
Microsserviço responsável por registrar os pagamentos efetuados e publicar eventos de notificação no RabbitMQ para os demais serviços.

### ServicoPlanosAtivos
Microsserviço responsável por informar rapidamente se uma assinatura está ativa ou não, utilizando cache em memória para maior performance. Consome eventos de pagamento para invalidar o cache.


## Endpoints da API

Todos os endpoints são acessados pela porta 3000 (API Gateway).

### Clientes
* **GET /gestao/clientes**: Listagem de todos os clientes registrados.

### Planos
* **GET /gestao/planos**: Listagem de todos os planos disponíveis.
* **PATCH /gestao/planos/:codigo**: Atualização do custo mensal de um plano específico.

### Assinaturas
* **POST /gestao/assinaturas**: Criação de novo contrato entre cliente e plano.
* **GET /gestao/assinaturas/:tipo**: Filtro de assinaturas por categoria (TODOS/ATIVOS/CANCELADOS).
* **GET /gestao/assinaturascliente/:codcli**: Listagem de assinaturas por código de cliente.
* **GET /gestao/assinaturasplano/:codplano**: Listagem de assinaturas vinculadas a um plano.

### Pagamentos
* **POST /registrarpagamento**: Registra um pagamento e notifica os serviços via RabbitMQ.

### Planos Ativos
* **GET /planosativos/:codass**: Retorna se uma assinatura está ativa ou não.


## Instruções de Execução

Consulte o arquivo `Tiago_Strey_relatório.pdf` para instruções completas de instalação e execução.


## Validação e Testes

Os testes de integração e validação das rotas devem ser realizados via **Postman**:
Importar o arquivo `tiago_strey_Desenvolvimento_de_Sistemas_backend_Fase-2.postman_collection.json` localizado na raiz do projeto.