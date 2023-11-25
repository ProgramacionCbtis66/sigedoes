const express = require('express');
const recursa = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

recursa.get('/getrecursa', verifica, async (req, res) => {
    const {numControl} = req.body;
    const sql = 'SELECT idrecursas, descripcion, periodoescolar, fecha, estado, grado, grupo, FROM recursas r, periodoescolar pe, alumno a, materias m WHERE r.idperiodoescolar = pe.idperiodoescolar AND r.alumnoNumControl = a.numControl AND m.idMateria = r.idMateria AND r.alumnoNumControl = ?';
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

module.exports = recursa;