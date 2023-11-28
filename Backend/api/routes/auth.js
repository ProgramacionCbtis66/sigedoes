const express = require('express');
const jwt = require('jsonwebtoken');
const peticion = express.Router();
const ccn = require('../connection/connection');
const verifica = require('./verificaToken');

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
            const usuario = jwt.sign(data, 'MA@L', { expiresIn: '20m' });
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
    let sql = `select nombre, apellidoP, apellidoM,  rol,  numControl 
    from usuario  
    where numControl = ? and password = ? and alta = 1`;
    var usuario = '';
    const conexion = await ccn();
    try {
        const [registros] = await conexion.execute(sql, [nombre, pass]);
        usuario = registros;
        if (usuario.length > 0) {
            const [foto] = await conexion.execute('SELECT foto from usuario where numControl = ?', [usuario[0].numControl]);
            var picture = foto;
        }
        var picture = foto;
         
    } catch (error) {
        console.log(error);
        res.json({ Error: "Usuario y contraseña incorrecta" });
    } finally {
        await conexion.end();
    }

    if (usuario[0] !== undefined && usuario.length > 0) {
        if (picture[0].foto == null) {
            picture[0].foto = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
        } else {
            picture[0].foto = picture[0].foto.toString();
        }
        var datos = JSON.stringify(usuario[0]);
        var dato = JSON.parse(datos);
        const token = jwt.sign(dato, 'MA@L', { expiresIn: '30m' });
        console.log("Usuario y contraseña correcta");
        res.json({ token, foto: picture[0].foto });
    } else {
        console.log("Usuario y contraseña incorrecta");
        res.json({ Error: "Usuario y contraseña incorrecta" });
    }
});

peticion.post('/registro', async (req, res) => {
    const datos = (req.body);
    if (datos.foto == undefined) datos.foto = null;
    try {
        const conexion = await ccn();
        //Subir datos a la tabla usuario

        const consulta1 = await conexion.execute('INSERT INTO usuario (userName, numControl, password, rol, nombre,apellidoP,apellidoM,foto,correo) VALUES (?, ?, ?, ?, ?,?,?,?,?)',
            [
                datos.numControl,
                datos.numControl,
                datos.pass,
                datos.rol,
                datos.nombre,
                datos.apellidoP,
                datos.apellidoM,
                datos.foto,
                datos.correo
            ]);

        //Subir datos a la tabla alumno
        if (datos.tipoUsuario == "Alumno") {

            const consulta2 = await conexion.execute('INSERT INTO alumno (numControl,fechaNac,direccion,telefono,especialidad,area,grado,grupo,turno,CTO,correo,CURP,facebook,twitter,instagram,horario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    datos.numControl,
                    datos.fechaNac,
                    datos.direccion,
                    datos.telefono,
                    datos.especialidad,
                    datos.area,
                    datos.grado,
                    datos.grupo,
                    datos.turno,
                    datos.CTO,
                    datos.correo,
                    datos.curp,
                    datos.facebook,
                    datos.twitter,
                    datos.instagram,
                    datos.horario
                ]);
        }
        //Subir datos a la tabla profesor
        if (datos.tipoUsuario == 'Docente') {
            const consulta3 = await conexion.execute('INSERT INTO docente (numControl,direccion,gradoAcademico,telefono,RFC,CURP,CEDULA,fechaNac,facebook,instagram,twitter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [datos.numControl,
                datos.direccion,
                datos.gradoAcademico,
                datos.telefono,
                datos.RFC,
                datos.curp,
                datos.CEDULA,
                datos.fechaNac,
                datos.facebook,
                datos.instagram,
                datos.twitter
                ]);
        }
        //Subir datos a la tabla administrativo
        if (datos.tipoUsuario == "CE" || datos.tipoUsuario == "OE") {

            const consulta4 = await conexion.execute('INSERT INTO administrativo (numControl, direccion, telefono, departamento, turno, CURP,nivelOperativo) VALUES (?,?,?,?,?,?,?)',
                [
                    datos.numControl,
                    datos.direccion,
                    datos.telefono,
                    datos.departamento,
                    datos.turno,
                    datos.curp,
                    datos.nivelOperativo
                ]);
        }
        res.json({ Aceptado: "Datos Guardados" });
    } catch (error) {
        console.log(error);
        const errorMessage = error.toString();
        res.json({ Error: "Los Datos No Fueron Registrados", mensaje: errorMessage });
    }
});

peticion.post('/solicitudAcceso', verifica, async (req, res) => {
    const datos = (req.body);
     
    const conexion = await ccn();
    try {

        const [registroDocente] = await conexion.execute('SELECT * FROM usuario JOIN docente ON usuario.numControl = docente.numControl WHERE alta = 0');
        if (registroDocente.length == 0) var registroDocentes = [];
        else {
            for(let i = 0; i < registroDocente.length; i++){
                if(registroDocente[i].foto!==null) {registroDocente[i].foto = registroDocente[i].foto.toString('utf-8');}
            }
        }

        const [registroAlumno] = await conexion.execute('SELECT * FROM usuario JOIN alumno ON usuario.numControl = alumno.numControl WHERE alta = 0');

        if (registroAlumno.length == 0) var registroAlumnos = [];
        else {
            for(let i = 0; i < registroAlumno.length; i++){
                if(registroAlumno[i].foto!==null) {registroAlumno[i].foto = registroAlumno[i].foto.toString('utf-8');}
            }
        }

        const [registroAdministrativo] = await conexion.execute('SELECT * FROM usuario JOIN administrativo ON usuario.numControl = administrativo.numControl WHERE alta = 0');
        if (registroAdministrativo.length == 0) { var registroAdministrativos = []; }
        else {
            for(let i = 0; i < registroAdministrativo.length; i++){
                if(registroAdministrativo[i].foto!==null) {registroAdministrativo[i].foto = registroAdministrativo[i].foto.toString('utf-8');}
            }
        }
        console.log(registroDocente.length)
        res.json({ validar: true, alumnos: registroAlumno, docentes: registroDocente, administrativos: registroAdministrativo });

    } catch (error) {
        const errorMessage = error.toString();
        console.log(errorMessage);
        res.json({ validar: false, mensaje: errorMessage });
    }

});

module.exports = peticion;