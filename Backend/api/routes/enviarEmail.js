const express = require('express');
var bodyParser = require('body-parser')
const Emailrouter = express.Router();
var nodemailer = require('nodemailer')
var email = "";


Emailrouter.post('/enviar', (req, res) => {
    
    email = req.body;
    console.log(email);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jorgecortescbtis66@gmail.com",
        pass: "ibwchrluddbkxjea"
      }
    });

    const mailOptions = {
      from: `"Control escolar", "jorgecortescbtis66@gmail.com"`,
      to: `"${email.email}"`,
      subject: `"${email.asunto}"`,
      html: "<h1>Prueba de correo enviado</h1>"
    };
   
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.send('error') // if error occurs send error as response to client
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
      }
    });
});
   

module.exports = Emailrouter;
