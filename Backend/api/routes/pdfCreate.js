'use strict';
const ccn = require('../connection/connection');
const pdf = require('pdfmake');
const file = require('fs');

const Font = require('./PDFformat/fonts');
const Style = require('./PDFformat/style');
const convertir = require('./PDFformat/numlet');
var alumno = "";
function create(req, tipo) {

    ccn.query('select * from pdf where numControl like ?', [req.numControl],
        (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    let alumnos = JSON.stringify(rows[0]);
                    alumno = JSON.parse(alumnos);
                } else {
                    console.log("error alumno no encontrado");
                }
            } else {
                console.log("error " + err.message);
            }
        });
    // ccn.query('select * from solicitus where numControl like ?', [req.numControl],
    // (err, rows, fields) => {

    //     if (!err) {
    //         if (rows.length > 0) {
    //             let solicitudes = JSON.stringify(rows[0]);
    //             solicitud = JSON.parse(solicitudes);
    //         }
    //     }
    // });

    // ccn.query('select * from escuela',
    // (err, rows, fields) => {

    //     if (!err) {
    //         if (rows.length > 0) {
    //             let escuelas = JSON.stringify(rows[0]);
    //             escuela = JSON.parse(escuelas);
    //         }
    //     }
    // });

    const fecha = new Date();
    let dia = convertir(fecha.getDate());
    let mes = textomes(fecha.getMonth());
    let year = convertir(fecha.getFullYear());
    console.log(alumno);

    const contenido = {
        asunto: [

            { image: './api/assets/texto-secretaria.png', width: 520 },
            { text: "\n \n Asunto : Constancias de estudio e inscripción \n \n \n \n", style: Style.normal, alignment: 'right', bold: true },

            { text: "Por este conducto, se hace constar que, de acuerdo a los registros de la oficia de control escolar, la (el) alumna(o): \n \n \n ", style: Style.normal },
            { text: ` ${alumno.nombre}.`, style: Style.header, alignment: 'center', bold: true },

            { text: " ", style: Style.header },
            { text: `Con Matricula se encuentra legalmente inscrito(a) es esta institución educativa Clave: ${alumno.CTO}, y cursando el TERCER SEMESTRE del Bachillerato Tecnológico en la especialidad de: ${alumno.especialidad}, Clave: 352100002-16, Área: ${alumno.area}, Turno: ${alumno.turno}, con un horario de 07:00 a 15:00 hrs. Durante el periodo del 29 de Agosto al 13 de Diciembre del 2022. \n \n `, style: Style.normal, alignment: 'justify' },

            { text: `Se extiende la presente apeticion del interesado para Tramite de ${alumno.descripcion}, en la Ciudad de Tierra Blanca, estado de Veracruz a los ${dia.toLowerCase()} dias del mes de ${mes.toLowerCase()} de ${year.toLowerCase()}. \n \n `, style: Style.normal },

<<<<<<< HEAD
            {
                style: 'tableExample',
                table: {
                    widths: [155, 'auto'],
                    body: [
                        [{ qr: "jorge Cortes dominguez", fit: 150, alignment: 'left' }, [{ text: "Firma Electrónica", style: Style.header },
                        {text: `Q0 9E Sj cy MT Iw NU hW Wl JN Uj A1 fE pP Uk dF fE NP Ul RF U3 xE T0 1J Tk dV RV p8 MT
                Mw MT c0 MD Aw MT E5 Nz Mw MD U2 Mz B8 TX w1 IG Rl IG Rp Y2 ll bW Jy ZS Bk ZS Ax OT
                cy fF ZF Uk FD Ul Va fG 51 bG x8 bn Vs bA ==`, style: Style.firma}]
                        ]
                    ]
                }
            },

            { text: " \n Director", style: Style.header },
            { text: `${alumno.Esc_Director}`, style: Style.firma, alignment: "center" }
=======
            { text: " \n \n \n Director", style: Style.header },
            { text: `${alumno.Esc_Director}`, style: Style.firma , alignment : "center" }
        ],
        pieDeFormato:[
            {text: "16 de septiembre Esq. J.R. Claveria, Col. Hoja del Maíz, Tierra Blanca, Ver. C.P.95110 Tel. 274 74 3 09 62 correo electrónico: cbtis066.dir@dgeti.sems.gob.mx", style: Style.normal}
>>>>>>> 903e6504e4be22efdd3cbe4bf389ffeb8fc9eb28
        ]
    };

    const docDefinition = {
        content: contenido['asunto'],
        style: Style
    }
    const printer = new pdf(Font);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    if (tipo !== "") {
        pdfDoc.pipe(file.createWriteStream("./api/assets/prueba.pdf"));
    }
    pdfDoc.end();
}
function textomes(mes) {
    switch (mes) {
        case 1: return "ENERO";
        case 2: return "FEBRERO";
        case 3: return "MARZO";
        case 4: return "ABRIL";
        case 5: return "MAYO";
        case 6: return "JUNIO";
        case 7: return "JULIO";
        case 8: return "AGOSTO";
        case 9: return "SEPTIEMBRE";
        case 10: return "OCTUBRE";
        case 11: return "NOVIMBRE";
        case 12: return "DICIEMBRE";
    }
}
module.exports = create;