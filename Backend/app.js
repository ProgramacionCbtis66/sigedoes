const express = require('express');
const app = express();
const bodypaser = require('body-parser');
const cors = require('cors');

app.use(bodypaser.urlencoded({extended:false}));
app.use(bodypaser.json());
app.use(cors({origin: "*" }));

//ruteo

const userRouter = require('./api/routes/user');
app.use('/insize', userRouter);

 // correo
 const emailSend = require('./api/routes/enviarEmail');
 app.use('/email', emailSend);

const adminRouter = require('./api/routes/admin');
app.use('/admin', adminRouter);


app.use(function(req, res, next) {
    next(createError(404));
});


const envioEmail = 

module.exports = app;