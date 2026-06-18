# 🐾 Cafofo dos Peludos - Sistema de Adoção

Um sistema fullstack completo voltado para o gerenciamento de campanhas e histórico de adoção de animais, desenvolvido como projeto prático para a disciplina de Programação Web (PW).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura moderna e dividida em ecossistemas:

* **Frontend:** React (estruturado com **Vite** para máxima performance e Hot Module Replacement).
* **Backend:** Node.js com Express (API RESTful estruturada em ES Modules).
* **Banco de Dados:** MySQL (banco relacional para persistência e integridade dos dados via Chaves Estrangeiras).
* **Autenticação:** Firebase Auth.
* **Uploads:** Multer (gerenciamento local de imagens integrado diretamente à pasta pública do frontend).

---

## 📋 Arquitetura do Banco de Dados (MySQL)

O sistema conta com três tabelas principais totalmente integradas por relacionamentos relacionais (`INNER JOIN`):
* **`pets`:** Armazena o catálogo de animais, caminhos de imagem e status.
* **`usuarios`:** Dados dos adotantes cadastrados no sistema.
* **`adocoes`:** Tabela pivot que une o Adotante ao Peludo escolhido com restrições de `ON DELETE CASCADE`.

---

## 🚀 Como Rodar o Projeto no seu Computador

Siga o passo a passo abaixo para configurar os ambientes de desenvolvimento.

### 1. Configuração do Banco de Dados
1. Abra o seu gerenciador de banco de dados MySQL (MySQL Workbench, Command Line, etc.).
2. Importe e execute o script contido no arquivo **`cafofo.sql`** (localizado na raiz deste repositório). 
3. Esse script criará automaticamente o banco `cafofo_db`, a estrutura correta das tabelas e uma carga inicial de dados de teste.

### 2. Configuração das Variáveis de Ambiente (`.env`)
Como os arquivos de credenciais são ocultados por boas práticas de segurança (`.gitignore`), você precisará criar um arquivo chamado **`.env`** dentro da pasta `/backend` (ou na raiz, conforme sua árvore de diretórios) contendo a seguinte estrutura:

```env
# 🔌 CONFIGURAÇÕES DO BACKEND (NODE / EXPRESS)
DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_NAME=cafofo_db
PORT=3000

# 🔥 CONFIGURAÇÕES DO FRONTEND (FIREBASE)
VITE_FIREBASE_API_KEY=AIzaSyDv2uSL9p-ijlC-O47SxjNn28qUvq2VdII
VITE_FIREBASE_AUTH_DOMAIN=cafofo-web.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cafofo-web
VITE_FIREBASE_STORAGE_BUCKET=cafofo-web.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=192887255284
VITE_FIREBASE_APP_ID=1:192887255284:web:8b32720cd120ef805eeea1
```

### 3. Executando (inicializar o Front e o Back)
No seu terminal, navegue até as pasta do backend e frontend, depois instale as dependências:

```
cd backend / cd frontend
npm install
npm start
```

---

## 🔐 Credenciais de Teste (Firebase Auth)

Para testar a tela de login e o fluxo de autenticação integrado ao Firebase durante a avaliação, utilize os seguintes dados cadastrados:

* **E-mail:** `joaozinho@teste.com`
* **Senha:** `123456`