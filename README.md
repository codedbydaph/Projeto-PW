# 🐾 Cafofo dos Peludos — Sistema de Gestão de Adoções

## 📌 Sobre o Projeto
O **Cafofo dos Peludos** é uma aplicação Web desenvolvida em **React** criada com o objetivo de apoiar e otimizar a rotina de abrigos de animais na gestão de suas operações diárias. O sistema funciona como uma plataforma integrada que conecta animais resgatados a possíveis adotantes, permitindo o controle completo desde o acolhimento até a consolidação do processo de adoção.

A plataforma foi projetada para oferecer uma experiência de usuário (UX) limpa, responsiva e fluida, transformando telas estáticas em componentes dinâmicos e reativos, garantindo total controle de acesso às funcionalidades administrativas.

## 🚀 Escopo Técnico & Funcionalidades
A aplicação foi construída utilizando boas práticas de componentização e gerenciamento de estado global em React, cobrindo os seguintes pilares estratégicos:

* **🔐 Controle de Acesso Seguro:** Sistema de autenticação simulado utilizando Context API e controle de sessão via `localStorage`, incluindo barramento estrito de rotas privadas para usuários não autenticados.
* **🗂️ Gestão Descentralizada (CRUDs):** Operações completas de Criação, Leitura, Atualização e Exclusão (CRUD) para o gerenciamento de **Pets**, **Adotantes/Usuários** e o fluxo relacional de **Adoções**.
* **📊 Relatórios Gerenciais (JOIN):** Tela exclusiva de auditoria que simula um relacionamento `JOIN` em banco de dados, cruzando chaves estrangeiras (`id`) em tempo real para exibir dados unificados e transparentes sobre as adoções concluídas.
