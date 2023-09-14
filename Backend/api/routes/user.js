const express = require('express');
const jwt = require('jsonwebtoken');
const peticion = express.Router();

const ccn = require('../connection/connection');

peticion.post('/forgotPassword', async (req, res) => {
    const correo = req.body.correo;
    const sql = 'select * from forgotpassword where correo like ?';
    const conexion = await ccn();
    try {
        const [registros] = await conexion.execute(sql, [correo]);
        if (registros.length > 0) {
            let datos = JSON.stringify(registros[0]);
            let dato = JSON.parse(datos);
            dato.tipo = "forgotPassword";
            let data = JSON.stringify(dato);
            const usuario = jwt.sign(data, 'MA@L', {expiresIn:'20m'});
            res.json({ usuario });
        } else {
            res.json({ Error: "Correo invalido" });
        }

    } catch (error) {
        res.json({ Error: error });
    } finally {
        conexion.end();
    }



});

peticion.post('/login', async (req, res) => {
    const { nombre, pass } = req.body;
    //let sql = 'select usuario.exp, alumno.nombre as nombre, usuario.rol as rol, usuario.numControl as numControl from usuario join alumno on usuario.numControl = alumno.numControl where usuario.numControl like ? and usuario.password = ? and alumno.alta = 1';
    let sql = 'CALL login(?,?)';
    const conexion = await ccn();
    try {
        const [registros] = await conexion.execute(sql, [nombre, pass]);
        if (registros.length > 0) {
            let datos = JSON.stringify(rows[0]);
            let dato = JSON.parse(datos);
            dato.exp = Date.now() / 1000 + (parseInt(dato.exp));
            let data = JSON.stringify(dato);
            const token = jwt.sign(data, 'MA@L');
            res.json({ token });
        } else {
            res.json({ Error: "Usuario y contraseña incorrecta" });
        }
    } catch (error) {
        res.json({ Error: error });
    } finally {
        conexion.end();
    }
});

peticion.post('/registro', async (req, res) => {
    const { nombre, correo, pass, pass2, curp, noctrl, especialidad, semestre, area, turno, direccion, CTO, grupo } = req.body;
    const horario = "7:00 - 15:00";
    const alta = 0;
    const rol = "user";
    //Subir datos a la tabla usuario
    try {
        const conexion = await ccn();
        const consulta1 = await conexion.execute('INSERT INTO usuario (userName, numControl, password, rol, exp, nombre) VALUES (?, ?, ?, ?, ?, ?)', [noctrl, noctrl, pass2, rol, 600, nombre]);
        const consulta2 = await conexion.execute('INSERT INTO alumno (numControl,nombre,direccion,especialidad,area,grado,grupo,turno,horario,CTO,correo,alta,CURP) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [noctrl, nombre, direccion, especialidad, area, semestre, grupo, turno, horario, CTO, correo, alta, curp]);

        res.json({ Aceptado: "Datos Aceptados" });
    } catch (error) {
        res.json({ Error: "Los Datos No Fueron Aceptados" });
    } finally {
        conexion.end();
    }
});

peticion.post('/datosUser', async (req, res) => {
    const numControl = req.body.numcontrol;
    const sql = 'select * from pdf where numControl = ?';
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [numControl.toString()]);
        if (registros.length > 0) {
            let datos = JSON.stringify(registros[0]);
            let dato = JSON.parse(datos);
            let data = JSON.stringify(dato);
            res.json({ data });
        } else {
            res.json({ Error: "no hay datos" })
        }
    } catch (error) {
        res.json({ Error: "En base de datos" });
    } finally {
        conexion.end();
    }

});

