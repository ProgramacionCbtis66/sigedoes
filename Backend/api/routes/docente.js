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
    const { periodo } = req.body;
    const sqlperiodo = 'select periodo from periodoescolar where idperiodoescolar = ?';
    const sql = 'select * from materias where periodo = ?';
    try {
        const conexion = await ccn();
        const [xperiodo] = await conexion.execute(sqlperiodo, [periodo]);
        console.log(xperiodo[0].periodo);
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

docente.post('/validandoTablaGR', verifica, async (req, res) => {
    const { periodo, materia, numControl, control, tipo } = req.body;

    console.log(periodo, materia, control , tipo, " 1   validandoTablaGR");
    if (control == "global") {
        if (await buscaGlobales(periodo, materia, numControl)) {
            return res.json({ data: true });
        } else {
            return res.json({ data: false });
        }
    } else {
        if (tipo == "BASICA" || tipo == "PROPEDEUTICA") {
            console.log("2  busca en recursa")
            if (await buscaRecursa(periodo, materia, numControl)) {
                console.log("4 si hay datos en buscaRecursa");
                return res.json({ data: true });
            } else {
                console.log("5 entra a buscaRecursaenGlobales");
                if (await buscaRecursaenGlobales(periodo, materia, numControl)) {
                    console.log("7 si hay datos en buscaRecursaenGlobales");
                    return res.json({ data: true });
                } else {
                    console.log("7 no hay datos en buscaRecursaenGlobales");
                    return res.json({ data: false});
                }
            }
        } else {
            console.log("profesional")
            if (await buscaRecursa(periodo, materia, numControl)) {
                return res.json({ data: false });
            } else {
                console.log("REGRESA EL VALOR VERDADERO PARA QUE LO AGREGUEN A LA TABLA")
                return res.json({ data: true });
            }
        }
    }
});

async function buscaRecursaenGlobales(periodo, materia, numControl) {
    const sql = 'select * from globales where idperiodoescolar = ? and idMateria = ? and alumnoNumControl = ?';

    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [periodo, materia, numControl]);
        if (registros.length > 0) {
            if (registros[0].estado == 3 || registros[0].estado == 4 || registros[0].estado == 5) {
                console.log("6 si hay datos en buscaRecursaenGlobales");
                return true;
            } else {
                console.log("6 no hay datos en buscaRecursaenGlobales");
                return false;
            }
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}
async function buscaGlobales(periodo, materia, numControl) {
    const sql = 'select * from globales where idperiodoescolar = ? and idMateria = ? and alumnoNumControl = ?';
    console.log(periodo, materia, numControl);
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
            console.log(" 3   si hay datos en busca Recursas");
            return true;
        } else {
            console.log("3   no hay datos en busca Recursas");
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = docente;
