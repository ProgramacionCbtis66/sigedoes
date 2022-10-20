const express= require('express');
const jwt  = require('jsonwebtoken');
const router = express.Router();

const ccn = require('../connection/connection');


router.post('/login',(req,res)=>{
    const {nombre,pass} = req.body;
    console.log(req.body);
    ccn.query('select id_usr, nombre,  status from usuario where nombre = ? and pass = ?',[nombre,pass],
        (err,rows,fields)=>{
            if(!err) {
                if(rows.length > 0) {
                    let datos = JSON.stringify(rows[0]);
                    const token = jwt.sign(datos,'stil');
                    res.json({token});
                }else{
                   res.json({Error:"Usuario y contraseña incorrecta"});
                }
            }else{
                res.json({Error: "Usuario y contraseña incorrecta"});
            }
        }
    );
});

function VerificarToken(req, res,next) {
    if(!req.headers.authorization) return res.status(401).json('No authorization');
    const token = req.headers.authorization.substr(7);
    //console.log(token);
    if (token!==''){
        const conent = jwt.verify(token,'stil');
        req.data=conent;
        console.log(req.data);
        next();
    }else{
        res.status(401).json('Token Vacio');
    }
}


module.exports = router;
