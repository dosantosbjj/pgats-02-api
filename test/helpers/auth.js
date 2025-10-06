const request = require('supertest')

async function login(usuario, senha) {
    const respostaLogin = await request('localhost:3000')
        .post('/users/login')
        .send({username : usuario, password: senha})
        .set('Content-Type', 'application/json')
    const token = respostaLogin.body.token
    return token
}

module.exports = { login }