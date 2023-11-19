const express = require('express');
const just = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

just.get('/obtenerdatos', verifica, async (req, res) => {
    const sql = 'select u.nombre, u.apellidoP, u.apellidoM, u.numControl, u.foto, j.motivo, j.periodo, j.inetutor, j.cartatutor, j.documentoreferencia, j.tipo, j.fecha, a.especialidad, a.grado, a.grupo, a.turno, j.correoTutor, j.nombreTutor, j.estado, j.observaciones, j.fechaEstado, j.idjustificante, j.horas1, j.horas2, a.correo from justificante as j join alumno as a on j.numControl = a.numControl join usuario as u on a.numControl = u.numControl';
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql);
        if (registros.length > 0) {

            for (var i = 0; i < registros.length; i++) {
                if (registros[i].foto != null) {
                    registros[i].foto = registros[i].foto = registros[i].foto.toString('utf-8');
                }

                if (registros[i].inetutor != null) {
                    registros[i].inetutor = registros[i].inetutor = registros[i].inetutor.toString('utf-8');
                }

                if (registros[i].cartatutor != null) {
                    registros[i].cartatutor = registros[i].cartatutor = registros[i].cartatutor.toString('utf-8');
                }

                if (registros[i].documentoreferencia != null) {
                    registros[i].documentoreferencia = registros[i].documentoreferencia = registros[i].documentoreferencia.toString('utf-8');
                }
            }
            res.json({ data: JSON.parse(JSON.stringify(registros)) });
        }
        else {
            res.json({ data: [] })
        }

    } catch (err) {
        console.log(err);
        res.json({ data: [] })
    }
})


just.post('/guardardatos', verifica, async (req, res) => {
    const datos = req.body;
    const sql = 'insert into justificante (numControl, motivo, periodo, inetutor, cartatutor, doctoref, tipo, fecha, estado) values (?,?,?,?,?,?,?,?,?)';
    try {
        const conexion = await ccn();
        const resultado = await conexion.execute(sql, [datos.numControl, datos.motivo, datos.periodo, datos.inetutor, datos.cartatutor, datos.doctoref, datos.tipo, datos.fecha, 0]);
        if (resultado[0].affectedRows > 0) {
            res.json({ status: 'Registrado' });
        }
        else {
            res.json({ status: 'error' });
        }
    } catch (err) {
        res.json({ status: 'error' });
    }
})

just.post('/aprobarJustificante', verifica, async (req, res) => {
    const alumno = req.body;
    
    const sql1 = 'update justificante set estado = ?, observaciones = ?, fechaEstado = ? , horas1 = ?, horas2= ? where idjustificante = ?';
  
        const conexion = await ccn();
        const resultado = await conexion.execute(sql1, [0, alumno.observaciones, alumno.fechaEstado, alumno.horas1, alumno.horas2, alumno.idjustificante]);
        if (resultado[0].affectedRows > 0) {
            if (alumno.estado == 1) {
                res.json({ data: true });
            }
            else {
                res.json({ data: false });
            }
        }
})


module.exports = just;