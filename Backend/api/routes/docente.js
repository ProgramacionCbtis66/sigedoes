const express = require('express');
const docente = express.Router();

const ccn = require('../connection/connection');

const verifica = require('./verificaToken');

docente.post('/datosDocente', verifica, async (req, res) => {
    const numControl = req.body.numControl;

    const sql = 'select * from querydocente where numControl = ?';
    try {
        const conexion = await ccn();
        console.log(numControl);
        const [registros] = await conexion.execute(sql, [numControl]);
        if (registros.length > 0) {
            if (registros[0].foto !== null) { registros[0].foto = registros[0].foto.toString('utf-8'); }
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
    const sql = 'select * from materias';
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

docente.post('/validandoTablaGR', verifica, async (req, res) => {
    const { periodo, materia, numControl, control } = req.body;
    if (control == "global") {
        return res.json( {data:buscaGlobales(periodo, materia, numControl)})    
    } else {
        if(buscaRecursa(periodo, materia, numControl)){
            return res.json({data: true});
        }else{
           if(buscaRecursaenGlobales(periodo, materia, numControl)){
            return res.json({data: false});
           }else{
            return res.json({data: true});
           }
        }
    }
});

async function buscaRecursaenGlobales(periodo, materia, numControl) {
    const sql = 'select * from globales where idperiodoescolar = ? and idMateria = ? and alumnoNumControl = ?';
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [periodo, materia, numControl]);
        if (registros.length > 0 && (registros[0].estado == 0 || registros[0].estado == 1 || registros[0].estado == 2)){
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
async function buscaGlobales(periodo, materia, numControl) {
    const sql = 'select * from globales where idperiodoescolar = ? and idMateria = ? and numControl = ?';
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
async function buscaRecursa(periodo, materia, numControl) {
    const sql = 'select * from recursas where idperiodoescolar = ? and idMateria = ? and alumnoNumControl = ?';
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

module.exports = docente;
