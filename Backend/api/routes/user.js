const express= require('express');
const jwt  = require('jsonwebtoken');
const router = express.Router();

const ccn = require('../connection/connection');


router.post('/forgotPassword',(req,res) => {
    const correo = req.body.correo;
    console.log(correo);
    ccn.query('select * from forgotpassword where correo like ?',[correo],
        (err,rows,fields)=>{
            if(!err){
                if(rows.length>0){
                    let datos = JSON.stringify(rows[0]);
                    let dato = JSON.parse(datos);
                    dato.tipo = "forgotPassword";
                    let data = JSON.stringify(dato);
                    const usuario = jwt.sign(data,'stil');
                    console.log({usuario});
                    res.json({usuario});
                } else{
                    res.json({Error:"Correo invalido"});
                }               
            } else{
                res.json({Error:"Erro BD"});
            }
        });
});

router.post('/login',(req,res)=>{
    const {nombre,pass} = req.body; 
    ccn.query('select userName, rol, numControl from usuario where userName = ? and password = ?', [nombre,pass],
        (err,rows,fields)=>{
            
            if(!err) {
                if(rows.length > 0){
                    
                    let datos = JSON.stringify(rows[0]);
                    let dato = JSON.parse(datos);
                    dato.exp = Date.now()/1000 + (300);
                    let data = JSON.stringify(dato);
                    
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

router.post('/datosUser',(req,res)=>{
   const numControls = req.body.numcontrol; 
   console.log(numControls);
   ccn.query('select * from pdf where numControl = ?',[numControls],
   (err,rows,fields)=>{
        if(!err) {
            if(rows.length>0){
                let datos = JSON.stringify(rows[0]);
                let dato = JSON.parse(datos);
                let data = JSON.stringify(dato);
                console.log(data);
                res.json({data});
            }else{res.json({Erro:"no hay datos"})}
        }else{res.json({Error:"En base de datos"});}
   });
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
