const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
const favorecidoController = require("../rest/fixture/requisicoes/favorecidos/getFavorecidos.json");

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userController);
app.use('/transfers', transferController);

app.get("/users", (req, res) => {
  res.json(favorecidoController);
});

module.exports = app;
