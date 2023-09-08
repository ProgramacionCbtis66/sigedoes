const express = require('express');
const jwt = require('jsonwebtoken');
const peticion = express.peticion();

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
            const usuario = jwt.sign(data, 'stil');
            res.json({ usuario });
        } else {
            res.json({ Error: "Correo invalido" });
        }

    } catch (error) {
        res.json({ Error: error });
    }finally{
        conexion.end();
    }


});

peticion.post('/login', async (req, res) => {
    const { nombre, pass } = req.body;
    let sql = 'select usuario.exp, alumno.nombre as nombre, usuario.rol as rol, usuario.numControl as numControl from usuario join alumno on usuario.numControl = alumno.numControl where usuario.numControl like ? and usuario.password = ? and alumno.alta = 1';
    const conexion = await ccn();
    try {
        const [registros] = await conexion.execute(sql, [nombre, pass]);
        if (registros.length > 0) {
            let datos = JSON.stringify(rows[0]);
            let dato = JSON.parse(datos);
            dato.exp = Date.now() / 1000 + (parseInt(dato.exp));
            let data = JSON.stringify(dato);
            const token = jwt.sign(data, 'stil');
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
        const consulta1 = await ccn.query('INSERT INTO usuario (userName, numControl, password, rol, exp, nombre) VALUES (?, ?, ?, ?, ?, ?)', [noctrl, noctrl, pass2, rol, 600, nombre]);
        const consulta2 = await ccn.query('INSERT INTO alumno (numControl,nombre,direccion,especialidad,area,grado,grupo,turno,horario,CTO,correo,alta,CURP) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [noctrl, nombre, direccion, especialidad, area, semestre, grupo, turno, horario, CTO, correo, alta, curp]);

        res.json({ Aceptado: "Datos Aceptados" });
    } catch (error) {
        res.json({ Error: "Los Datos No Fueron Aceptados" });
    }
});

peticion.post('/datosUser', async (req, res) => {
    const numControl = req.body.numcontrol;
    const sql = 'select * from pdf where numControl = ?';
    try {
        const [datos] = await ccn.quey(sql,[numControl.toString()]);
        //cosnt [datosUser]= conexion.execute();
        if(rows.length > 0){
            let datos = JSON.stringify(rows[0]);
            let dato = JSON.parse(datos);
            let data = JSON.stringify(dato);
            res.json({ data });
        }else{ 
            res.json({ Error: "no hay datos" })
        }
    } catch (error) {
        res.json({ Error: "En base de datos" });
    }

});

peticion.post('/usuarioAceptado', async (req, res) => {
    const alumno = req.body;
    try {
        const entrar = await ccn.query('UPDATE alumno SET alta = ? WHERE numControl like ?', [alumno.op, alumno.numControl]);
        if (!err) {
            if (alumno.op == 1) res.json("Aceptado");
            if (alumno.op == 3) res.json("Rechazado");
        }else{
            res.json("error en la cunsulta");
        }
    } catch (error) {
       
    }

    ccn.query('UPDATE alumno SET alta = ? WHERE numControl like ?', [alumno.op, alumno.numControl],
        (err, rows, fields) => {
            if (!err) {
                if (alumno.op == 1) res.json("Aceptado");
                if (alumno.op == 3) res.json("Rechazado");
            } else {
                res.json("error en la cunsulta");
            }
        });
});

peticion.get('/listaUserNoReg',async(req, res) => {
    try {
        const listaUser = await ccn.query('select usuario.password as password, alumno.nombre as nombre, alumno.numControl as numControl,alumno.correo as correo, alumno.grado as grado, alumno.grupo as grupo, alumno.turno as turno, alumno.especialidad as especialidad from alumno join usuario on alumno.numControl = usuario.numControl where alta = 0');
        res.send({ data: JSON.stringify(rows) });
    } catch (error) {
        res.json('');
    }

    ccn.query('select usuario.password as password, alumno.nombre as nombre, alumno.numControl as numControl,alumno.correo as correo, alumno.grado as grado, alumno.grupo as grupo, alumno.turno as turno, alumno.especialidad as especialidad from alumno join usuario on alumno.numControl = usuario.numControl where alta = 0',
        (err, rows, fields) => {
            if (!err) {
                res.send({ data: JSON.stringify(rows) });
            } else {
                res.json('');
            }
        });
});

peticion.post('/NoPago', async (req, res) => {
    const { NoPago, numControl } = req.body;
   
    try {
        const noPago =   ccn.query('SELECT codigoPago from solicitud where codigoPago like ? and numControl = ? and activo = 1', [NoPago, numControl]);
        if(rows.length > 0) {
            res.json({ valido: "Aceptado" });
        }
    } catch (error) {
        res.json({ Error: "Número Invalido" });
    }

    ccn.query('SELECT codigoPago from solicitud where codigoPago like ? and numControl = ? and activo = 1', [NoPago, numControl],
        (err, rows, fields) => {
            if (!err) {
                 if(rows.length > 0) {
                    res.json({ valido: "Aceptado" });
                } else {
                    res.json({ Error: "Número Invalido" });
                }
            }
        });

});

peticion.post('/verificaNoPago', async(req, res) => {
    const { numPago } = req.body;

    ccn.query('SELECT codigoPago from solicitud where codigoPago like ?', [numPago],
        (err, rows, fields) => {
            if (!err) {
                if (rows.length <= 0) {
                    res.json({ valido: "Aceptado" });
                } else {
                    res.json({ Error: "Número Invalido" });
                }
            }
        });

});

peticion.post('/NoPagoDesactivo', (req, res) => {
    const codpag = req.body;
    ccn.query('UPDATE solicitud set activo = 0 where codigoPago = ?', [codpag.NoPago],
        (err, rows, fields) => {
            if (!err) {
                res.json({ msg: "ok" });

            } else {
                res.json({ Error: "Error" })
            }
        });
});

peticion.post('/ObtenerDatosPago', (req, res) => {
    const NoPago = req.body;
    ccn.query('SELECT * from solicitud where codigoPago = ?', [NoPago.NoPago],
        (err, rows, fields) => {
            if (!err) {
                let datos = JSON.stringify(rows[0].emitio);
                let dato = JSON.parse(datos);
                let data = JSON.stringify(dato);

                let datoos = JSON.stringify(rows[0].fechaSolicitud);
                let datoo = JSON.parse(datoos);
                let dataa = JSON.stringify(datoo);
                res.json({ "nombre": dataa, "emitio": data });
            } else {
                res.json({ err: "err" });
            }

        });
});

peticion.post('/SubirRegistro', (req, res) => {
    const { NoCtrl, emitio, fecha, CodPago } = req.body;
    ccn.query('INSERT INTO emitidas (NoCtrl,emitio,fecha,CodPago) VALUES (?,?,?,?)', [NoCtrl, emitio, fecha, CodPago],
        (err, rows, fields) => {
            if (!err) {
                res.json({ ok: "ok" })
            } else {
                res.json({ err: "err" })
            }
        });
});

peticion.post('/verInfo', (req, res) => {
    const { numeroCtrl } = req.body;
    ccn.query('SELECT * from alumno where numControl = ?', [numeroCtrl],
        (err, rows, fields) => {
            if (!err) {
                res.json({ ok: "ok", data: rows[0] });
            } else {
                res.json({ err: "err" });
            }
        });
});

peticion.post('/getContra', (req, res) => {
    const { numcontrol } = req.body;
    ccn.query('Select password from usuario where userName = ?', [numcontrol],
        (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    let datos = JSON.stringify(rows[0].password);
                    let dato = JSON.parse(datos);
                    let contraseña = JSON.stringify(dato);
                    res.json({ contra: contraseña });
                }
            }
        });
});

