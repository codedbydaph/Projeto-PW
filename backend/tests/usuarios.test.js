import request from "supertest";
import app from "../server.js";

test("CTI06 - Cadastrar adotante com CEP válido", async () => {
  const response = await request(app)
    .post("/api/usuarios")
    .send({
      nome: "Maria",
      sobrenome: "Teste",
      email: `maria.${Date.now()}@teste.com`,
      telefone: "61999999999",
      endereco: "Rua Teste",
      endereco2: "",
      cidade: "Brasília",
      estado: "DF",
      cep: "73850-000"
    });

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("id");
});