peticion.post('/usuarioAceptado', async (req, res) => {
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

peticion.get('/listaUserNoReg', async (req, res) => {
    try {
        const conexion = await ccn();
        const listaUser = await conexion.execute('select usuario.password as password, alumno.nombre as nombre, alumno.numControl as numControl,alumno.correo as correo, alumno.grado as grado, alumno.grupo as grupo, alumno.turno as turno, alumno.especialidad as especialidad from alumno join usuario on alumno.numControl = usuario.numControl where alta = 0');
        res.send({ data: JSON.stringify(rows) });
    } catch (error) {
        res.json('');
    } finally {
        conexion.end();
    }
});

peticion.post('/NoPago', async (req, res) => {
    const { NoPago, numControl } = req.body;
    const conexion = await ccn();
    try {
        const noPago = await conexion.execute('SELECT codigoPago from solicitud where codigoPago like ? and numControl = ? and activo = 1', [NoPago, numControl]);
        if (rows.length > 0) {
            res.json({ valido: "Aceptado" });
        }
    } catch (error) {
        res.json({ Error: "Número Invalido" });
    } finally {
        conexion.end();
    }
});

peticion.post('/verificaNoPago', async (req, res) => {
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

peticion.post('/NoPagoDesactivo', async (req, res) => {
    const codpag = req.body;
    const conexion = await ccn();
    try {
        const NopagoDesc = await conexion.execute('UPDATE solicitud set activo = 0 where codigoPago = ?', [codpag.NoPago]);
        res.json({ msg: "ok" });
    } catch (error) {
        res.json({ Error: "Error" })
    } finally {
        conexion.end();
    }
});

peticion.post('/ObtenerDatosPago', async (req, res) => {
    const NoPago = req.body;
    const conexion = await ccn();
    try {
        const ObDatosPag = await conexion.execute('SELECT * from solicitud where codigoPago = ?', [NoPago.NoPago]);
        let datos = JSON.stringify(rows[0].emitio);
        let dato = JSON.parse(datos);
        let data = JSON.stringify(dato);

        let datoos = JSON.stringify(rows[0].fechaSolicitud);
        let datoo = JSON.parse(datoos);
        let dataa = JSON.stringify(datoo);
        res.json({ "nombre": dataa, "emitio": data });
    } catch (error) {
        res.json({ err: "err" });
    }finally    {
        conexion.end();
    }
});

peticion.post('/SubirRegistro', async (req, res) => {
    const { NoCtrl, emitio, fecha, CodPago } = req.body;
    const conexion = await ccn();
    try {
        const SubirRegistro = await ccn.query('INSERT INTO emitidas (NoCtrl,emitio,fecha,CodPago) VALUES (?,?,?,?)', [NoCtrl, emitio, fecha, CodPago]);
        res.json({ ok: "ok" })
    } catch (error) {
        res.json({ err: "err" })
    }finally{
        conexion.end();
    }
});

peticion.post('/verInfo', async (req, res) => {
    const { numeroCtrl } = req.body;
    const conexion = await ccn();
    try {
        const verInfo = await conexion.execute('SELECT * from alumno where numControl = ?', [numeroCtrl]);
        res.json({ ok: "ok", data: rows[0] });
    } catch (error) {
        res.json({ err: "err" });
    }finally{
        conexion.end();
    }
});

peticion.post('/getContra', async (req, res) => {
    const { numcontrol } = req.body;
    const conexion = await ccn();
    try {
        const contra = await conexion.execute('Select password from usuario where userName = ?', [numcontrol]);
        if (rows.length > 0) {
            let datos = JSON.stringify(rows[0].password);
            let dato = JSON.parse(datos);
            let contraseña = JSON.stringify(dato);
            res.json({ contra: contraseña });
        }
    } catch (error) {
        //no tiene otra sentencia aparte del res.json del if
    }finally{
        conexion.end();
    }
});

peticion.post('/modifyProfile', async (req, res) => {
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

peticion.get('/GetdatosEsc', async (req, res) => {
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

peticion.post('/guardarDatosEsc', async (req, res) => {
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

peticion.get('/optenerClavesEsp', async (req, res) => {
    try {
        const claves = await ccn.query('SELECT * from cbeEsp');
        res.send({ programacion: JSON.stringify(rows[0]), contabilidad: JSON.stringify(rows[1]), electricidad: JSON.stringify(rows[2]), alimentos: JSON.stringify(rows[3]), soporte: JSON.stringify(rows[4]) });
    } catch (error) {
        res.send({ err: "err" });
    } finally {
        conexion.end();
    }
});

peticion.post('/guardarClavesEspProg', async (req, res) => {
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

peticion.post('/guardarClavesEspconta', async (req, res) => {
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

peticion.post('/guardarClavesEspElectricidad', async (req, res) => {
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

peticion.post('/guardarClavesEspAlimentos', async (req, res) => {
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

peticion.post('/guardarClavesEspSoporte', async (req, res) => {
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



module.exports = peticion;
