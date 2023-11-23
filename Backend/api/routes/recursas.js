const express = require('express');
const recursa = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

recursa.get('/traerdatos', verifica, async (req, res) => {
    const sql = 'SELECT nombre, apellidoP, apellidoM, idMateria, idperiodoescolar, docenteDni, fecha, estado, docenteDniApli FROM globales';
    try{
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql);
        console.log(res);
    } catch (err){
        console.log(err);
        res.json({ data: [] });
    }
});