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
        const guardarDatos = await conexion.execute('UPDATE escuela set CTO = ?, Esc_nombre = ?, Esc_direccion = ?, Esc_correo = ?, Esc_telefono = ?,  Esc_Periodo = ?, Esc_Director = ?', [ CTO, Esc_nombre, Esc_direccion, Esc_correo, Esc_telefono, Esc_Director, Esc_Periodo]);
        
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
        const [row] = await conexion.execute('select idglobales,periodoescolar.periodo, periodoescolar,descripcion,semestre,tipo, docenteDni from globales,materias,periodoescolar where (globales.idMateria = materias.idMateria) and (globales.idperiodoescolar = periodoescolar.idperiodoescolar) and (estado = 0);');
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
        let sql = `insert into asignaglobal (lugar, hora, fecha, idglobales, status, docenteDni) values ('${data.lugar}', '${data.hora}', '${data.fecha}', '${data.idglobales}', '${data.status}', '${data.docenteDni}');`;
        const [row] = await conexion.execute(sql);
        if(row.affectedRows > 0){
            sql = `UPDATE globales SET estado = '1' WHERE (idglobales = '${data.idglobales}');`;
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
        const [row] = await conexion.execute('select idrecursa,periodoescolar.periodo, periodoescolar,descripcion,semestre,tipo, docenteDni from recursas,materias,periodoescolar where (recursas.idMateria = materias.idMateria) and (recursas.idperiodoescolar = periodoescolar.idperiodoescolar) and (estado = 0);');        
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


module.exports = administrador;
