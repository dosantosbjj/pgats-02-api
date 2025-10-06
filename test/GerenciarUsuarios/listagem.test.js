const request = require('supertest')
const { expect } = require('chai')

//Testes
describe('GET /users', () => {
  it('Deve retornar uma lista de usuários com sucesso', async () => {
    const res = await request(process.env.BASE_URL_REST).get('/users')
    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body.length).to.be.greaterThan(0)
    expect(res.body[0]).to.have.property('username')
    expect(res.body[0]).to.have.property('favorecidos')
    expect(res.body[0]).to.have.property('saldo')
  })
})