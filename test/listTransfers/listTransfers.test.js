const { expect } = require('chai')
const request = require('supertest')
const postLogin = require('../rest/fixture/requisicoes/login/postLogin.json')


describe('Listar Transferências', () => {
  let token

    before( async () => {
    const resposta = await request('http://localhost:3000')
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send(postLogin)

    token = resposta.body.token  
  })

  it('Deve listar transferências com sucesso', async () => {    
    const response = await request('http://localhost:3000')
      .get('/transfers')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).eq(200)
    expect(response.body).to.be.an('array')
    // expect(response.body.message).to.equal("Lista de transferências") 
   })

  it('Deve retornar erro ao não informar o token', async () => {    
    const response = await request('http://localhost:3000')
      .get('/transfers')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer `)

    expect(response.status).eq(401)
    expect(response.body.message).to.equal("Token não fornecido.")
    // expect(response.body.message).to.equal("Token não fornecido ou inválido")
  })
})