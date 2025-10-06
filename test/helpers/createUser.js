const { expect } = require('chai')
const request = require('supertest')

async function createUser({user}){
    response = await request(process.env.BASE_URL_REST)
        .post('/users/register')
        .send({username: user.username, password: user.password, favorecidos: user.favorecidos})
    expect(response.status).eq(201)
    const usuario = response.body
    return usuario
}

module.exports  = { createUser }