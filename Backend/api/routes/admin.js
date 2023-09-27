const express = require('express');
const administrador = express.Router();

const ccn = require('../connection/connection');

const verifica= require('./verificaToken');


administrador.post('/solicitud', verifica, async (req,res)=>{
    const serv = req.body;
    sql = "insert into solicitud (numControl, codigoPago, fechaSolicitud,descripcion, aportacion,emitio,activo ) values (?,?,?,?,?,?,1)";
    try {
        const conexion = await ccn();
        const inserta = await conexion.execute(sql,[serv.numControl, serv.codigoPago, serv.fechaSolicitud,serv.descripcion,serv.aportacion ,serv.emitio]);
        res.json({msg:"ok"});
    } catch (error) {
        res.json({Error:"Codigo Repetido"});
    }finally{
        conexion.end();
    }
});

administrador.post('/usuarioAceptado', verifica, async (req, res) => {
    const alumno = req.body;
    try {
        const conexion = await ccn();
        const entrar = await conexion.execute('UPDATE alumno SET alta = ? WHERE numControl like ?', [alumno.op, alumno.numControl]);
        if (alumno.op == 1) res.json("Aceptado");
        if (alumno.op == 3) res.json("Rechazado");
    } catch (error) {
        res.json("error en la consulta");
    } finally {
        conexion.end();
    }
});

administrador.get('/listaUserNoReg', verifica, async (req, res) => {
    try {
        const conexion = await ccn();
        const listaUser = await conexion.execute('SELECT * FROM sigedoes.listausernoreg');
        res.send({ data: JSON.stringify(rows) });
    } catch (error) {
        res.json('');
    } finally {
        conexion.end();
    }
});

administrador.post('/guardarDatosEsc',verifica, async (req, res) => {
    const { nomEscuela, CTO, direccionEsc, correoEsc, telefEsc, nomDirec, periodo } = req.body;
    const conexion = await ccn();
    try {
        const guardarDatos = await conexion.execute('UPDATE escuela set CTO = ?, Esc_nombre = ?, Esc_direccion = ?, Esc_correo = ?, Esc_telefono = ?,  Esc_Periodo = ?, Esc_Director = ?', [CTO, nomEscuela, direccionEsc, correoEsc, telefEsc, periodo, nomDirec]);
        if (rows.affectedRows > 0) {
            res.json({ ok: "Se Han Modificado Los Datos" });
        } else {
            res.json({ ok: "No Se Ha Cambiado Nada" })
        }
    } catch (error) {
        res.json({ ok: "Ha Ocurrido Un Error Al Modificar" });
    } finally {
        conexion.end();
    }
});



module.exports = administrador;
