const express= require('express');
const jwt  = require('jsonwebtoken');
const router = express.Router();

const ccn = require('../connection/connection');


router.post('/forgotPassword',(req,res) => {
    const correo = req.body.correo;
    ccn.query('select correo from alumno where correo like ?',[correo],
        (err,rows,fields)=>{
            if(!err){
                if(rows.length>0){
                    res.json("Encontrado");
                } else{
                    res.json("Correo invalido");
                }               
            } else{
                res.json("Erro BD");
            }
        });
});

router.post('/login',(req,res)=>{
    const {nombre,pass} = req.body; 
    ccn.query('select userName, rol from usuario where userName = ? and password = ?', [nombre,pass],
        (err,rows,fields)=>{
            
            if(!err) {
                if(rows.length > 0){
                    
                    let datos = JSON.stringify(rows[0]);
                    let dato = JSON.parse(datos);
                    dato.exp = Date.now()/1000 + (300);
                    let data = JSON.stringify(dato);
                    console.log(data);
                    
                    
                    const token = jwt.sign(data,'stil');
                    
                    
                    res.json({token});
                }else{
                    res.json({Error:"Usuario y contraseña incorrecta"});
                }
            }else{
                res.json({Error: "error de consulta"});
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
