const ccn = require('../connection/connection');
const pdf = require('pdfmake');
const file = require('fs');


const Font = require('./PDFformat/fonts');
const Style = require('./PDFformat/style');
const convertir = require('./PDFformat/numlet');
const {textomes}= require('./PDFformat/textomes');

var alumno = "";
var docDefinition;

const datoAlumno = async (numControl) => {
    
    const conexion = await ccn();
    
        const alumno = await conexion.execute('select a.CTO, e.Esc_Periodo, e.Esc_Director from alumno as a join escuela as e on a.CTO = a.CTO where a.numControl = ?', [numControl]);
        if (alumno.length > 0) {
            return JSON.parse(JSON.stringify(alumno[0][0]));
        } else {
            console.log("error alumno no encontrado");
            return null;
        }
}

async function createJustificante(req, res, tipo) {
    const just = req;
    console.log(req.numControl);
    alumno = await datoAlumno(just.numControl);
     
    const fecha = new Date();
    let dia = convertir(fecha.getDate());
    let mes = textomes(fecha.getMonth());
    let year = convertir(fecha.getFullYear());

    const justificante1 = {
        asunto: [

            { image: './api/assets/JustificanteSubSec.png', width: 520 },
            { text: `\n \n TIERRA BLANCA. VER A ${dia.toLowerCase()} DE ${mes} DE ${year.toLowerCase}\n \n \n \n`, style: Style.normal, alignment: 'center', bold: true },

            { text: "\n \n \n JUSTIFICANTE DE INASISTENCIA: \n \n \n ", style: Style.normal, alignment: 'center', bold: true },

            { text: `C.C. DOCENTES DEL GRUPO: "${just.grado}"`, style: Style.header, alignment: 'right', bold: true },
            { text: `ESPECIALIDAD: "${just.especialidad}"`, style: Style.header, alignment: 'right', bold: true },
            { text: `TURNO: "${just.turno}"`, style: Style.header, alignment: 'right', bold: true },
            { text: `P R E S E N T E S.-`, style: Style.header, alignment: 'right', bold: true },
            { text: " ", style: Style.header },
            { text: `Por este conducto, solicito a ustedes le sean justificadas la(s) inasistencia(s) a \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `${just.nombre} ${just.apellidoP} ${just.apellidoM} quien por motivos de :\n \n `, style: Style.normal, alignment: 'justify' },
            { text: `${just.razon}, no asistio a clases el (los)\n \n `, style: Style.normal, alignment: 'justify' },
            { text: `dias(s) ${just.fecha} del presente año. Por lo anterior\n \n `, style: Style.normal, alignment: 'justify' },
            { text: `le pedimos sean tan amables de justificar las insistencias de lo(s) dia(s) señalado(s) \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `Cabe señalar que es RESPONSABILIDAD DEL ALUMNO regularizarse en la \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `entrega de trabajos y/o tareas que el (la) profesor (a) haya enconmendado, haciendo`, style: Style.normal, alignment: 'justify' },
            { text: `mencion que el presente documento NO EXENTA al alumno de sus obligaciones \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `academicas\n \n `, style: Style.normal, alignment: 'justify' },

            { text: `\n \n \nATENTAMENTE\n \n \n`, style: Style.normal, alignment: 'center' },

            { text: "OFICINA DE ORIENTACION EDUCATIVA", style: Style.header },
            { text: `${alumno.Esc_Director} \n \n `, style: Style.firma, alignment: "center" },
            { image: './api/assets/tablajustificantes.png', width: 570, absolutePosition: { x: 5, y: 760 } },
            { image: './api/assets/pieformato.png', width: 570, absolutePosition: { x: 5, y: 760 } },
        ]
    }

    const justificante2 = {
        asunto: [

            { image: './api/assets/JustificanteSubSec.png', width: 520 },

            { text: "\n \n JUSTIFICANTE DE INASISTENCIA POR HORAS: \n \n ", style: Style.normal, alignment: 'center', bold: true },
            { text: `\n \n FECHA: ${dia.toLowerCase()} / ${mes} / ${year.toLowerCase}\n \n \n \n`, style: Style.normal, alignment: 'center', bold: true },

            { text: `C.C. DOCENTES DEL GRUPO: "${just.grado}"`, style: Style.header, alignment: 'right', bold: true },
            { text: `ESPECIALIDAD: "${just.especialidad}"`, style: Style.header, alignment: 'right', bold: true },
            { text: `TURNO: "${just.turno}"`, style: Style.header, alignment: 'right', bold: true },
            { text: `P R E S E N T E S.-`, style: Style.header, alignment: 'right', bold: true },
            { text: " ", style: Style.header },
            { text: `Por este conducto, solicito a ustedes le sean justificadas la(s) inasistencia(s) a \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `${just.nombre} ${just.apellidoP} ${just.apellidoM} quien por motivos de :\n \n `, style: Style.normal, alignment: 'justify' },
            { text: `${just.fecha}, no asistio a clases de: ${just.horas1} a\n \n `, style: Style.normal, alignment: 'justify' },
            { text: ` ${just.horas2}hrs. el dia ${just.dias} del presente año. Por lo anterior\n \n `, style: Style.normal, alignment: 'justify' },
            { text: `le pedimos sean tan amables de justificar las insistencias de la(s) hora(s) señalada(s) \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `Cabe señalar que es RESPONSABILIDAD DEL ALUMNO regularizarse en la \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `entrega de trabajos y/o tareas que el (la) profesor (a) haya enconmendado, haciendo`, style: Style.normal, alignment: 'justify' },
            { text: `mencion que el presente documento NO EXENTA al alumno de sus obligaciones \n \n `, style: Style.normal, alignment: 'justify' },
            { text: `academicas\n \n `, style: Style.normal, alignment: 'justify' },

            { text: `\n \n \nFIRMA DEL DOCENTE\n \n \n`, style: Style.normal, alignment: 'center' },

            { text: `\n \n \n________________ ________________ ________________\n \n \n`, style: Style.normal, alignment: 'center' },

            { text: `\n \n \nATENTAMENTE\n \n \n`, style: Style.normal, alignment: 'center' },

            { text: "OFICINA DE ORIENTACION EDUCATIVA", style: Style.header },
            { text: `${alumno.Esc_Director} \n \n `, style: Style.firma, alignment: "center" },
            { image: './api/assets/pieformato.png', width: 570, absolutePosition: { x: 5, y: 760 } },
        ]
    }
    
    console.log(" debes aparecer hijo del maiz palomero   "+ just.tipo);

    if (just.tipo == "dias") {
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

    const printer = new pdf(Font);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
   
     
        pdfDoc.pipe(file.createWriteStream(`./api/assets/just${just.numControl}cb66.pdf`));

     

    pdfDoc.end();
    return pdfDoc;
}

module.exports = createJustificante;