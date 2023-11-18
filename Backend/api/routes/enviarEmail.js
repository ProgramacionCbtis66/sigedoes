const express = require("express");
const Emailrouter = express.Router();
const nodemailer = require("nodemailer");
const enviarCorreo = require("../controller/email");

const createConstancias = require("./pdfCreateConstancias");
const creajustificante = require("./pdfCreateJustificantes");


const verifica = require("./verificaToken");

Emailrouter.post("/enviar-constancia",verifica, async (req, res) => {
  const email = req.body;
 await createConstancias(email,res, email.tipo);
enviarCorreo(email, res);
});

Emailrouter.post("/forgotPassword", (req, res) => {
  const email = req.body;
  enviarCorreo(email, res);
});

Emailrouter.post("/correoAcpetacion",verifica, (req, res) => {
 
  const email = req.body;
  
  enviarCorreo(email, res, null);

});

Emailrouter.post("/envioSolicitud", (req, res) => {
  const email = req.body;
  enviarCorreo(email, res);

});

Emailrouter.post("/respuestaJustificante", async (req, res) => {
  const email = req.body;
  if(email.estado == 1){
  await creajustificante(email, res);
  email.tipo = "justificante";
  enviarCorreo(email, res);
  }else{
    enviarCorreo(email, res);
  }
  
});


module.exports = Emailrouter;