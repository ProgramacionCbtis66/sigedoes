const express = require('express');
var bodyParser = require('body-parser');
const Emailrouter = express.Router();
const nodemailer = require('nodemailer');
var email = "";
const Pdf = require('./pdfCreate');

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
      html: "<h1>Enviando un pdf de prueba</h1>",
      attachments: [
        {  // File Stream attachment
          filename: `${Pdf.filename}`,
          path:  __dirname + `\\api\\assets\\${email.email}`,
          cid: `${email.email}`
      }
    ]
};
   
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.send('error') // if error occurs send error as response to client
      } else {
        console.log('Correo Enviado: ' + info.response);
        res.send('Correo enviado satisfactoriamente')//si el correo se envía con éxito enviar Enviado con éxitoas response
      }
    });
});
   

module.exports = Emailrouter;
