const express = require('express');
var bodyParser = require('body-parser');
const Emailrouter = express.Router();
const nodemailer = require('nodemailer');
const create = require('./pdfCreate');

 
 
 
Emailrouter.post('/enviar-constancia', (req, res) => {
    const email = req.body;
    create(email, email.tipo);
    enviarCorreo(email,res);
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: "jorgecortescbtis66@gmail.com",
//         pass: "ibwchrluddbkxjea"
//       }
//     });

//     const mailOptions = {
//       from: `"Control escolar", "jorgecortescbtis66@gmail.com"`,
//       to: `"${email.email}"`,
//       subject: `"${email.asunto}"`,
//       html: "<h1>Enviando un pdf de prueba</h1>",
//       attachments: [
//         {  // File Stream attachment
//           //filename: `${Pdf.filename}`,
//           filename : "prueba.pdf",
//          // path:  __dirname + `\\api\\assets\\${email.email}`,
//           path: './api/assets/prueba.pdf',
//           cid: `${email.email}`
//       }
//     ]
// };
   
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//         res.send('error')  
//       } else {
//         console.log('Correo Enviado: ' + info.response);
//         res.send('Correo enviado satisfactoriamente');
//       }
//     });
});

Emailrouter.post('/forgotPassword',(req,res)=>{
  
  const email = req.body;
  console.log(email);
  enviarCorreo(email,res);
});

function enviarCorreo(email,res){
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "jorgecortescbtis66@gmail.com",
      pass: "ibwchrluddbkxjea"
    }
  });
  console.log(email.tipo);
  const mailOptions = new MailOptions(email.tipo,email);
 
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error')  
    } else {
      console.log('Correo Enviado: ' + info.response);
      res.send('Correo enviado satisfactoriamente');
    }
  });
  res.json("Correcto");
} 

function MailOptions(tipo, email){

  switch(tipo){
    case 'Constancia':
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
          return mailOptions;
    case 'forgotPassword':
          
          const mailOptions2 = {
            from: `"Control escolar", "jorgecortescbtis66@gmail.com"`,
            to: `"${email.correo}"`,
            subject: `"Recuperacion de contraseña"`,
            html: `<h1>Enviando recuperacion de Contraseña</h1> <br>
                    <p>Nombre: ${email.nombre}   Usuario: ${email.numControl}   contraseña: ${email.password}</p>`
          };
          return mailOptions2;
  }
  
}


module.exports = Emailrouter;