peticion.post('/modifyProfile', (req, res) => {
    const { alumno, curp, numControl, especialidad, grado, grupo, correo, turno } = req.body;
    ccn.query('UPDATE alumno set nombre = ?, especialidad = ?, CURP = ?, grado = ?, grupo = ?, correo = ?, turno = ? where numControl = ?', [alumno, especialidad, curp, grado, grupo, correo, turno, numControl],
        (err, rows, fields) => {
            if (!err) {
                res.json({ ok: "ok" });
            }
        });
});

peticion.get('/GetdatosEsc', (req, res) => {
    ccn.query('SELECT * from escuela',
        (err, rows, fields) => {
            if (!err) {
                res.send({ data: JSON.stringify(rows[0]) });
            } else {
                res.send({ err: "err" });
            }
        });
});

peticion.post('/guardarDatosEsc', (req, res) => {
    const { nomEscuela, CTO, direccionEsc, correoEsc, telefEsc, nomDirec, periodo } = req.body;
    ccn.query('UPDATE escuela set CTO = ?, Esc_nombre = ?, Esc_direccion = ?, Esc_correo = ?, Esc_telefono = ?,  Esc_Periodo = ?, Esc_Director = ?', [CTO, nomEscuela, direccionEsc, correoEsc, telefEsc, periodo, nomDirec],
        (err, rows, fields) => {
            if (!err) {
                if (rows.affectedRows > 0) {
                    res.json({ ok: "Se Han Modificado Los Datos" });
                } else {
                    res.json({ ok: "No Se Ha Cambiado Nada" })
                }
            } else {
                res.json({ ok: "Ha Ocurrido Un Error Al Modificar" });
            }
        });
});

