
const request = require('supertest'); //requisicoes de API
const {expected, expect} = require('chai');

//Testes
describe ('Login',() => {    
    it ('Quando informo valores validos, tenho login bem sucedido com 200 CREATED', async () => {
    describe ('POST/users/login',() => {
       before(async () => {
             const postLogin = require('../fixture/requisicoes/login/postLogin.json');
           
                       const respostaLogin = await request(process.env.BASE_URL_REST)
                           .post('/users/login')
                           .send(postLogin);
           
                       token = respostaLogin.body.token;
                        expect(respostaLogin.status).to.equal(200);
                   });

        });

    });
}); 
