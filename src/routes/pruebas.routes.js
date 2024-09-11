const express = require('express');
const { insertNewProduct, insertNewEntrada, insertNewVenta, getProduct, getEntradas, getZeroStock } = require('../controllers/prueba.controller');
const routes = express.Router();

routes.post('/insertProduct', insertNewProduct);
routes.post('/insertEntrada', insertNewEntrada);
routes.post('/insertVenta', insertNewVenta);
routes.get('/getProduct', getProduct);
routes.get('/getEntradas', getEntradas);
routes.get('/getZeroStock', getZeroStock);
module.exports = routes;