describe("Testes de Sistema - Cafofo dos Peludos", () => {
  const email = "joaozinho@teste.com";
  const senha = "123456";

  function fazerLogin() {
    cy.visit("http://localhost:5173/login");

    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(senha);
    cy.contains("button", /entrar/i).click();

    cy.url().should("not.include", "/login");
  }

  it("CTS01 - Login completo no sistema", () => {
    fazerLogin();
  });

  it("CTS02 - Cadastro de adotante com dados válidos", () => {
    fazerLogin();

    cy.visit("http://localhost:5173/usuarios");

    cy.get("#inputNome").type("Maria");
    cy.get("#inputSobrenome").type("Teste");

    cy.get("body").then(($body) => {
      if ($body.find("#inputEmail").length) {
        cy.get("#inputEmail").type(`maria.${Date.now()}@teste.com`);
      }

      if ($body.find("#inputTelefone").length) {
        cy.get("#inputTelefone").type("61999999999");
      }
    });

    cy.get("#inputAddress").type("Rua Teste");
    cy.get("#inputCity").type("Brasília");
    cy.get("#inputEstado").select("DF");
    cy.get("#inputCEP").type("72000000");

    cy.contains("button", /salvar|cadastrar|confirmar|enviar/i).click();
  });

  it("CTS03 - Cadastro de adotante com campo obrigatório vazio", () => {
    fazerLogin();

    cy.visit("http://localhost:5173/usuarios");

    cy.get("#inputNome").clear();
    cy.contains("button", /salvar|cadastrar|confirmar|enviar/i).click();

    cy.get("#inputNome:invalid").should("exist");
  });

  it("CTS04 - Navegação entre páginas principais", () => {
    fazerLogin();

    cy.visit("http://localhost:5173/catalogo");
    cy.url().should("include", "/catalogo");

    cy.visit("http://localhost:5173/usuarios");
    cy.url().should("include", "/usuarios");

    cy.visit("http://localhost:5173/voluntario");
    cy.url().should("include", "/voluntario");

    cy.visit("http://localhost:5173/crud3");
    cy.url().should("include", "/crud3");
  });
});