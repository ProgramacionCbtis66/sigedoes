const express = require('express');
const jwt = require('jsonwebtoken');
const peticion = express.Router();
const ccn = require('../connection/connection');

peticion.post('/recuperarContraseña', async (req, res) => {
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

peticion.post('/acceso', async (req, res) => {
    const { nombre, pass } = req.body;
    let sql = `CALL login(?,?)`;
    var usuario = '';
    const conexion = await ccn();
    try {
        const [registros] = await conexion.execute(sql,[nombre,pass]);
        usuario = registros;
    } catch (error) {
        console.log(error);
        res.json({ Error: error });
    } finally {
       await conexion.end();
    }
    if (usuario[0][0] !== undefined && usuario.length >0) {
        var datos = JSON.stringify(usuario[0][0]);
        var dato = JSON.parse(datos);
  
        let data = JSON.stringify(dato);
        console.log(dato);
        const token = jwt.sign(dato, 'MA@L', {  expiresIn :'20m'});
        res.json({ token });
    } else {
        res.json({ Error: "Usuario y contraseña incorrecta" });
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

module.exports = peticion;