const express = require('express');
const global = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

global.post('/getglobales', verifica, async (req, res) => {
    const {numControl} = req.body;
    const sql = 'SELECT idglobales, descripcion, periodoescolar, fecha, estado, grado, grupo FROM globales g, periodoescolar pe, alumno a, materias m WHERE g.idperiodoescolar = pe.idperiodoescolar AND g.alumnoNumControl = a.numControl AND m.idMateria = g.idMateria AND g.alumnoNumControl = ?';
    try{
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [numControl]);
        if(registros.length > 0){
            res.json({data: registros});
        } else {
            res.json({ data: [] });
        }
    } catch (err){
        console.log(err);
        res.json({ data: [] });
    }
});

module.exports = global;