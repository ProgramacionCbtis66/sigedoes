const exprex = require ('express')
const just = exprex.Router();
const cnn = require ('../connection/connection')
const verifica= require ('./verificaToken');
const verificaToken = require('./verificaToken');

just.post('/obtenerdatos', verificaToken, async (req, res) => { 
    const datos = req.body;
    const sql = 'select * from justificante'
    try {
     const conexion = await cnn();
     const registros = await conexion.execute(sql);
     if (registros.length > 0) {
        res.json({data: registros[0][0]});
     }
     else {
        res.json({data:[]})
     }
    }catch(err) {
    }
    
})
just.post('/guardardatos',verifica, async (req, res) => {
    const datos = req.body;
})