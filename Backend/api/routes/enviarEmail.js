const express = require('express');
var bodyParser = require('body-parser');
const Emailrouter = express.Router();
const nodemailer = require('nodemailer');
const create = require('./pdfCreate');

var email = "";
 
 
Emailrouter.post('/enviar', (req, res) => {
    email = req.body;
    
     
    create(email, email.tipo);
    
     
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
          //filename: `${Pdf.filename}`,
          filename : "prueba.pdf",
         // path:  __dirname + `\\api\\assets\\${email.email}`,
          path: './api/assets/prueba.pdf',
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