peticion.get('/optenerClavesEsp', (req, res) => {
    ccn.query('SELECT * from cbeEsp',
        (err, rows, fields) => {
            if (!err) {
                res.send({ programacion: JSON.stringify(rows[0]), contabilidad: JSON.stringify(rows[1]), electricidad: JSON.stringify(rows[2]), alimentos: JSON.stringify(rows[3]), soporte: JSON.stringify(rows[4]) });
            } else {
                res.send({ err: "err" });
            }
        });
});
peticion.post('/guardarClavesEspProg', (req, res) => {
    const { programacion } = req.body;
    ccn.query('UPDATE cbeEsp set Clave = ? where idcbeEsp = 1', [programacion],
        (err, rows, fields) => {
            if (!err) {
                if (rows.affectedRows > 0) {
                    res.send({ ok: "Clave De Programación Modificada" });
                }
            }
        });
});

peticion.post('/guardarClavesEspconta', (req, res) => {
    const { contabilidad } = req.body;
    ccn.query('UPDATE cbeEsp set Clave = ? where idcbeEsp = 2', [contabilidad],
        (err, rows, fields) => {
            if (!err) {
                if (rows.affectedRows > 0) {
                    res.send({ ok: "Clave De Contabilidad Modificada" });
                }
            }
        });
});

peticion.post('/guardarClavesEspElectricidad', (req, res) => {
    const { electricidad } = req.body;
    ccn.query('UPDATE cbeEsp set Clave = ? where idcbeEsp = 3', [electricidad],
        (err, rows, fields) => {
            if (!err) {
                if (rows.affectedRows > 0) {
                    res.send({ ok: "Clave De Electricidad Modificada" });
                }
            }
        });
});

peticion.post('/guardarClavesEspAlimentos', (req, res) => {
    const { alimentos } = req.body;
    ccn.query('UPDATE cbeEsp set Clave = ? where idcbeEsp = 5', [alimentos],
        (err, rows, fields) => {
            if (!err) {
                if (rows.affectedRows > 0) {
                    res.send({ ok: "Clave De Alimentos Modificada" });
                }
            }
        });
});

peticion.post('/guardarClavesEspSoporte', (req, res) => {
    const { soporte } = req.body;
    ccn.query('UPDATE cbeEsp set Clave = ? where idcbeEsp = 6', [soporte],
        (err, rows, fields) => {
            if (!err) {
                if (rows.affectedRows > 0) {
                    res.send({ ok: "Clave De Soporte Modificada" });
                }
            }
        });
});

function VerificarToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json('No authorization');
    const token = req.headers.authorization.substr(7);

    if (token !== '') {
        const conent = jwt.verify(token, 'stil');
        req.data = conent;
        console.log(req.data);
        next();
    } else {
        res.status(401).json('Token Vacio');
    }
}


module.exports = peticion;
