
const request = require('supertest') //requisicoes de API
const {expect} = require('chai')
const postLogin = require('../fixture/requisicoes/login/postLogin.json')

//Testes
describe ('Login',() => {    
    describe ('POST/users/login',() => {
        it('Quando informo valores validos, tenho login bem sucedido com 200 CREATED', async () => {
            const respostaLogin = await request(process.env.BASE_URL_REST)
                .post('/users/login')
                .send(postLogin)

            token = respostaLogin.body.token
            expect(respostaLogin.status).to.equal(200)
        })
        it('Quando informo valores invalidos, tenho login mal sucedido com 400 BAD REQUEST', async () => {
            const respostaLogin = await request(process.env.BASE_URL_REST)
            .post('/users/login')
            .send({
                username: 'julio',
                senha: '12345',
            })
            token = respostaLogin.body.token
            expect(respostaLogin.status).to.equal(400)
        })
    })
}) 
