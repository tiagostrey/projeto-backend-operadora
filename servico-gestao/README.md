# Serviço de Gestão - Projeto (Fase 1)

Projeto desenvolvido em **NestJS** para a disciplina de Desenvolvimento de Sistemas Backend (PUCRS), pelo aluno Tiago Francisco Strey. A aplicação segue os princípios de **Clean Architecture** e **SOLID** para gerenciar clientes, planos e assinaturas de uma operadora de serviços de internet.


## Arquitetura e Tecnologias

* **NestJS**: Framework para gerenciamento de módulos e injeção de dependências.
* **TypeORM**: Camada de persistência para mapeamento objeto-relacional.
* **SQLite**: Motor de banco de dados relacional em arquivo local (database.sqlite).
* **Class-validator**: Validação de esquemas e integridade de dados via DTOs.


## Estrutura do Projeto

A solução está organizada em camadas para garantir o desacoplamento:
* **Domain**: Entidades de negócio e interfaces (contratos) que definem as regras fundamentais do sistema.
* **Application**: Casos de uso que orquestram a lógica da aplicação, mediando a comunicação entre o domínio e a infraestrutura.
* **Infrastructure**: Implementações técnicas de banco de dados, repositórios e módulos.
* **Interface**: Controllers responsáveis por expor os endpoints da API.


## Regras de Negócio (Módulos)

* **Clientes:** Gerencia o cadastro e a identificação única (código numérico) dos usuários da operadora.
* **Planos:** Administra o catálogo de pacotes de internet e permite a atualização do custo mensal.
* **Assinaturas:** Controla os contratos vigentes, o vínculo entre clientes e planos, e os períodos de fidelidade.


## Endpoints da API

A base de todos os endpoints é prefixada por `/gestao`.

### Clientes
* **GET /gestao/clientes**: Listagem de todos os clientes registrados.

### Planos
* **GET /gestao/planos**: Listagem de todos os planos disponíveis.
* **PATCH /gestao/planos/:codigo**: Atualização do custo mensal de um plano específico.

### Assinaturas
* **POST /gestao/assinaturas**: Criação de novo contrato entre cliente e plano.
* **GET /gestao/assinaturas/:tipo**: Filtro de assinaturas por categoria.
* **GET /gestao/assinaturascliente/:codcli**: Listagem de assinaturas por código de cliente.
* **GET /gestao/assinaturasplano/:codplano**: Listagem de assinaturas vinculadas a um plano.

## Instruções de Execução

1. **Instalação de dependências**:
   `npm install`

2. **Inicialização do servidor**:
   `npm run start`

O servidor será disponibilizado em `http://localhost:3000`. O banco de dados SQLite é gerado e sincronizado automaticamente na primeira execução através do **SeedService**.

## Validação e Testes

Os testes de integração e validação das rotas devem ser realizados via **Postman**:
Importar o arquivo `tiago_strey_Desenvolvimento_de_Sistemas_backend_Fase-1.postman_collection.json` localizado na raiz do projeto.
