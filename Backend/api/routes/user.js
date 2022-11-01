const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ccn = require('../connection/connection');


router.post('/forgotPassword', (req, res) => {
    const correo = req.body.correo;
    console.log(correo);
    ccn.query('select * from forgotpassword where correo like ?', [correo],
        (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    let datos = JSON.stringify(rows[0]);
                    let dato = JSON.parse(datos);
                    dato.tipo = "forgotPassword";
                    let data = JSON.stringify(dato);
                    const usuario = jwt.sign(data, 'stil');
             
                    res.json({ usuario });
                } else {
                    res.json({ Error: "Correo invalido" });
                }
            } else {
                res.json({ Error: "Erro BD" });
            }
        });
});

router.post('/login', (req, res) => {
    const { nombre, pass } = req.body;
    ccn.query('select usuario.userName as userName, usuario.rol as rol, usuario.numControl as numControl from usuario inner join alumno on usuario.numControl like usuario.numControl where userName = ? and usuario.password = ? and alumno.alta = 1', [nombre, pass],
        (err, rows, fields) => {

            if (!err) {
                if (rows.length > 0) {

                    let datos = JSON.stringify(rows[0]);
                    let dato = JSON.parse(datos);
                    dato.exp = Date.now() / 1000 + (300);
                    let data = JSON.stringify(dato);

                    const token = jwt.sign(data, 'stil');


                    res.json({ token });
                } else {
                    res.json({ Error: "Usuario y contraseña incorrecta" });
                }
            } else {
                res.json({ Error: "error de consulta" });
            }
        }
    );
});
/*router.post('/registro',(req,res)=>{
    const {correo,pass,pass2,curp,noctrl,especialidad,semestre,area,turno,nombre,direccion} = req.body;
    ccn.query('INSERT INTO usuario (idUser,userName,numControl,password,rol,exp,nombre) VALUES (?, ?, ?, ?, ?, ?, ?, )',[noctrl,nombre,])
});*/
/*router.post('/registro',(req,res)=>{
    const {correo,pass,pass2,curp,noctrl,especialidad,semestre,area,turno,nombre,direccion} = req.body;
    let xd = "3";
    let horario = "si";
    let CTO = "30DCT0236O";
    let alta = "1";
    console.log(req.body);
    ccn.query('INSERT INTO alumno (numControl,nombre,direccion,especialidad,area,grado,grupo,turno,horario,CTO,correo,alta,CURP,) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [numcontrol,nombre,direccion,especialidad,area,semestre,xd,turno,horario,CTO,correo,alta,curp],
    (err,rows,fields)=>{
        if(!err){
            console.log("correcto");
        }
    });
});*/
router.post('/datosUser', (req, res) => {
    const numControls = req.body.numcontrol;
   
    ccn.query('select * from pdf where numControl = ?', [numControls],
        (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    let datos = JSON.stringify(rows[0]);
                    let dato = JSON.parse(datos);
                    let data = JSON.stringify(dato);
                    
                    res.json({ data });
                } else { res.json({ Erro: "no hay datos" }) }
            } else { res.json({ Error: "En base de datos" }); }
        });
});

router.post('/usuarioAceptado', (req, res) => {
    const alumno = req.body;
    ccn.query('UPDATE constancias.alumno SET alta = 1 WHERE numControl like ?', [alumno.numControl],
        (err, rows, fields) => {
            if (!err) {
                res.json("Aceptado");
            } else {
                res.json("error en la cunsulta");
            }
        });
});

router.get('/listaUserNoReg', (req,res) => {
    
    ccn.query('select nombre, numControl,correo, grado, grupo, turno, especialidad from alumno where alta = 0',
        (err, rows, fields) => {
            if (!err) {
                res.send({data: JSON.stringify(rows)});
            } else {
                res.json('');
            }
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
