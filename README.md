# 🐾 Cafofo dos Peludos - Sistema de Adoção

Um sistema fullstack completo voltado para o gerenciamento de campanhas e histórico de adoção de animais, desenvolvido como projeto prático para a disciplina de Programação Web (PW).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura moderna e dividida em ecossistemas:

* **Frontend:** React (estruturado com **Vite** para máxima performance e Hot Module Replacement).
* **Backend:** Node.js com Express (API RESTful estruturada em ES Modules).
* **Banco de Dados:** MySQL (banco relacional para persistência e integridade dos dados via Chaves Estrangeiras).
* **Autenticação:** Firebase Auth (E-mail/Senha + Provedor Google).
* **Uploads:** Multer (gerenciamento local de imagens integrado diretamente à pasta pública do frontend).

---

## 📋 Arquitetura do Banco de Dados (MySQL)

O sistema conta com três tabelas principais totalmente integradas por relacionamentos relacionais (`INNER JOIN`):
* **`pets`:** Armazena o catálogo de animais, caminhos de imagem e status.
* **`usuarios`:** Dados dos adotantes cadastrados no sistema (incluindo usuários integrados via Google Login).
* **`adocoes`:** Tabela pivot que une o Adotante ao Peludo escolhido com restrições de `ON DELETE CASCADE`.

---

## 🚀 Como Rodar o Projeto no seu Computador

Siga o passo a passo abaixo para configurar os ambientes de desenvolvimento.

### 1. Configuração do Banco de Dados
1. Abra o seu gerenciador de banco de dados MySQL (MySQL Workbench, Command Line, etc.).
2. Importe e execute o script contido no arquivo **`cafofo.sql`** (localizado na raiz deste repositório). 
3. Esse script criará automaticamente o banco `cafofo_db`, a estrutura correta das tabelas e uma carga inicial de dados de teste.

### 2. Configuração das Variáveis de Ambiente (`.env`)
Como os arquivos de credenciais são ocultados por boas práticas de segurança (`.gitignore`), você precisará criar dois arquivo chamados **`.env`** um dentro da pasta `/backend` e outro na `/frontend` contendo a seguinte estrutura:

```env
# Conteudo .env backend
DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_NAME=cafofo_db
PORT=3000

# Conteudo .env frontend
VITE_FIREBASE_API_KEY=AIzaSyDv2uSL9p-ijlC-O47SxjNn28qUvq2VdII
VITE_FIREBASE_AUTH_DOMAIN=cafofo-web.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cafofo-web
VITE_FIREBASE_STORAGE_BUCKET=cafofo-web.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=192887255284
VITE_FIREBASE_APP_ID=1:192887255284:web:8b32720cd120ef805eeea1
```


### 3. Executando (inicializar o Front e o Back)
No seu terminal, navegue até as pastas do backend e frontend para instalar as dependências e iniciar os servidores:

```
# No terminal do Backend
cd backend
npm install
npm start

# Em outro terminal para o Frontend
cd frontend
npm install
npm run dev
```

---

## 🔐 Credenciais de Teste (Níveis de Acesso)

Para testar os diferentes fluxos da aplicação durante a avaliação do projeto, utilize os seguintes métodos:

### Conta de Administrador
* **E-mail:** `joaozinho@teste.com`
* **Senha:** `123456`

### Conta de Usuário Comum
* **Clique no botão "Entrar com o Google"** e autentique-se de forma real com qualquer conta do Gmail para testar o fluxo de adoção rápida do catálogo e as restrições de visibilidade das tabelas.

---

## Regras de Negócio (RBAC)

O sistema foi atualizado para implementar um controle de permissões baseado em níveis de acesso (*Role-Based Access Control*), dividindo a experiência da plataforma em duas categorias:

### 👤 1. Usuário Comum (Autenticação via Google/Gmail)
* **Acesso ao Catálogo:** Pode visualizar de forma pública todos os animais disponíveis.
* **Solicitação Reativa ("Quero Adotar"):** Ao clicar no botão de adoção de um pet, o sistema identifica automaticamente a sessão ativa do Gmail do usuário, cria/vincula dinamicamente os dados dele na tabela `usuarios` (CRUD 2) e dispara o registro de intenção de adoção na tabela pivô `adocoes` (CRUD 3).
* **Privacidade e Proteção:** O formulário de cadastro de *Pets* e *Usuários* permanece totalmente visível e funcional para inserções. No entanto, as tabelas inferiores que contêm as listagens históricas de dados cadastrados (e os botões de **Editar** ou **Excluir**) ficam completamente ocultas para proteger a privacidade das informações.

