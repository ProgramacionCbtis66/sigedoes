const express = require('express');
const docente = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

docente.post('/datosDocente', verifica, async (req, res) => {
    const numControl = req.body.numControl;
 
    const sql = 'select * from queryDocente where numControl = ?';
    try {
        const conexion = await ccn();
        console.log(numControl);
        const [registros] = await conexion.execute(sql, [numControl]);
        if (registros.length > 0) {
            if(registros[0].foto!==null) {registros[0].foto = registros[0].foto.toString('utf-8');}
            let datos = JSON.stringify(registros[0]);
            let data = JSON.parse(datos);
            console.log(registros[0].foto);
            res.json({ data });
        } else {
            res.json({ Error: "no hay datos" })
        }
        await conexion.end();
    } catch (error) {
        console.log(error);
        res.json({ Error: "En base de datos" });
    }  
});

docente.post('/modifyProfile',verifica, async (req, res) => {
    const { alumno, curp, numControl, especialidad, grado, grupo, correo, turno } = req.body;
    const conexion = await ccn();
    try {
        const ModProfile = await conexion.execute('UPDATE alumno set nombre = ?, especialidad = ?, CURP = ?, grado = ?, grupo = ?, correo = ?, turno = ? where numControl = ?', [alumno, especialidad, curp, grado, grupo, correo, turno, numControl]);
        res.json({ ok: "ok" });
    } catch (error) {
        // no tiene otra sentencia aparte del res.json
    }finally{
        conexion.end();
    }
});

module.exports = docente;
