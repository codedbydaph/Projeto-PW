import request from "supertest";
import app from "../server.js";

describe("Relatório JOIN", () => {

  test("CTI07 - Buscar relatório de adoções", async () => {

    const response = await request(app)
      .get("/api/relatorio-join");

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body))
      .toBe(true);
  });

}); 
