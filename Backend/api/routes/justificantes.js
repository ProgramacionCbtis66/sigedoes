const express = require('express');
const just = express.Router();
const ccn = require('../connection/connection');
const verifica = require('./verificaToken');

just.post('/obtenerdatos', verifica, async (req, res) => { 
    const datos = req.body;
    const sql = 'select * from justificante'
    try {
     const conexion = await cnn();
     const registros = await conexion.execute(sql);
     if (registros.length > 0) {
        res.json({data: registros[0][0]});
     }
     else {
        res.json({data:[]})
     }
    }catch(err) {
    }
})

just.post('/guardardatos',verifica, async (req, res) => {
    const datos = req.body;
    const sql = 'insert into justificante (numControl, motivo, periodo, inetutor, cartatutor, doctoref, tipo, fecha, estado) values (?,?,?,?,?,?,?,?,?)';
    try {
        const conexion = await cnn();
        const resultado = await conexion.execute(sql, [datos.numControl, datos.motivo, datos.periodo, datos.inetutor, datos.cartatutor, datos.doctoref, datos.tipo, datos.fecha, 0]);
        if (resultado[0].affectedRows > 0) {
            res.json({status: 'Registrado'});
        }
        else {
            res.json({status: 'error'});
        }
    }catch(err) {   
        res.json({status: 'error'});
    }
})




module.exports = just;