const express = require('express');
const global = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

global.get('/traerdatos', verifica, async (req, res) => {
    const sql = 'SELECT nombre, apellidoP, apellidoM, docenteDni, idMateria, idperiodoescolar, fecha, estado FROM globales';
    try{
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql);
        console.log(res);
    } catch (err){
        console.log(err);
        res.json({ data: [] });
    }
});