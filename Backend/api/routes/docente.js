const express = require('express');
const docente = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

docente.post('/datosDocente', verifica, async (req, res) => {
    const numControl = req.body.numControl;

    const sql = 'select * from querydocente where numControl = ?';
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [numControl]);
        if (registros.length > 0) {
            if (registros[0].foto !== null) { registros[0].foto = registros[0].foto.toString('utf-8'); }
            let datos = JSON.stringify(registros[0]);
            let data = JSON.parse(datos);
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

docente.post('/modifyProfile', verifica, async (req, res) => {
    const { alumno, curp, numControl, especialidad, grado, grupo, correo, turno } = req.body;
    const conexion = await ccn();
    try {
        const ModProfile = await conexion.execute('UPDATE alumno set nombre = ?, especialidad = ?, CURP = ?, grado = ?, grupo = ?, correo = ?, turno = ? where numControl = ?', [alumno, especialidad, curp, grado, grupo, correo, turno, numControl]);
        res.json({ ok: "ok" });
    } catch (error) {
        // no tiene otra sentencia aparte del res.json
    } finally {
        conexion.end();
    }
});

docente.post('/datosMateria', verifica, async (req, res) => {
    const { periodo } = req.body;
    const sqlperiodo = 'select periodo from periodoescolar where idperiodoescolar = ?';
    const sql = 'select * from materias where periodo = ?';
    try {
        const conexion = await ccn();
        const [xperiodo] = await conexion.execute(sqlperiodo, [periodo]);
        const [registros] = await conexion.execute(sql, [xperiodo[0].periodo]);
        if (registros.length > 0) {
            let datos = JSON.stringify(registros);
            let data = JSON.parse(datos);
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

docente.post('/datosPeriodoEscolar', verifica, async (req, res) => {


    const sql = 'select * from periodoescolar';
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql);
        if (registros.length > 0) {
            let datos = JSON.stringify(registros);
            let data = JSON.parse(datos);
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

docente.post('/enviarGR', verifica, async (req, res) => {
 
    const { periodo, materia, docente,tipo, alumnos} = req.body;
    const fechaActual = new Date();
  
    const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); // Agrega un 0 adelante si es necesario
    const dia = ('0' + fechaActual.getDate()).slice(-2); // Agrega un 0 adelante si es necesario
    const año = fechaActual.getFullYear();

    const fecha = `${dia}/${mes}/${año}`;
    if (tipo == "global") {
        for(let alumno of alumnos){
        const sql = 'insert into globales (alumnoNumControl, docenteDni, idMateria, idperiodoescolar, fecha , estado) values (?,?,?,?,?,?)';
        try {
            const conexion = await ccn();
            const [registros] = await conexion.execute(sql, [alumno.numControl, docente, materia, periodo, fecha, 0]);
        } catch (error) {
            console.log(error);
            res.json({ data: false });
        }
    }
    res.json({ data: true });
    } else { 
        for(let alumno of alumnos){
            
        const sql = 'insert into recursas (alumnoNumControl,  idMateria, idperiodoescolar, docenteDni, fecha , estado) values (?,?,?,?,?,?)';
        try {
            const conexion = await ccn();
            const [registros] = await conexion.execute(sql, [alumno.numControl, materia, periodo, docente, fecha, 0]);
        } catch (error) {
            console.log(error);
            res.json({ data: false });
        }
    }
    res.json({ data: true });
    }
});

docente.post('/validandoTablaGR', verifica, async (req, res) => {
    const { periodo, materia, numControl, control, tipo , dmateria} = req.body;

    if (control == "global") {
        if (await buscaGlobales(periodo, materia, numControl)) {
            return res.json({ data: true, mensaje:`El alumno con numero de conttrol ${numControl} con la materia: ${dmateria} ya está registrado`});
        } else {
            return res.json({ data: false });
        }
    } else {
        if (tipo == "BASICA" || tipo == "PROPEDEUTICA") {
            
            if (await buscaRecursa(periodo, materia, numControl, dmateria)) {
                
                return res.json({ data: true, mensaje:`El alumno con numero de conttrol ${numControl} ya está registrado en la tabla de recursas`});
            } else {
                 const brg = await buscaRecursaenGlobales(periodo, materia, numControl, dmateria);
                if (brg.data) {
                    return res.send(brg);
                } else {
                    return res.json(brg);
                }
            }
        } else {
          
            if (await buscaRecursa(periodo, materia, numControl, dmateria)) {
                return res.json({ data: true, mensaje:`El alumno con numero de control ${numControl} con la materia: ${dmateria} ya esta registrado` });
            } else {
                return res.json({ data: false });
            }
        }
    }
});

async function buscaRecursaenGlobales(periodo, materia, numControl, dmateria) {
    const sql = 'select * from globales where idperiodoescolar = ? and idMateria = ? and alumnoNumControl = ?';

    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [periodo, materia, numControl]);
        if (registros.length > 0) {
            if (registros[0].estado == 0 || registros[0].estado == 1 || registros[0].estado == 2) {
                
                return ({ data: true, mensaje: `alumno: ${numControl} con la materia ${dmateria} esta registrado en la tabla de globales pendiente de examen`});
            } else {
                
                return false;
            }
        } else {
            return ({ data: true, mensaje: `alumno: ${numControl} no esta registrado en la tabla de globales de la materia: ${dmateria}`});
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}
async function buscaGlobales(periodo, materia, numControl, dmateria) {
    const sql = 'select * from globales where idperiodoescolar = ? and idMateria = ? and alumnoNumControl = ?';
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [periodo, materia, numControl]);
        if (registros.length > 0) {
            return true;
        } else {
            return false;
        }
        await conexion.end();
    } catch (error) {
        console.log(error);
        return false;
    }
}
async function buscaRecursa(periodo, materia, numControl, dmateria) {
    const sql = 'select * from recursas where idperiodoescolar = ? and idMateria = ? and alumnoNumControl = ?';
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [periodo, materia, numControl]);
        if (registros.length > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = docente;
