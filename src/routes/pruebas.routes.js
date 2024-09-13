const express = require('express');
const { insertNewProduct, insertNewEntrada, insertNewVenta, getProduct, getEntradas, getZeroStock, entradasTime, ventasTime, viewProduct, viewNameProduct, updateNameProduct, deleteProduct, deleteVentasTime, deleteDataEntradas } = require('../controllers/prueba.controller');
const routes = express.Router();

routes.post('/insertProduct', insertNewProduct);
routes.post('/insertEntrada', insertNewEntrada);
routes.post('/insertVenta', insertNewVenta);
routes.get('/getProduct', getProduct);
routes.get('/getEntradas', getEntradas);
routes.get('/getZeroStock', getZeroStock);
routes.get('/getEntradasF', entradasTime);
routes.get('/getVentasF', ventasTime);
routes.get('/getDtProduct', viewProduct);
routes.get('/getNameProduct', viewNameProduct);
routes.put('/updateNProduct/:id', updateNameProduct);
routes.delete('/deleteProduct/:id', deleteProduct);
routes.delete('/deleVentas', deleteVentasTime);
routes.delete('/deleteDataEntradas', deleteDataEntradas);
module.exports = routes;