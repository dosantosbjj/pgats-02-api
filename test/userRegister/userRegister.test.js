const { expect } = require('chai')
const request = require('supertest')
const  postUser  = require('../rest/fixture/requisicoes/usuarios/postUser')
const  existentUser  = require('../rest/fixture/requisicoes/usuarios/existentUser')

describe('Cadastro de usuário', () => {
  context('POST /users/register', () => {
    const requestBody = {
      username : postUser.username,
      password : postUser.password,
      favorecidos : postUser.favorecidos
    }
      it('Deve cadastrar um usuário com sucesso', async () => {    
        const response = await request('http://localhost:3000')
          .post('/users/register')
          .send(postUser)
        console.log(response.body)
        expect(response.status).eq(201)
        expect(response.body.username).eq(requestBody.username)
        expect(response.body.favorecidos).deep.equal(requestBody.favorecidos)
      })

      it.only('Não deve cadastrar usuário já cadastrado', async () => {
        const requestBody = {
          username : existentUser.username,
          password : existentUser.password,
          favorecidos : existentUser.favorecidos
        }
    
        const newUserResponse = await request('http://localhost:3000')
          .post('/users/register')
          .send(requestBody)
        expect(newUserResponse.status).eq(201)

        const sameUserResponse = await request('http://localhost:3000')
          .post('/users/register')
          .send(requestBody)
        expect(sameUserResponse.status).eq(400)
        expect(sameUserResponse.body.error).eq('Usuário já existe')
    })
  })
})
