const {Router} = require('express');
const {createOrdenConstancias, receiveWebhookConstancias, pendienteConstancias} = require('../controller/payment.controller');
const verificar = require('./verificaToken');

const ordenPago = Router()
ordenPago.post('/create-order-cosntancias', createOrdenConstancias);

ordenPago.get('/success-constancias',(req,res) => res.send('success'))

ordenPago.get('/failure-constancias',(req,res) => res.send('failure'))

ordenPago.post('/pending-constancias',pendienteConstancias);

ordenPago.post('/webhook-constancias',receiveWebhookConstancias);

module.exports = ordenPago;