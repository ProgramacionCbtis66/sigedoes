const nodemailer = require("nodemailer");



function enviarCorreo(email, res) {


    // Configuración del correo
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "sigedoes@cbtis66.edu.mx",
            pass: "wwkajnuwaejakxvy",
        },
    });

    const mailOptions = new MailOptions(email.tipo, email);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("manejo de error: " + error);
            res.send("error");
        } else {
            console.log("Correo Enviado: " + info.response);
            res.send({ msg: "Correo enviado satisfactoriamente" });
        }
    });
}

function MailOptions(tipo, email) {

    switch (tipo) {
        case "Constancia":
            const mailOptions = {
                from: `"Control escolar", "jorgecortescbtis66@gmail.com"`,
                to: `"${email.email}"`,
                subject: `"${email.asunto}"`,
                html: "<h1>Constancia De Estudios</h1>",
                attachments: [
                    {
                        filename: `cl${email.numControl}cb66.pdf`,
                        path: `./api/assets/cl${email.numControl}cb66.pdf`,
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
                    ? `<h3> Aceptado, sus datos son: </h3> <br><h4>Nombre: ${email.nombre}   , Usuario: ${email.numControl}  , contraseña: ${email.password}</h4>`
                    : `Rechazado, </h3>, <br><h5>favor de enviar un correo a a la siguiente direccion: Direcion@cbtis66.edu.mx</h5>`;
            const mailOptions3 = {
                from: `"Control escolar", "jorgecortescbtis66@gmail.com"`,
                to: `"${email.correo}"`,
                subject: `"Aceptacion o Rechazo"`,
                html: `<h3>Estimado Usuario se le notifica que usted ha sido ${validacion}`,
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
        case "boleta":
            const mailOptions5 = {
                from: `"Control escolar", "ControlEscolarCbtis66@gmail.com"`,
                to: `"${email.correo}"`,
                subject: `"Boleta de calificaciones"`,
                html: `<h3>Estimado Usuario se le envía su boleta de calificaciones del semestre :  ${email.semestre} del periodo escolar ${email.periodo} grupo ${email.grupo}`,
            };
            return mailOptions5;
        case "justificante":
            if (email.estado == 1) {
                var mailOptions6 = {
                    from: `"Orientacion Educativa", "ControlEscolarCbtis66@gmail.com"`,
                    to: `"${email.correo}"`,
                    subject: `"Justificante"`,
                    html: `<b>Estimado Usuario se le envía su justificante: ${email.justificante}`,
                    attachments: [
                        {
                            filename: `just${email.numControl}cb66.pdf`,
                            path: `./api/assets/just${email.numControl}cb66.pdf`,
                            cid: `${email.correo}`,
                        },
                    ],
                };
                return mailOptions6;
            } else {
                var mailOptions6 = {
                    from: `"Orientacion Educativa", "ControlEscolarCbtis66@gmail.com"`,
                    to: `"${email.correo}"`,
                    subject: `"Justificante"`,
                    html: `<h5> Estimado Usuario ${email.nombre} se le envía su ubservacion de la solicitud de su justificante: ${email.observaciones}</h5>`,
                };
            }
            return mailOptions6;
        case "solicitudExmamenGlobal":
            if (email.estado == 4) {
                var mailOptions7 = {
                    from: `"Control escolar", "ControlEscolarCbtis66@gmail.com"`,
                    to: `"${email.correo}"`,
                    subject: `"Solicitud de examen global"`,
                    html: `<h3>Estimado Alumno(a) su apliccacion del examen global de la materia : ${email.materia} se aplicará el dia ${email.fecha} a las ${email.hora} en el salon ${email.salon} </h3>`,
                    };
                } else {
                    var mailOptions7 = {
                        from: `"Control escolar", "ControlEscolarCbtis66@gmail.com"`,
                        to: `"${email.correo}"`,
                        subject: `"Solicitud de examen global"`,
                        html: `<h5>Estimado Alumno(a) su apliccacion del examen global de la materia : ${email.materia} fue rechazada por el siguiente motivo: Documento ilegible o falta de comprobante de pago, le sujerimos que envíe de nuevo los ducuemntos de pago correspondientes. Saludos. </h5>`,
                    };
                }
                return mailOptions7;
        case "solicitudRecursamiento":
            if (email.estado == 4) {
                var mailOptions8 = {
                    from: `"Control escolar", "ControlEscolarCbtis66@gmail.com"`,
                    to: `"${email.correo}"`,
                    subject: `"Solicitud de recursamiento"`,
                    html: `<h3>Estimado Alumno(a) su apliccacion de recursamiento de la materia : ${email.materia} se aplicará el dia ${email.fecha} a las ${email.hora} en el salon ${email.salon} </h3>`,
                    };
                }else{
                    var mailOptions8 = {
                        from: `"Control escolar", "ControlEscolarCbtis66@gmail.com"`,
                        to: `"${email.correo}"`,
                        subject: `"Solicitud de recursamiento"`,
                        html: `<h5>Estimado Alumno(a) su apliccacion de recursamiento de la materia : ${email.materia} fue rechazada por el siguiente motivo: Documento ilegible o falta de comprobante de pago, le sujerimos que envíe de nuevo los ducuemntos de pago correspondientes. Saludos. </h5>`,
                    };
                }
                return mailOptions8;
    }
}

module.exports = enviarCorreo;