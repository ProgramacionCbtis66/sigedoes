const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ccn = require('../connection/connection');


router.post('/solicitud',(req,res)=>{
    const serv = req.body;
    //const data = "2022-4-2";
    console.log(serv);
    ccn.query('insert into solicitud (numControl, codigoPago, fechaSolicitud,descripcion, aportacion,emitio,activo ) values (?,?,?,?,?,?,1)',[serv.numControl, serv.codigoPago, serv.fechaSolicitud,serv.descripcion,serv.aportacion ,serv.emitio],
    (err,rows,fields)=>{
        if(!err){
                res.json({msg:"ok"});   
        }else{res.json({Error:"Codigo Repetido"});}
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


module.exports = router;
