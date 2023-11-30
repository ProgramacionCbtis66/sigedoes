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

    const { periodo, materia, docente, tipo, alumnos } = req.body;
    let tiempo = Date.now();
    let hoy = new Date(tiempo);
    const fecha = hoy.toLocaleDateString();

    if (tipo == "global") {
        for (let alumno of alumnos) {
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
        for (let alumno of alumnos) {

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
    const { periodo, materia, numControl, control, tipo, dmateria } = req.body;

    if (control == "global") {
        if (await buscaGlobales(periodo, materia, numControl)) {
            return res.json({ data: true, mensaje: `El alumno con numero de conttrol ${numControl} con la materia: ${dmateria} ya está registrado` });
        } else {
            return res.json({ data: false });
        }
    } else {
        if (tipo == "BASICA" || tipo == "PROPEDEUTICA") {

            if (await buscaRecursa(periodo, materia, numControl, dmateria)) {

                return res.json({ data: true, mensaje: `El alumno con numero de conttrol ${numControl} ya está registrado en la tabla de recursas` });
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
                return res.json({ data: true, mensaje: `El alumno con numero de control ${numControl} con la materia: ${dmateria} ya esta registrado` });
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
            if (registros[0].estado >= 0 && registros[0].estado < 6) {

                return ({ data: true, mensaje: `alumno: ${numControl} con la materia ${dmateria} esta registrado en la tabla de globales` });
            } else {

                return false;
            }
        } else {
            return ({ data: true, mensaje: `alumno: ${numControl} no esta registrado en la tabla de globales de la materia: ${dmateria}` });
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

docente.post('/ListaAlumnosGlobalesAsignados',verifica, async (req, res) => {
    const { docenteDni } = req.body;
    const sql = `select g.idasiglobd, g.idglobales, ag.docenteDni , alumnoNumControl, g.idMateria as idmateria, ag.fecha  , ag.status, 
    us.nombre as nombre, us.apellidoP as apellidoP , us.apellidoM as apellidoM , m.descripcion as materia FROM asignaglobal as ag
    join globales as g on ag.idasiglobd = g.idasiglobd
    join docente as d on d.numControl = g.docenteDni
    join usuario as us on us.numControl = g.alumnoNumControl
    join materias as m on m.idMateria = g.idMateria
    where ag.docenteDni = ?`;
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [docenteDni]);
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

docente.post('/ListaAlumnosRecursasAsignados',verifica, async (req, res) => {
    const { docenteDni } = req.body;
    const sql = `select ar.idasigrecursa, r.idrecursa, ar.docenteDni , alumnoNumControl, r.idMateria as idmateria, ar.fecha, ar.status, us.nombre as nombre, us.apellidoP as apellidoP , us.apellidoM as apellidoM , m.descripcion as materia 
    FROM asignarecursa as ar 
    join recursas as r on ar.idasigrecursa = r.idasigrecursa
    join docente as d on d.numControl = r.docenteDni
    join usuario as us on us.numControl = r.alumnoNumControl
    join materias as m on m.idMateria = r.idMateria
    where ar.docenteDni = ? and ar.status=0`;
    try {
        const conexion = await ccn();
        const [registros] = await conexion.execute(sql, [docenteDni]);
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

docente.post('/enviarCalificacionesGlobales', verifica, async (req, res) => {
    const { idasiglobd, calificacion, idglobales, docenteDni } = req.body;
    const estado= 0;
    
    let tiempo = Date.now();
    let hoy = new Date(tiempo);
    const fecha = hoy.toLocaleDateString();
  
    const conexion = await ccn();
    try {
        const sql = 'select * from solicitud where idglobales = ? and activo = 1';
        const [registros] = await conexion.execute(sql, [idglobales]);
        if (registros.length > 0) {
                if(calificacion >= 6){estado=6;}else{estado=8;
                    const [global] = await conexion.execute('select * from globales where idglobales = ?', [idglobales]);
                    if(global.length > 0){
                        const _global=global[0];
                        const [recursas] = await conexion.execute('insert into recursas (alumnoNumControl,idMateria,idperiodoescolar,docenteDni,fecha,estado) values (?,?,?,?,?,?)', 
                        [
                            _global.alumnoNumControl,
                            _global.idMateria,
                            _global.idperiodoescolar,
                            docenteDni,
                            fecha,
                            0
                        ]);
                    }
                }
                const sql = 'update globales set (estado = ?, calificacion = ?, fechaCalificacion = ?) where idglobales = ?';
                const [registros1] = await conexion.execute(sql, [idglobales, estado,calificacion, fecha]);
                const sql2 = 'update asignaglobal set status = 1 where idasiglobd = ?';
                const [registros2] = await conexion.execute(sql2, [idasiglobd]);
                const sql3 = 'update solicitud set activo = 0 where idglobales = ?';
                const [registros3] = await conexion.execute(sql3, [idglobales]);
                res.json({ data: true });
        }else{
                 res.json({data: false, mensaje: "El alumno no ha pagado la cuota de examen"});
        }
        await conexion.end();
    } catch (error) {
        console.log(error);
    }
});

docente.post('/enviarCalificacionesRecursas', verifica, async (req, res) => {
    const { idasigrecursa, calificacion, idrecursa } = req.body;
    const estado= 0;
    let tiempo = Date.now();
    let hoy = new Date(tiempo);
    const fecha = hoy.toLocaleDateString();
    const conexion = await ccn();
    
    try {
        const sql = 'select * from solicitud where idrecursa = ? and activo = 1';
        const [registros] = await conexion.execute(sql, [idrecursa]);
        if (registros.length > 0) {
                if(calificacion >= 6){ estado=6;}else{ estado=8;}
                const sql = 'update recursas set (estado = ?, calificacion = ?, fechaCalificacion = ?) where idrecursa = ?';
                const [registros1] = await conexion.execute(sql, [idrecursa, estado,calificacion, fecha]);
                const sql2 = 'update asignarecursa set status = 1 where idasigrecursa = ?';
                const [registros2] = await conexion.execute(sql2, [idasigrecursa]);
                const sql3 = 'update solicitud set activo = 0 where idrecursa = ?';
                const [registros3] = await conexion.execute(sql3, [idrecursa]);
                res.json({ data: true });
        }else{
            res.json({data: false, mensaje: "El alumno no ha pagado la cuota de examen"});
        }
    } catch (error) {
        console.log(error);
        res.json({data: false, mensaje: error});
    }

});

module.exports = docente;
