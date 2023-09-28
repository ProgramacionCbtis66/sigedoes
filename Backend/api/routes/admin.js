const express = require('express');
const administrador = express.Router();

const ccn = require('../connection/connection');

const verifica= require('./verificaToken');

administrador.post('/verificaNoPago', verifica,async (req, res) => {
    const { numPago } = req.body;
    const conexion = await ccn();
    try {
        const verificaNoPago = await conexion.execute('SELECT codigoPago from solicitud where codigoPago like ?', [numPago]);
        if (rows.length <= 0) {
            res.json({ valido: "Aceptado" });
        }
    } catch (error) {
        res.json({ Error: "Número Invalido" });
    } finally {
        conexion.end();
    }
});

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
administrador.get('/GetdatosEsc',verifica, async (req, res) => {
    const conexion = await ccn();
    try {
        const datosEsc = await conexion.execute('SELECT * from escuela');
        res.send({ data: JSON.stringify(rows[0]) });
    } catch (error) {
        res.send({ err: "err" });
    } finally {
        conexion.end();
    }
});

administrador.get('/getClavesEsp',verifica, async (req, res) => {
    try {
        const claves = await ccn.query('SELECT * from cbeEsp');
        res.send({ programacion: JSON.stringify(rows[0]), contabilidad: JSON.stringify(rows[1]), electricidad: JSON.stringify(rows[2]), alimentos: JSON.stringify(rows[3]), soporte: JSON.stringify(rows[4]) });
    } catch (error) {
        res.send({ err: "err" });
    } finally {
        conexion.end();
    }
});

administrador.post('/guardarClavesEspProg',verifica, async (req, res) => {
    const { programacion } = req.body;
    const conexion = await ccn();
    try {
        const gClavesProg = await conexion.execute('UPDATE cbeEsp set Clave = ? where idcbeEsp = 1', [programacion]);
        if (rows.affectedRows > 0) {
            res.send({ ok: "Clave De Programación Modificada" });
        }
    } catch (error) {
        //No sentencia
    } finally {
        conexion.end();
    }
});

administrador.post('/guardarClavesEspconta',verifica, async (req, res) => {
    const { contabilidad } = req.body;
    const conexion = await ccn();
    try {
        const gClavesConta = await conexion.execute('UPDATE cbeEsp set Clave = ? where idcbeEsp = 2', [contabilidad]);
        if (rows.affectedRows > 0) {
            res.send({ ok: "Clave De Contabilidad Modificada" });
        }
    } catch (error) {
        //No sentencia
    }
});

administrador.post('/guardarClavesEspElectricidad',verifica, async (req, res) => {
    const { electricidad } = req.body;
    const conexion = await ccn();
    try {
        const gClavesElec = await conexion.execute('UPDATE cbeEsp set Clave = ? where idcbeEsp = 3', [electricidad]);
        if (rows.affectedRows > 0) {
            res.send({ ok: "Clave De Electricidad Modificada" });
        }
    } catch (error) {
        //No sentencia
    } finally {
        conexion.end();
    }
});
administrador.post('/guardarClavesEspAlimentos',verifica, async (req, res) => {
    const { alimentos } = req.body;
    const conexion = await ccn();
    try {
        const gClavesAli = await conexion.execute('UPDATE cbeEsp set Clave = ? where idcbeEsp = 5', [alimentos]);
        if (rows.affectedRows > 0) {
            res.send({ ok: "Clave De Alimentos Modificada" });
        }
    } catch (error) {
        //No sentencia
    } finally {
        conexion.end();
    }
});

administrador.post('/guardarClavesEspSoporte',verifica, async (req, res) => {
    const { soporte } = req.body;
    const conexion = await ccn();
    try {
        const gClavesSop = await conexion.execute('UPDATE cbeEsp set Clave = ? where idcbeEsp = 6', [soporte]);
        if (rows.affectedRows > 0) {
            res.send({ ok: "Clave De Soporte Modificada" });
        }
    } catch (error) {
        //No Sentencia
    } finally {
        conexion.end();
    }
});


module.exports = administrador;
