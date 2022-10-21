const express = require('express');
var bodyParser = require('body-parser')
const Emailrouter = express.Router();
var nodemailer = require('nodemailer')

Emailrouter.post('/enviar', (req, res)=>{
    const email = req.body;
    EnviarCorreo()
});

const EnviarCorreo = (mail, callback) => {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "<sender email>",
            pass: "<password>"
          }
}