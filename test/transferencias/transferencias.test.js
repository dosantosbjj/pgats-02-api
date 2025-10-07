const { expect } = require('chai');
const request = require('supertest')
const postTransfer = require('../fixture/requisicoes/transferencias/postTransfer.json')
const postLogin = require('../fixture/requisicoes/login/postLogin.json')
const { login } = require('../helpers/auth')
const { createUser } = require('../helpers/createUser')

require('dotenv').config();

describe('Testes de transferência', () => {
    let token
    context('POST /transfers', () => {
        beforeEach(async() => {
            token = await login(postLogin.username, postLogin.password)
        })  

        it('Não deve efetuar transferência maior que R$ 5.000,00 para destinatário não favorecido', async () => {
            const randomNumber = Math.floor(Math.random() * 10000)
            const user = {
                username: `aluno.mentoria.${randomNumber}`,
                password: '123456',
                favorecidos: ['Maria', 'João']
            }

            const novoUsuario = await createUser({user})
            const requestBody = { ...postTransfer}
            requestBody.value = 5001
            requestBody.to = novoUsuario.username

            const postTransferencia = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send(requestBody)
            expect(postTransferencia.status).eq(400)
            expect(postTransferencia.body.error).eq('Transferência acima de R$ 5.000,00 só para favorecidos')     
        })

        it('Não deve efetuar a transferência se o saldo for insuficiente', async() => {
            const requestBody = { ...postTransfer}
            requestBody.value = 12000

            const postTransferencia = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send(requestBody)
            expect(postTransferencia.status).eq(400)
            expect(postTransferencia.body.error).eq('Saldo insuficiente')    
        })

        it('Não deve efetuar uma transferência se o remetente for inválido', async () => {
            const requestBody = { ...postTransfer}
            requestBody.from = 'aluno_clt'

            const postTransferencia = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send(requestBody)
            expect(postTransferencia.status).eq(400)
            expect(postTransferencia.body.error).eq('Usuário remetente ou destinatário não encontrado')
        })  
        
        it('Não deve efetuar a transferência se o destinatário for inválido', async () => {
            const requestBody = { ...postTransfer}
            requestBody.to = 'aluno_premiado'

            const postTransferencia = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send(requestBody)
            expect(postTransferencia.status).eq(400)
            expect(postTransferencia.body.error).eq('Usuário remetente ou destinatário não encontrado')
        }) 

        it('Deve efetuar uma transferência entre dois usuários válidos', async () => {
            const requestBody = { ...postTransfer}
            const postTransferencia = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send(requestBody)
            expect(postTransferencia.status).eq(201)
        })  

        it('Deve efetuar uma transferência maior que R$ 5.000,00 para um destinatário favorecido', async () => {
            const requestBody = { ...postTransfer}
            requestBody.value = 5001

            const postTransferencia = await request('localhost:3000')
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send(requestBody)
            expect(postTransferencia.status).eq(201)
        })                
    })
})