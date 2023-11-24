const express = require('express');
const global = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

global.post('/getglobales', verifica, async (req, res) => {
    const {numControl} = req.body;
    const sql = 'SELECT idglobales, descripcion, periodoescolar, fecha, estado, grado, grupo, g.idasiglobd FROM globales g, periodoescolar pe, alumno a, materias m WHERE g.idperiodoescolar = pe.idperiodoescolar AND g.alumnoNumControl = a.numControl AND m.idMateria = g.idMateria AND g.alumnoNumControl = ?';
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
global.post('/solicitudGlobal', verifica, async (req, res) => {
    const data = req.body;
    let tiempo = Date.now();
    let hoy = new Date(tiempo);
    data.fecha = hoy.toLocaleDateString();
    const sql = 'INSERT INTO solicitudglobal set numControl, idglobales, estado, frm5, ceap, idasiglobd, fecha values ?,?,?,?,?,?';
    const sqlestatus = 'UPDATE globales SET estado = ? WHERE idglobales = ?';
    try {
        const conexion = await ccn();
        const [respuesta] = await conexion.execute(sql, [data.numControl, data.idglobales, 0, null, null, data.idasiglobd, data.fecha]);
        const {actualizaEstatusGlobal} = await conexion.execute(sqlestatus, [1, data.idglobales]);
        console.log(respuesta, actualizaEstatusGlobal);
        if(respuesta.affectedRows > 0){
            res.json({data:true});
        }else{
            res.json({data:false});
        }
    } catch (error) {
        
    }
});




module.exports = global;