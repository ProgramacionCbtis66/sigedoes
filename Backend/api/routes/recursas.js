const express = require('express');
const recursa = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

recursa.post('/getrecursas', verifica, async (req, res) => {
    const {numControl} = req.body;
    const sql = 'SELECT idrecursa, descripcion, periodoescolar, fecha, estado, grado, grupo, r.idasigrecursa FROM recursas r, periodoescolar pe, alumno a, materias m WHERE r.idperiodoescolar = pe.idperiodoescolar AND r.alumnoNumControl = a.numControl AND m.idMateria = r.idMateria AND r.alumnoNumControl = ?';
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

recursa.post('/solicitudRecursas', verifica, async (req, res) => {
    const data = req.body;
    let tiempo = Date.now();
    let hoy = new Date(tiempo);
    data.fecha = hoy.toLocaleDateString();
    const sql = 'INSERT INTO solicitudrecursa (numControl, idrecursas, estado, frm5, ceap, idasigrecursa, fecha) values (?,?,?,?,?,?,?)';
    const sqlestatus = 'UPDATE recursas SET estado = ? WHERE idrecursa = ?';
    try {
        const conexion = await ccn();
        const [respuesta] = await conexion.execute(sql, [data.numControl, data.idrecursa, 0, null, null, data.idasigrecursa, data.fecha]);
        const [actualizaEstatusRecursa] = await conexion.execute(sqlestatus, [1, data.idrecursa]);
        if(respuesta.affectedRows > 0){
            res.json({data:true});
        }else{
            res.json({data:false});
        }
    } catch (error) {
        console.error(error);
    }
});

recursa.post('/sendPagosrecursas', verifica, async (req, res) => {
    const data = req.body;
    console.log(data);
    const sql = 'UPDATE solicitudrecursa SET frm5=?, ceap=? WHERE idsolicitudrecursa = ?';
    const sqlestatus = 'UPDATE recursas SET estado = ? WHERE idsolicitudrecursa = ?';
    try {
        const conexion = await ccn();
        const [respuesta] = await conexion.execute(sql, [data.frm5, data.ceap, data.idsolicitudrecursa]);
        const [actualizaEstatusRecursa] = await conexion.execute(sqlestatus, [3, data.idsolicitudrecursa]);
        console.log(respuesta);
        if(respuesta.affectedRows > 0){
            res.json({data:true});
        }else{
            res.json({data:false});
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = recursa;