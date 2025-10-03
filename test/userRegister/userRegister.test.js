const { expect } = require('chai')
const request = require('supertest')
const postUser  = require('../rest/fixture/requisicoes/usuarios/postUser')
const existentUser  = require('../rest/fixture/requisicoes/usuarios/existentUser')

describe('Cadastro de usuário', () => {
  context('POST /users/register', () => {
      it('Deve cadastrar um usuário com sucesso', async () => {    
        const response = await request('http://localhost:3000')
          .post('/users/register')
          .send(postUser)
        expect(response.status).eq(201)
        expect(response.body.username).eq(postUser.username)
        expect(response.body.favorecidos).deep.equal(postUser.favorecidos)
      })

      it('Não deve cadastrar usuário já cadastrado', async () => {
        const newUserResponse = await request('http://localhost:3000')
          .post('/users/register')
          .send(existentUser)
        expect(newUserResponse.status).eq(201)

        const sameUserResponse = await request('http://localhost:3000')
          .post('/users/register')
          .send(existentUser)
        expect(sameUserResponse.status).eq(400)
        expect(sameUserResponse.body.error).eq('Usuário já existe')
    })
  })
})