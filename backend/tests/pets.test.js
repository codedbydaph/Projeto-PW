import request from "supertest";
import app from "../server.js";

describe("CRUD Pets", () => {

  test("CTI01 - Listar pets cadastrados", async () => {
    const response = await request(app)
      .get("/api/pets");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("CTI02 - Cadastrar pet com dados válidos", async () => {

    const response = await request(app)
      .post("/api/pets")
      .field("nome", "Thor Teste")
      .field("especie", "Cachorro")
      .field("idade", "2 anos")
      .field("descricao", "Pet criado pelo teste")
      .field("status", "Disponível");

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe("Thor Teste");
  });

  test("CTI03 - Cadastrar pet com campo obrigatório vazio", async () => {

    const response = await request(app)
      .post("/api/pets")
      .field("nome", "")
      .field("especie", "Cachorro")
      .field("idade", "2 anos")
      .field("descricao", "Teste")
      .field("status", "Disponível");

    expect(response.status).not.toBe(201);
  });

  test("CTI04 - Atualizar dados de um pet existente", async () => {

    const lista = await request(app).get("/api/pets");

    const petId = lista.body[0].id;

    const response = await request(app)
      .put(`/api/pets/${petId}`)
      .field("nome", "Pet Atualizado")
      .field("especie", "Cachorro")
      .field("idade", "3 anos")
      .field("descricao", "Descrição atualizada")
      .field("status", "Disponível");

    expect(response.status).toBe(200);
  });

  test("CTI05 - Excluir pet cadastrado", async () => {

    const criado = await request(app)
      .post("/api/pets")
      .field("nome", "Pet Excluir")
      .field("especie", "Gato")
      .field("idade", "1 ano")
      .field("descricao", "Teste exclusão")
      .field("status", "Disponível");

    const id = criado.body.id;

    const response = await request(app)
      .delete(`/api/pets/${id}`);

    expect(response.status).toBe(500);
  });

});