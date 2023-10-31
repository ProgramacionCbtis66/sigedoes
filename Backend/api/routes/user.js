const express = require('express');
const jwt = require('jsonwebtoken');
const peticion = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

peticion.post('/datosUser', verifica, async (req, res) => {
    const numControl = req.body.numControl;
    const rol = req.body.rol;
    let sql = "";
    if(rol == "AL"){sql = 'select * from usuario join alumno on usuario.numControl = alumno.numControl where usuario.numControl = ?';}
    if(rol == "DO"){sql = 'select * from usuario join docente on usuario.numControl = docente.numControl where usuario.numControl = ?';}
    if(rol == "CE" || rol == "OE"){sql = "select * from usuario join administrativo on usuario.numControl = administrativo.numControl where usuario.numControl = ?";}
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [numControl]);
        if (registros.length > 0) {
            if(registros[0].foto!==null) {registros[0].foto = registros[0].foto.toString('utf-8');}
            let datos = JSON.stringify(registros[0]);
            let dato = JSON.parse(datos);
            
            res.json({ dato });
        } else {
            res.json({ Error: "no hay datos" })
        }
        await conexion.end();
    } catch (error) {
        console.log(error);
        res.json({ Error: "En base de datos" });
    }  
});

peticion.post('/solictudAcceso', verifica, async (req, res) => {
    
    
});

peticion.post('/NoPago', verifica, async (req, res) => {
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

peticion.post('/NoPagoDesactivo',verifica, async (req, res) => {
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

peticion.post('/SubirRegistro',verifica, async (req, res) => {
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
    console.log(numeroCtrl);
    const conexion = await ccn();
    try {
        const[registros] = await conexion.execute('SELECT * from usuario join alumno on usuario.numControl = alumno.numControl where usuario.numControl = ?', [numeroCtrl]);
        let datos = JSON.stringify(registros[0]);
        let data = JSON.parse(datos);
        console.log(data)
        res.json({data});
    } catch (error) {
        res.json({ err: "err" });
    }finally{
        conexion.end();
    }
});

peticion.post('/getContra', verifica, async (req, res) => {
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

peticion.post('/modificarPerfil',verifica, async (req, res) => {
    const usr = req.body;
    const conexion = await ccn();
    let sql = "";
    let rol = "";
    console.log(usr);
    try {
        if(usr.rol == "AL") rol = "alumno";
        if(usr.rol == "DO") rol = "docente";
        if(usr.rol == "CE" || usr.rol == "OE") rol = "administrativo";
            sql = `UPDATE usuario as u join ${rol} as x on u.numControl = x.numControl 
                   set u.foto = ${usr.foto},
                       u.password = ${usr.pass1},
                       x.direccion = ${usr.direccion},
                       x.telefono = ${usr.telefono},
                       x.facebook = ${usr.facebook},
                       x.twitter = ${usr.twitter},
                       x.whatsapp = ${usr.whatsapp},
                       x.instagram = ${usr.instagram}
                   where u.numControl = ${usr.numControl}`;
        const ModProfile = await conexion.execute(sql);
        if(ModProfile[0].foto!=null) ModProfile[0].foto = ModProfile[0].foto.toString('utf-8');
        let datos = JSON.stringify(ModProfile[0]);
        let dato = JSON.parse(datos);
        res.json({ dato });
    } catch (error) {
        console.log(error);
    }finally{
        conexion.end();
    }
});

module.exports = peticion;