### 👤 2. Administrador (Login Tradicional)
* **Gerenciamento Total (CRUDs 1, 2 e 3):** Possui privilégios totais de escrita, alteração e exclusão física de registros de Pets e Adotantes.
* **Acesso ao Histórico Geral:** É o único nível de acesso que visualiza os blocos ocultos de listagem no sistema e o menu de **Adoções (CRUD 3 + JOIN)** no dropdown da Navbar, onde são auditadas todas as solicitações recebidas a partir do catálogo.

---

# 📋 Testes de Software

O projeto possui uma suíte de testes automatizados desenvolvida com base nos conceitos de Teste de Software estudados na disciplina, contemplando testes de integração (Jest + Supertest) e testes de sistema (Cypress).

## Ferramentas Utilizadas

### Testes de Integração

* Jest
* Supertest

### Testes de Sistema (End-to-End)

* Cypress

---

## Executando os Testes de Integração

Os testes de integração validam o funcionamento das rotas da API e a comunicação entre Backend e Banco de Dados.

### Instalação

bash
cd backend

npm install --save-dev jest supertest cross-env


### Execução

bash
npm test


### Relatório de Cobertura

Ao executar os testes, o Jest gera automaticamente um relatório de cobertura na pasta:

bash
backend/coverage


O relatório apresenta métricas de:

* Statements Coverage
* Functions Coverage
* Branch Coverage
* Lines Coverage

---

## Casos de Teste de Integração

| Código | Descrição                                 | Técnica                                       |
| ------ | ----------------------------------------- | --------------------------------------------- |
| CTI01  | Listar pets cadastrados                   | Caixa-Preta – Teste de Caso de Uso            |
| CTI02  | Cadastrar pet com dados válidos           | Caixa-Preta – Particionamento de Equivalência |
| CTI03  | Cadastrar pet com campo obrigatório vazio | Caixa-Preta – Particionamento de Equivalência |
| CTI04  | Atualizar dados de um pet existente       | Caixa-Branca – Cobertura de Instrução         |
| CTI05  | Excluir pet cadastrado                    | Caixa-Branca – Cobertura de Instrução         |
| CTI06  | Cadastrar adotante com CEP válido         | Caixa-Preta – Análise de Valor Limite         |
| CTI07  | Gerar relatório de adoções (JOIN)         | Caixa-Branca – Cobertura de Instrução         |

---

## Executando os Testes de Sistema

Os testes de sistema simulam a interação real do usuário com a aplicação através do navegador.

### Instalação

bash
cd frontend

npm install --save-dev cypress


### Execução em modo gráfico

bash
npx cypress open


### Execução via terminal

bash
npx cypress run


---

## Casos de Teste de Sistema

| Código | Descrição                                        | Técnica                                       |
| ------ | ------------------------------------------------ | --------------------------------------------- |
| CTS01  | Login completo no sistema                        | Caixa-Preta – Teste de Caso de Uso            |
| CTS02  | Cadastro de adotante com dados válidos           | Caixa-Preta – Particionamento de Equivalência |
| CTS03  | Cadastro de adotante com campo obrigatório vazio | Caixa-Preta – Particionamento de Equivalência |
| CTS04  | Navegação entre páginas principais               | Caixa-Preta – Teste de Caso de Uso            |

---

## Estrutura dos Testes

text
backend/
└── tests/
    ├── pets.test.js
    ├── usuarios.test.js
    └── relatorio.test.js

frontend/
└── cypress/
    └── e2e/
        └── sistema.cy.js


---

## Objetivos dos Testes

Os testes foram desenvolvidos com o objetivo de:

* Validar o correto funcionamento das rotas da API.
* Garantir a integração entre aplicação e banco de dados MySQL.
* Detectar falhas de validação de entrada.
* Verificar o fluxo completo de utilização do sistema.
* Aplicar técnicas de teste de caixa-preta e caixa-branca estudadas em sala de aula.
* Aumentar a confiabilidade e a qualidade do software.