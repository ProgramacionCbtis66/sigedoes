const express = require('express');
const app = express();
const bodypaser = require('body-parser');
const cors = require('cors');

app.use(bodypaser.urlencoded({extended:false}));
app.use(bodypaser.json());

const allowedOrigins = ['https://pruebasescolarestb.000webhostapp.com'];
app.use(cors({
    origin: (origin, callback)=> {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          console.log("dominio permitido");
        callback(null, true);
      } else {
        callback(new Error("Este dominio no esta permitido"));
      }
    } 
  }));
// Manejo de errores CORS personalizado
app.use((err, req, res, next) => {
    if (err.name === 'Este dominio no esta permitido') {
        res.status(403).json({ error: err.message });
    } else {
        next();
    }
});



//ruteo auth
const authRouter = require('./api/routes/auth');
app.use('/auth', authRouter);
//ruteo usuario
const userRouter = require('./api/routes/user');
app.use('/insize', userRouter);
 // correo
 const emailSend = require('./api/routes/enviarEmail');
 app.use('/email', emailSend);
//adminstrador
const adminRouter = require('./api/routes/admin');
app.use('/admin', adminRouter);
//docente
const docenteRouter = require('./api/routes/docente');
app.use('/docente', docenteRouter);

module.exports = app;