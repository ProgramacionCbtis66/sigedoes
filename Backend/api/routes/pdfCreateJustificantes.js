const ccn = require('../connection/connection');
const pdf = require('pdfmake');
const file = require('fs');
const nodemailer = require("nodemailer");

const Font = require('./PDFformat/fonts');
const Style = require('./PDFformat/style');
const convertir = require('./PDFformat/numlet');

var alumno = "";
var just = null;
var docDefinition;

const datoAlumno = async (req, tipo) => {
    const conexion = await ccn();
    try {
        const alumno = await conexion.execute(`select * from pdfjustificantes where numControl = ?`, [req.numControl]);
        if (alumno.length > 0) {

            return JSON.parse(JSON.stringify(alumno[0][0]));
        } else {
            console.log("error alumno no encontrado");
            return null;
        }
    } catch (error) {
        console.log("error " + error.message);
        return null;
    }
}

async function createJustificante(req, res, tipo) {
    alumno = await datoAlumno(req, tipo);
    const fecha = new Date();
    let dia = convertir(fecha.getDate());
    let mes = textomes(fecha.getMonth());
    let year = convertir(fecha.getFullYear());

    let horario = "";
    if (alumno.turno == 'MATUTINO' || alumno.turno == 'Matutino') {
        horario = "7:00 - 15:00";
        alumno.horario = "7:00 - 15:00";
    } else if (alumno.turno == 'VESPERTINO' || alumno.turno == 'Vespertino') {
        horario = "15:00 - 20:00";
        alumno.horario = "15:00 - 20:00";
    }

    var nombre = alumno.nombre + " " + alumno.apellidoP + " " + alumno.apellidoM;
    var periodoEscuela = alumno.Esc_Periodo;
    console.log(alumno.CTO);
    const justificante1 = {
        asunto: [

            { image: './api/assets/Justificante SubSec.png', width: 520 },
            { text: `\n \n TIERRA BLANCA. VER A ${dia.toLowerCase()} DE ${mes} DE ${año.toLowerCase}\n \n \n \n`, style: Style.normal, alignment: 'center', bold: true },

            { text: "\n \n \n JUSTIFICANTE DE INASISTENCIA: \n \n \n ", style: Style.normal, alignment: 'center', bold: true },

            { text: `C.C. DOCENTES DEL GRUPO: "${alumnos.grado}"`, style: Style.header, alignment: 'right', bold: true },
            { text: `ESPECIALIDAD: "${alumnos.especialidad}"`, style: Style.header, alignment: 'right', bold: true },
            { text: `TURNO: "${alumnos.turno}"`, style: Style.header, alignment: 'right', bold: true },
            { text: `P R E S E N T E S.-`, style: Style.header, alignment: 'right', bold: true },
            { text: " ", style: Style.header },
            { text: `Por este conducto, solicito a ustedes le sean justificadas la(s) inasistencia(s) a \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `${alumnos.nombre} ${alumnos.apellidoP} ${alumnos.apellidoM} quien por motivos de :\n \n `, style: Style.normal, alignment: 'justify' },
            { text: `${alumnos.razon}, no asistio a clases el (los)\n \n `, style: Style.normal, alignment: 'justify' },
            { text: `dias(s) ${justificante.dias} del presente año. Por lo anterior\n \n `, style: Style.normal, alignment: 'justify' },
            { text: `Cabe señalar que es RESPONSABILIDAD DEL ALUMNO regularizarse en la \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `entrega de trabajos y/o tareas que el (la) profesor (a) haya enconmendado, haciendo`, style: Style.normal, alignment: 'justify' },
            { text: `mencion que el presente documento NO EXENTA al alumno de sus obligaciones \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `academicas\n \n `, style: Style.normal, alignment: 'justify' },

            { text: `\n \n \nATENTAMENTE\n \n \n`, style: Style.normal, alignment: 'center' },

            { text: "OFICINA DE ORIENTACION EDUCATIVA", style: Style.header },
            { text: `${alumno.Esc_Director} \n \n `, style: Style.firma, alignment: "center" },
            { image: './api/assets/tabla justificantes', width: 570, absolutePosition: { x: 5, y: 760 } },
            { image: './api/assets/pieformato.png', width: 570, absolutePosition: { x: 5, y: 760 } },
            { image: './api/assets/', width: 570, absolutePosition: { x: 5, y: 760 } },




        ]
    }
 const justificante2 = {
            asunto: [

                { image: './api/assets/Justificante SubSec.png', width: 520 },

                { text: "\n \n JUSTIFICANTE DE INASISTENCIA POR HORAS: \n \n ", style: Style.normal, alignment: 'center', bold: true },
                { text: `\n \n FECHA: ${dia.toLowerCase()} / ${mes} / ${año.toLowerCase}\n \n \n \n`, style: Style.normal, alignment: 'center', bold: true },

                { text: `C.C. DOCENTES DEL GRUPO: "${alumnos.grado}"`, style: Style.header, alignment: 'right', bold: true },
                { text: `ESPECIALIDAD: "${alumnos.especialidad}"`, style: Style.header, alignment: 'right', bold: true },
                { text: `TURNO: "${alumnos.turno}"`, style: Style.header, alignment: 'right', bold: true },
                { text: `P R E S E N T E S.-`, style: Style.header, alignment: 'right', bold: true },
                { text: " ", style: Style.header },
                { text: `Por este conducto, solicito a ustedes le sean justificadas la(s) inasistencia(s) a \n \n `, style: Style.normal, alignment: 'justify' },
                { text: `${alumnos.nombre} ${alumnos.apellidoP} ${alumnos.apellidoM} quien por motivos de :\n \n `, style: Style.normal, alignment: 'justify' },
                { text: `${alumnos.razon}, no asistio a clases el (los)\n \n `, style: Style.normal, alignment: 'justify' },
                { text: `dias(s) ${justificante.dias} del presente año. Por lo anterior\n \n `, style: Style.normal, alignment: 'justify' },
                { text: `Cabe señalar que es RESPONSABILIDAD DEL ALUMNO regularizarse en la \n \n `, style: Style.normal, alignment: 'justify' },
                { text: `entrega de trabajos y/o tareas que el (la) profesor (a) haya enconmendado, haciendo`, style: Style.normal, alignment: 'justify' },
                { text: `mencion que el presente documento NO EXENTA al alumno de sus obligaciones \n \n `, style: Style.normal, alignment: 'justify' },
                { text: `academicas\n \n `, style: Style.normal, alignment: 'justify' },

                { text: `\n \n \nATENTAMENTE\n \n \n`, style: Style.normal, alignment: 'center' },

                { text: "OFICINA DE ORIENTACION EDUCATIVA", style: Style.header },
                { text: `${alumno.Esc_Director} \n \n `, style: Style.firma, alignment: "center" },
                { image: './api/assets/tbkhxz,vzm', width: 570, absolutePosition: { x: 5, y: 760 } },
                { image: './api/assets/pieformato.png', width: 570, absolutePosition: { x: 5, y: 760 } },
                { image: './api/assets/', width: 570, absolutePosition: { x: 5, y: 760 } },




            ]
        }

    if(just.tipo == 0){
        docDefinition = {
            content: justificante1['asunto'],
            //style: Style
        }
    } else {
        docDefinition = {
            content: justificante2['asunto'],
            //style: Style
        }
    }

    }
    
    const printer = new pdf(Font);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    let pdfContent = null;
    if (docDefinition.content == "Justificante"){
        pdfDoc.pipe(file.createWriteStream(`./api/assets/cl${req.numControl}cb66.pdf`));

    }

    pdfDoc.end();
    return pdfDoc;


function textomes(mes) {
    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return month[mes];
}
module.exports = createJustificante;