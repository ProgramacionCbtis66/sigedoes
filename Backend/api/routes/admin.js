const express = require('express');
const administrador = express.Router();

const ccn = require('../connection/connection');

const verifica= require('./verificaToken');

administrador.post('/verificaNoPago', verifica,async (req, res) => {
    const { numPago } = req.body;
    const conexion = await ccn();
    try {
        const verificaNoPago = await conexion.execute('SELECT codigoPago from solicitud where codigoPago = ?', [numPago]);
        if (verificaNoPago.length <= 0) {
            res.json({ valido: "Aceptado" });
        }else{
            res.json({ valido: "Rechazado" });
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
    const usuario = req.body;
    try {
        const conexion = await ccn();
        const entrar = await conexion.execute('UPDATE usuario SET alta = ? WHERE numControl = ?', [1, usuario.numControl]);
        res.json("Aceptado");
    } catch (error) {
        res.json("error en la consulta" + error);
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
    const { CTO, Esc_nombre, Esc_direccion, Esc_correo, Esc_telefono, Esc_Director, Esc_Periodo } = req.body;
    const conexion = await ccn();
    try {
        const guardarDatos = await conexion.execute('UPDATE escuela set CTO = ?, Esc_nombre = ?, Esc_direccion = ?, Esc_correo = ?, Esc_telefono = ?,  Esc_Periodo = ?, Esc_Director = ?', [ CTO, Esc_nombre, Esc_direccion, Esc_correo, Esc_telefono,  Esc_Periodo,Esc_Director]);
        if (guardarDatos[0].affectedRows >= 0) {
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
        
        if(datosEsc.length > 0) res.send({ data: JSON.parse( JSON.stringify(datosEsc[0][0]) )});
        else res.send({data:""});
    } catch (error) {
        res.send({ err: "err" });
    } finally {
        conexion.end();
    }
});

administrador.get('/getClavesEsp',verifica, async (req, res) => {
        const conexion = await ccn();
    try {
        const claves = await conexion.execute('SELECT * from especialidad');
        
        if(claves.length > 0){
        res.json({ programacion:claves[0][1], contabilidad: claves[0][4], electricidad: claves[0][0], alimentos:claves[0][3], soporte: claves[0][2] });
        }else{
            res.send({programacion:"", contabilidad:"", electricidad:"", alimentos:"", soporte:""});
        }
    } catch (error) {
        res.send({ err: "err" });
    }
});





administrador.post('/guardarClavesEsp',verifica, async (req, res) => {
    const { programacion, contabilidad, electricidad, alimentos, soporte } = req.body;
    const conexion = await ccn();
    try {
        const gClavesProg = await conexion.execute('UPDATE especialidad set clave = ? where idEspecialidad = 2', [programacion]);
        const gClavesConta = await conexion.execute('UPDATE especialidad set clave = ? where idEspecialidad = 5', [contabilidad]);
        const gClavesElec = await conexion.execute('UPDATE especialidad set clave = ? where idEspecialidad = 1', [electricidad]);
        const gClavesAli = await conexion.execute('UPDATE especialidad set clave = ? where idEspecialidad = 4', [alimentos]);
        const gClavesSop = await conexion.execute('UPDATE especialidad set clave = ? where idEspecialidad = 3', [soporte]);
        if (gClavesProg.affectedRows > 0 && gClavesConta.affectedRows > 0 && gClavesElec.affectedRows > 0 && gClavesAli.affectedRows > 0 && gClavesSop.affectedRows > 0) {
            res.send({ ok: "Claves Modificadas" });
        }
    } catch (error) {
        
        res.send({ err: "err" });
   
    }
});

administrador.post('/guardarClavesEspconta',verifica, async (req, res) => {
    const { contabilidad } = req.body;
    const conexion = await ccn();
    try {
        const gClavesConta = await conexion.execute('UPDATE especialidad set clave = ? where idEspecialidad = 5', [contabilidad]);
        if (gClavesConta.affectedRows > 0) {
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
        const gClavesElec = await conexion.execute('UPDATE especialidad set clave = ? where idEspecialidad = 1', [electricidad]);
        if (gClavesElec.affectedRows > 0) {
            res.send({ ok: "Clave De Electricidad Modificada" });
        }
    } catch (error) {
        //No sentencia
    
    }
});
administrador.post('/guardarClavesEspAlimentos',verifica, async (req, res) => {
    const { alimentos } = req.body;
    const conexion = await ccn();
    try {
        const gClavesAli = await conexion.execute('UPDATE especialidad set clave = ? where idEspecialidad = 4', [alimentos]);
        if (gClavesAli.affectedRows > 0) {
            res.send({ ok: "Clave De Alimentos Modificada" });
        }
    } catch (error) {
        //No sentencia
   
    }
});

administrador.post('/guardarClavesEspSoporte',verifica, async (req, res) => {
    const { soporte } = req.body;
    const conexion = await ccn();
    try {
        const gClavesSop = await conexion.execute('UPDATE especialidad set clave = ? where idEspecialidad = 3', [soporte]);
        if (gClavesSop.affectedRows > 0) {
            res.send({ ok: "Clave De Soporte Modificada" });
        }
    } catch (error) {
        //No Sentencia

    }
});

administrador.get('/getMateriasGlobales', verifica, async(req,res) => {
    const conexion = await ccn();
    try{        
        const [row] = await conexion.execute(`SELECT distinct p.periodoescolar, a.grado, a.grupo, m.descripcion, m.tipo, g.idMateria, g.idperiodoescolar, g.docenteDniApli 
        FROM globales g
        INNER JOIN periodoescolar p ON g.idperiodoescolar = p.idperiodoescolar
        INNER JOIN materias m ON m.idMateria = g.idMateria
        JOIN alumno a ON g.alumnoNumControl = a.numControl
        WHERE g.estado < 4`);                                             
        if(row.length > 0){
            res.send({ok:row});                
        } else if(row.length == 0){
            res.send({ok:"vacio"});                 
        }                         
    }catch(error){ 
        console.log(error);
    }finally{
        conexion.end();
    }
});
administrador.get('/getMateriasRecursa', verifica, async(req,res) => {
    const conexion = await ccn();
    try{        
        const [row] = await conexion.execute(`SELECT distinct r.idrecursa,  p.periodoescolar, a.grado, a.grupo, m.descripcion, m.tipo, r.idMateria, r.idperiodoescolar, r.docenteDniApli 
        FROM recursas r
        INNER JOIN periodoescolar p ON r.idperiodoescolar = p.idperiodoescolar
        INNER JOIN materias m ON m.idMateria = r.idMateria
        JOIN alumno a ON r.alumnoNumControl = a.numControl
        WHERE r.estado < 3`);                                                    
        if(row.length > 0){
            res.send({ok:row});                
        } else if(row.length == 0){
            res.send({ok:"vacio"});                 
        }                         
    }catch(error){ 
        console.log(error);
    }finally{
        conexion.end();
    }
});

administrador.post('/AsignacionGlobal', verifica, async(req,res) => {
    const data = req.body;
    const conexion = await ccn();
    
    try{                
        let sql = `insert into asignaglobal (lugar, hora, fecha, idMateria, status, docenteDni, idperiodoescolar) values ('${data.lugar}', '${data.hora}', '${data.fecha}', '${data.idMateria}',0, '${data.docenteDni}', '${data.idperiodoescolar}')`;
        const [row] = await conexion.execute(sql);
        var [idasiglobd] = await conexion.execute('select idasiglobd from asignaglobal where docenteDni = ? and idMateria = ? and idperiodoescolar = ?',[data.docenteDni, data.idMateria, data.idperiodoescolar]);
        if(row.affectedRows > 0){
             const [actu] = await conexion.execute(`select idglobales from globales 
             join alumno on alumno.numControl = globales.alumnoNumControl
             where (estado >= 0 and estado<5) and (idMateria = '${data.idMateria}') and (idperiodoescolar = '${data.idperiodoescolar}') and (alumno.grado = '${data.grado}') and (alumno.grupo = '${data.grupo}')`);
             let listGlobales = [];
             actu.forEach(globales => {
             listGlobales.push(globales.idglobales);
            });
             const ready = listGlobales.join(',');  
                
             sql = `UPDATE globales SET docenteDniApli = '${data.docenteDni}', idasiglobd = '${idasiglobd[0].idasiglobd}' WHERE idglobales in (${ready});`;
             await conexion.execute(sql);                        
            res.send({ok:"ok"});            
        }else {
            console.log("Error ");
        }
    }catch(error){
        console.log(error);
    }finally{
        
        conexion.end();
    }
});
administrador.post('/actualizaAsignacionGlobal', verifica, async(req, res) => {
    const data = req.body;
    const conexion = await ccn();
 
    try{                
        let sql = `update asignaglobal set lugar = ?, hora = ?, fecha = ?, idMateria = ?, status = ?, docenteDni = ?, idperiodoescolar = ? where idasiglobd = ?`;
        const [row] = await conexion.execute(sql, [data.lugar, data.hora, data.fecha, data.idMateria, 0, data.docenteDni, data.idperiodoescolar, data.idasiglobd]);
        if(row.affectedRows > 0){
             const [actu] = await conexion.execute(`select idglobales from globales 
             join alumno on alumno.numControl = globales.alumnoNumControl
             where (estado > 1 and estado<4) and (idMateria = '${data.idMateria}') and (idperiodoescolar = '${data.idperiodoescolar}') and (alumno.grado = '${data.grado}') and (alumno.grupo = '${data.grupo}')`);
             let listGlobales = [];
             actu.forEach(globales => {
             listGlobales.push(globales.idglobales);
            });
             const ready = listGlobales.join(',');           
             sql = `UPDATE globales SET docenteDniApli = ? WHERE idglobales in (?);`;
             await conexion.execute(sql, [data.docenteDni, ready]);                        
            res.send({ok:"ok"});            
        }else {
            console.log("Error ");
        }
    }catch(error){
        console.log(error);
    }finally{
        
        conexion.end();
    }
});
administrador.post('/guardarAsignacionRecursa', verifica, async(req, res) => {
 
    const conexion = await ccn();
    const info = req.body;
    try{        
        const sql = `insert into asignarecursa (Lugar, hora, fecha, idMateria, docenteDni, status, idperiodoescolar) VALUES ('${info.lugar}', '${info.hora}', '${info.fecha}','${info.idMateria}', '${info.docenteDni}',0, '${info.idperiodoescolar}');`;        
        const [result] = await conexion.execute(sql);
        var [idasigrecursa] = await conexion.execute('select idasigrecursa from asignarecursa where docenteDni = ? and idMateria = ? and idperiodoescolar = ?',[info.docenteDni, info.idMateria, info.idperiodoescolar]);
        if(result.affectedRows > 0){
            const [actu] = await conexion.execute(`select idrecursa from recursas, alumno where (recursas.alumnoNumControl = alumno.numControl) and (alumno.grado = '${info.grado}') and (alumno.grupo = '${info.grupo}') and (recursas.idMateria = '${info.idMateria}') and (recursas.idperiodoescolar = '${info.idperiodoescolar}') and (recursas.estado >=0 and recursas.estado<5)`);
            let listRecusa = [];
            actu.forEach(recursa => {
                listRecusa.push(recursa.idrecursa);
            });
            const ready = listRecusa.join(',');
            const [lastresult] = await conexion.execute(`UPDATE recursas SET docenteDniApli = '${info.docenteDni}', idasigrecursa = '${idasigrecursa[0].idasigrecursa}' WHERE idrecursa in (${ready});`);         
            res.send({ok:'ok'});            
        } else {
            res.send({err:'err'});
        }
        
    }catch(error){
        console.log(error);
    } finally{
        conexion.end();
    }
});
administrador.post('/actualizaAsignacionRecursa', verifica, async(req, res) => {
    const conexion = await ccn();
    const data = req.body;
    try{        
        const sql = `update  asignarecursa Lugar = ?, hora = ?, fecha = ?, docenteDni = ?, status = ?, idrecursa = ? where idasigrecursa = ?;`;        
        const [result] = await conexion.execute(sql, [data.lugar, data.hora, data.fecha, data.docenteDni, 0, data.idrecursa, data.idasigrecursa]);
        if(result.affectedRows > 0){
            const [lastresult] = await conexion.execute(`UPDATE recursas SET estado = '1' WHERE (idrecursa = '${data.idrecursa}')`);            
            res.send({ok:'ok'});            
        } else {
            res.send({err:'err'});
        }
        
    }catch(error){
        
    } finally{
        conexion.end();
    }
});



administrador.get('/getMaestros', verifica, async(req,res) => {
    conexion = await ccn();
    try{
        const [row] = await conexion.execute('select * from docente, usuario where userName = docente.numControl;');        
        if(row.length > 0){
            res.send({ok:row})
        }
    }catch(error){

    }finally{
        conexion.end();
    }
});
 
administrador.get('/getGlobales', verifica, async(req,res) => {
    const conexion = await ccn();
    try{
        const [row] = await conexion.execute('select idrecursa,periodoescolar.periodo, periodoescolar,descripcion,semestre,tipo, docenteDni from recursas,materias,periodoescolar where (recursas.idMateria = materias.idMateria) and (recursas.idperiodoescolar = periodoescolar.idperiodoescolar);');        
        if(row.length > 0){            
            res.send({ok:row});                            
        } else if(row.length == 0){
            res.send({ok:"vacio"});                 
        }                   
    } catch(error){
        console.log(error);
    } finally{
        conexion.end();
    }
});

administrador.post('/getAsignaRecursas', verifica, async(req,res) => {
    const data = req.body;
    const conexion = await ccn();
    try{
        const [row] = await conexion.execute(`SELECT ar.idasigrecursa, ar.lugar, ar.fecha, ar.hora, ar.docenteDni 
        FROM asignarecursa ar, recursas r , alumno u 
        WHERE (ar.docenteDni = r.docenteDniApli) and (r.alumnoNumControl = u.numControl)  and (u.grado = '${data.grado}') and (u.grupo = '${data.grupo}') and (r.idMateria = '${data.idMateria}')`);
        if(row.length > 0){
            res.send({ok:row[0]});
        } else if(row.length == 0){
            res.send({ok:"vacio"});
        }
    }catch(error){
        console.log(error);
    }
});
administrador.post('/getAsignaGlobales', verifica, async(req,res) => {
    const data = req.body;
  
    const conexion = await ccn();
    try{
        const [row] = await conexion.execute(`SELECT ag.idasiglobd, ag.lugar, ag.fecha, ag.hora, ag.docenteDni 
        FROM asignaglobal ag, globales g , alumno u 
        WHERE (ag.docenteDni = g.docenteDniApli) and (g.alumnoNumControl = u.numControl) and (u.grado = '${data.grado}') and (u.grupo = '${data.grupo}') and (g.idMateria = '${data.idMateria}')`);
     
        if(row.length > 0){
            res.send({ok:row[0]});
        } else if(row.length == 0){
            res.send({ok:"vacio"});
        }
    }catch(error){
        console.log(error);
    }
});

administrador.post('/actualizaCEAP', verifica, async(req, res) => {
    const data = req.body;
    const conexion = await ccn();
    try{
        const [row] = await conexion.execute(`UPDATE ceap SET costo = ? WHERE concepto = ?`, [data.costo, data.concepto]);
        if(row.affectedRows > 0){
            res.send({ok:"ok"});
        } else {
            res.send({err:"err"});
        }
    }catch(error){
        console.log(error);
    }
});

administrador.get('/getCEAP', verifica, async(req, res) => {
    const conexion = await ccn();
    try{
        const [registro] = await conexion.execute(`SELECT * FROM ceap`);
         
        if(registro.length > 0){
            res.send({ok:registro});
        } else if(registro.length == 0){
            res.send({ok:"vacio"});
        }
    }catch(error){
        console.log(error);
    }
});

administrador.get('/getSolicitudesGlobales', verifica, async(req, res) => {
    const conexion = await ccn();
    const sql = `SELECT g.idglobales, g.idMateria, g.idperiodoescolar, g.idasiglobd, alumnoNumControl, grado, grupo, a.especialidad, turno, a.correo, periodoescolar, m.descripcion as materia, m.semestre, u.nombre, u.apellidoP, u.apellidoM, g.estado
    FROM globales g ,alumno a, periodoescolar p, materias m, usuario u 
    WHERE (g.alumnoNumControl = a.numControl) and (g.idperiodoescolar = p.idperiodoescolar) and (g.alumnoNumControl=u.numControl) and (g.idMateria=m.idMateria)`;
    try{
        const [row] = await conexion.execute(sql);
        if(row.length > 0){
            res.send({ok:row});
        } else if(row.length == 0){
            res.send({ok:"vacio"});
        }
    }catch(error){
        console.log(error);
    }
});

administrador.get('/getSolicitudesRecursas', verifica, async(req, res) => {
    const conexion = await ccn();
    const sql = `SELECT r.idrecursa, r.idMateria, r.idperiodoescolar,r.idasigrecursa, r.alumnoNumControl, a.grado, a.grupo, a.especialidad, a.turno, a.correo, p.periodoescolar, m.descripcion as materia, m.semestre, u.nombre, u.apellidoP, u.apellidoM, r.estado 
    FROM recursas r ,alumno a, periodoescolar p, materias m , usuario u
    WHERE (r.alumnoNumControl = a.numControl) and (r.idperiodoescolar = p.idperiodoescolar) and (r.alumnoNumControl=u.numControl)  and (r.idMateria=m.idMateria)`;
    try{
        const [row] = await conexion.execute(sql);
        if(row.length > 0){
            res.send({ok:row});
        } else if(row.length == 0){
            res.send({ok:"vacio"});
        }
    }catch(error){
        console.log(error);
    }
});

administrador.post('/autorizarGlobal', verifica, async(req, res) => {
    const data = req.body;
    let tiempo = Date.now();
    let hoy = new Date(tiempo);
    const fecha = hoy.toLocaleDateString();
    const conexion = await ccn();
    try{
        const [row] = await conexion.execute(`UPDATE globales SET estado =? WHERE (idglobales = ?)`,[data.estado, data.idglobales]);
        if(row.affectedRows > 0){
            if(data.estado==8){
                const [global] = await conexion.execute(`select * from globales where idglobales = ?`,[data.idglobales]);
                if(global.length > 0){
                    const _global=global[0];
                        const [recursas] = await conexion.execute('insert into recursas (alumnoNumControl,idMateria,idperiodoescolar,docenteDni,fecha,estado) values (?,?,?,?,?,?)', 
                        [
                            _global.alumnoNumControl,
                            _global.idMateria,
                            _global.idperiodoescolar,
                            data.docenteDni,
                            fecha,
                            0
                        ]);
                }
            }
            res.send({ok:"ok"});
        } else {
            res.send({err:"err"});
        }
    }catch(error){
        console.log(error);
    }
});

administrador.get('/traerGlobalData', verifica, async(req, res) => {
    const conexion = await ccn();
    const sql = `SELECT idsolicitudglobal AS idSoliGlobal, numControl AS numCtrl, idglobales AS id, estado AS state, frm5 AS imgFrm5, ceap AS imgCeap, idasiglobd AS idAsigBd FROM solicitudglobal`;
    try{
        const [row] = await conexion.execute(sql);
        if(row.length > 0){
            for(var i = 0; i <= row.length - 1; i++){
                if(row[i].imgCeap != null && row[i].imgFrm5 != null){
                    row[i].imgCeap = row[i].imgCeap = row[i].imgCeap.toString('utf-8');
                    row[i].imgFrm5 = row[i].imgFrm5 = row[i].imgFrm5.toString('utf-8');
                }
            }
            res.send({ok:row});
        } else if(row.length == 0){
            res.send({ok:"vacio"});
        }
    } catch(error){
        console.log(error);
    }
});

administrador.post('/aprobarGlobalComprobar', verifica, async(req, res) => {
    const data = req.body;
    const conexion = await ccn();
    try{
        const [row] = await conexion.execute(`UPDATE globales SET estado =? WHERE (idglobales = ?)`, [4, data.id]);
        if(row.affectedRows > 0){
            res.send({ok:"ok"});
        } else {
            res.send({err:"err"});
        }
    } catch(error){
        console.log(error);
    }
});

administrador.get('/traerRecursaData', verifica, async(req, res) => {
    const conexion = await ccn();
    const sql = `SELECT idsolicitudrecursa AS idSoliRecursa, numControl AS numCtrl, idrecursas AS id, estado AS state, frm5 AS imgFrm5, ceap AS imgCeap, idasigrecursa AS idAsigRc FROM solicitudrecursa`;
    try{
        const [row] = await conexion.execute(sql);
        if(row.length > 0){
            for(var i = 0; i <= row.length - 1; i++){
                if(row[i].imgCeap != null && row[i].imgFrm5 != null){
                    row[i].imgCeap = row[i].imgCeap = row[i].imgCeap.toString('utf-8');
                    row[i].imgFrm5 = row[i].imgFrm5 = row[i].imgFrm5.toString('utf-8');
                }
            }
            res.send({ok:row});
        } else if(row.length == 0){
            res.send({ok:"vacio"});
        }
    } catch(error){
        console.log(error);
    }
});

administrador.post('/aprobarRecursaComprobar', verifica, async(req, res) => {
    const data = req.body;
    const conexion = await ccn();
    try{
        const [row] = await conexion.execute(`UPDATE recursas SET estado =? WHERE (idrecursa = ?)`, [4, data.id]);
        if(row.affectedRows > 0){
            res.send({ok:"ok"});
        } else {
            res.send({err:"err"});
        }
    } catch(error){
        console.log(error);
    }
});

administrador.post('/autorizarRecursa'), verifica, async(req, res) => {
    const data = req.body;
    const conexion = await ccn();
    try{
        const [row] = await conexion.execute(`UPDATE recursas SET estado =? WHERE (idrecursa = ?)`,[data.estado, data.idrecursa]);
        if(row.affectedRows > 0){
            res.send({ok:"ok"});
        } else {
            res.send({err:"err"});
        }
    }catch(error){
        console.log(error);
    }
};

administrador.post('/aplicaionExamenGlobal', verifica, async(req, res) => {
    const data = req.body;
    const conexion = await ccn();
    try{
        const [row] = await conexion.execute(`select ag.fecha, ag.hora, ag.lugar sa salon from globales g, asignaglobal ag where (g.idasiglobd = ag.idasiglobd) and (g.idglobales = ?)`,[data.idglobales]);
        if(row.affectedRows > 0){
            res.send({ok:row});
        } else {
            res.send({err:"err"});
        }
    }catch(error){
        console.log(error);
    }
});

administrador.post('/aplicaionRecursa', verifica, async(req, res) => {
    const data = req.body;
    const conexion = await ccn();
    try{
        const [row] = await conexion.execute(`select ar.fecha, ar.hora, ar.lugar sa salon from recursas r, asignarecursa ar where (r.idasigrecursa = ar.idasigrecursa) and (r.idrecursa = ?)`,[data.idrecursa]);
        if(row.affectedRows > 0){
            res.send({ok:row});
        } else {
            res.send({err:"err"});
        }
    }catch(error){
        console.log(error);
    }
});

module.exports = administrador;
