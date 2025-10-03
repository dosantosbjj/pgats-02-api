const request = require("supertest");
const { expect } = require("chai");
const app = require("../../app"); 
const favorecidoController = require("../rest/fixture/requisicoes/favorecidos/getFavorecidos.json");

//Testes
describe("GET /users", () => {
  it("Deve retornar uma lista de usuários com sucesso", async () => {
    const res = await request(app).get("/users");

    // Verifica status
    expect(res.status).to.equal(200);

    // Verifica se a resposta é um array
    expect(res.body).to.be.an("array");

    // Verifica se tem pelo menos 1 usuário
    expect(res.body.length).to.be.greaterThan(0);

      // Verifica se o tamanho do retorno é igual ao da constante
    expect(res.body.length).to.equal(favorecidoController.length);

    // Verifica se o conteúdo retornado é exatamente o mesmo da constante
    expect(res.body).to.deep.equal(favorecidoController);

    // Verifica se os objetos têm username, favorecido e saldo
    expect(res.body[0]).to.have.property("username");
    expect(res.body[0]).to.have.property("favorecidos");
    expect(res.body[0]).to.have.property("saldo");
  });
});