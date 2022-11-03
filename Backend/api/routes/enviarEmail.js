const express = require("express");
var bodyParser = require("body-parser");
const Emailrouter = express.Router();
const nodemailer = require("nodemailer");
const create = require("./pdfCreate");

Emailrouter.post("/enviar-constancia", (req, res) => {
  const email = req.body;
  create(email, email.tipo);
  enviarCorreo(email, res);
});

Emailrouter.post("/forgotPassword", (req, res) => {
  const email = req.body;
  console.log(email);
  enviarCorreo(email, res);
});

Emailrouter.post("/correoAcpetacion", (req, res) => {
  const email = req.body;
  create(email, email.tipo);
  enviarCorreo(email, res);
});

Emailrouter.post("/envioSolicitud", (req, res) => {
  const email = req.body;
  enviarCorreo(email, res);
});

function enviarCorreo(email, res) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "jorgecortescbtis66@gmail.com",
      pass: "ibwchrluddbkxjea",
    },
  });
  console.log(email.tipo);
  const mailOptions = new MailOptions(email.tipo, email);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Correo Enviado: " + info.response);
      res.send("Correo enviado satisfactoriamente");
    }
  });
  res.json("Correcto");
}

function MailOptions(tipo, email) {
  switch (tipo) {
    case "Constancia":
      const mailOptions = {
        from: `"Control escolar", "jorgecortescbtis66@gmail.com"`,
        to: `"${email.email}"`,
        subject: `"${email.asunto}"`,
        html: "<h1>Enviando un pdf de prueba</h1>",
        attachments: [
          {
            // File Stream attachment
            //filename: `${Pdf.filename}`,
            filename: "prueba.pdf",
            // path:  __dirname + `\\api\\assets\\${email.email}`,
            path: "./api/assets/prueba.pdf",
            cid: `${email.email}`,
          },
        ],
      };
      return mailOptions;
    case "forgotPassword":
      const mailOptions2 = {
        from: `"Control escolar", "jorgecortescbtis66@gmail.com"`,
        to: `"${email.correo}"`,
        subject: `"Recuperacion de contraseña"`,
        html: `<h1>Enviando recuperacion de Contraseña</h1> <br>
                    <p>Nombre: ${email.nombre}   Usuario: ${email.numControl}   contraseña: ${email.password}</p>`,
      };
      return mailOptions2;
    case "validacion":
      const validacion =
        email.op == 1
          ? `Aceptado sus datos son: </h3> <br><h5>Nombre: ${email.nombre}   Usuario: ${email.numControl}   contraseña: ${email.password}</h5>`
          : "Rechazado </h3>, <br><h5>favor de enviar un correo a a la siguiente direccion: Direcion@cbtis66.edu.mx</h5>";
      const mailOptions3 = {
        from: `"Control escolar", "jorgecortescbtis66@gmail.com"`,
        to: `"${email.correo}"`,
        subject: `"Aceptaciono Rechazo"`,
        html: `<h3>Estimado Usuario se le noifica que usted ha sido ${validacion}`,
      };
      return mailOptions3;

    case "numPago":
      const mailOptions4 = {
        from: `"Control escolar", "ControlEscolarCbtis66@gmail.com"`,
        to: `"${email.correo}"`,
        subject: `"Código de Pago Constancia en Línea"`,
        html: `<h3>Estimado Usuario se le envía su código de pago :  ${email.numPago}`,
      };
      return mailOptions4;
  }
}

module.exports = Emailrouter;
