const {Router} = require('express');
const {createOrden, receiveWebhook, pendiente} = require('../controller/payment.controller');
const verificar = require('./verificaToken');

const ordenPago = Router()
ordenPago.post('/create-order', verificar, createOrden);

ordenPago.get('/success',(req,res) => res.send('success'))

ordenPago.get('/failure',(req,res) => res.send('failure'))

ordenPago.post('/pending',pendiente);

ordenPago.post('/webhook',receiveWebhook);

module.exports = ordenPago;