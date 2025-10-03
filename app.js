const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');


const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userController);
app.use('/transfers', transferController);

// Exemplo de dados para usuários e favorecidos
const favorecidos = [
   { "username": "julio", "favorecidos": "priscila", "saldo": 10000 },
    { "username": "priscila", "favorecidos": "julio", "saldo": 10000 }
];

app.get("/users", (req, res) => {
  res.json(favorecidos);
});

module.exports = app;
