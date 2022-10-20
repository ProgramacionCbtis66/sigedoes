"use strict";

var express = require('express');

var app = express();

var bodypaser = require('body-parser');

var cors = require('cors');

app.use(bodypaser.urlencoded({
  extended: false
}));
app.use(bodypaser.json());
app.use(cors()); //ruteo

var userRouter = require('./api/routes/user');

app.use('/insize', userRouter); // correo

var emailSend = require('./api/routes/enviarEmail');

app.use('/email', emailSend);
app.use(function (req, res, next) {
  next(createError(404));
});
var envioEmail = module.exports = app;