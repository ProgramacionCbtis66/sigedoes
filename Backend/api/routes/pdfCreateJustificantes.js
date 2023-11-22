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
    console.log(just);
    alumno = await datoAlumno(just.numControl);
     
    const fecha = new Date();
    let dia = convertir(fecha.getDate());
    let mes = textomes(fecha.getMonth());
    let year = convertir(fecha.getFullYear());

    if(just.fecha1==just.fecha2){
        var fechaj = just.fecha1;
    }else{
        var fechaj = just.fecha1 + " al " + just.fecha2;
    }
    const justificante1 = {
        asunto: [

            { image: './api/assets/JustificanteSubSec.png', width: 520 },
            { text: `\n Tierra Blanca. Ver, a ${dia.toLowerCase()} de ${mes} de ${year.toLowerCase()}  \n `, style: Style.normal, alignment: 'center' },

            { text: `JUSTIFICANTE DE INASISTENCIA:`, style: Style.normal, alignment: 'center', bold: true, decoration: 'underline', decorationStyle: 'solid' },

            { text: `\n C.C. DOCENTES DEL GRUPO: "${just.grado}${just.grupo}"`, style: Style.normal, alignment: 'right', bold: true },
            { text: `ESPECIALIDAD: "${just.especialidad}"`, style: Style.normal, alignment: 'right', bold: true },
            { text: `TURNO: "${just.turno}"`, style: Style.normal, alignment: 'right', bold: true },
            { text: `P R E S E N T E S.-`, style: Style.normal, alignment: 'right', bold: true  },
            { text: " ", style: Style.normal  },
            { text: `Por este conducto, solicito a ustedes le sean justificadas la(s) inasistencia(s) a: ${just.nombre} ${just.apellidoP} ${just.apellidoM} quien por motivos de :${just.motivo}, no asistio a clases el (los) dias(s) ${fechaj} del presente año. Por lo anterior le pedimos sean tan amables de justificar las insistencias de lo(s) dia(s) señalado(s) \n `, style: Style.normal, alignment: 'justify' },
            { text: `     Cabe señalar que es RESPONSABILIDAD DEL ALUMNO regularizarse en la entrega de trabajos y/o tareas que el (la) profesor (a) haya enconmendado, haciendo mencion que el presente documento NO EXENTA al alumno de sus obligaciones academicas\n `, style: Style.normal, alignment: 'justify' },

            { text: `\n ATENTAMENTE. \n \n`, style: Style.normal, alignment: 'center' },
            { text: "________________________________", style: Style.normal, alignment: 'center', bold: true },
            { text: "OFICINA DE ORIENTACION EDUCATIVA", style: Style.normal, alignment: 'center', bold: true },
            { text: `${just.nombreOE}`, style: Style.firma, alignment: "center" },
            { image: './api/assets/tablajustificantes.png', width: 560, absolutePosition: { x: 12, y: 506 } },
            { image: './api/assets/pieformato.png', width: 570, absolutePosition: { x: 8, y: 765 } },
        ]
    }

    const justificante2 = {
        asunto: [

            { image: './api/assets/JustificanteSubSec.png', width: 520 },

            { text: "\n JUSTIFICANTE DE INASISTENCIA POR HORAS: \n ", style: Style.normal, alignment: 'center', bold: true },
            { text: `FECHA: ${fecha.getDate()} de ${mes.toLowerCase()} de ${fecha.getFullYear()}. \n`, style: Style.normal, alignment: 'center', bold: true },

            { text: ` \n C.C. DOCENTES DEL GRUPO: "${just.grado} ${just.grupo} "`, style: Style.normal, alignment: 'right', bold: true, fontSize: 11 },
            { text: `ESPECIALIDAD: "${just.especialidad}"`, style: Style.normal, alignment: 'right', bold: true,fontSize: 11 },
            { text: `TURNO: "${just.turno}"`, style: Style.normal, alignment: 'right', bold: true ,fontSize: 11 },
            { text: `P R E S E N T E S.-`, style: Style.normal, alignment: 'right', bold: true,fontSize: 11  },
            { text: " ", style: Style.normal,fontSize: 11  },
            { text: `Por este conducto, solicito a ustedes le sean justificadas la(s) inasistencia(s) a : ${just.nombre} quien por motivos de : ${just.motivo}, no asistio a clases de: ${just.horas1} a ${just.horas2} hrs. el dia ${fecha.getDate()} del presente año. Por lo anteriorle pedimos sean tan amables de justificar las insistencias de la(s) hora(s) señalada(s) \n `, style: Style.normal, alignment: 'justify' },
            { text:[
                {text:`    Cabe señalar que es `, style: Style.normal},
                {text:`RESPONSABILIDAD DEL ALUMNO`, style: Style.normal, bold: true},
                {text:` regularizarse en la entrega de trabajos y/o tareas que el (la) profesor (a) haya enconmendado, haciendo mencion que el presente documento `, style: Style.normal},
                {text:`NO EXENTA`, style:Style.normal, bold:true},
                {text:` al alumno de sus obligaciones academicas\n \n `, style: Style.normal, alignment: 'justify' },
            ], alignment: 'justify' },
            { text: ` \nFIRMA DEL DOCENTE\n \n`, style: Style.normal, alignment: 'center' },

            { text: `\n ____________________      ____________________          ____________________\n `, style: Style.normal, alignment: 'center' },

            { text: ` \nATENTAMENTE\n`, style: Style.normal, alignment: 'center' },

            { text: "OFICINA DE ORIENTACION EDUCATIVA", style: Style.header },
            { text: `${just.nombreOE} \n \n `, style: Style.firma, alignment: "center" },
            { image: './api/assets/pieformato.png', width: 570, absolutePosition: { x: 5, y: 760 } },
        ]
    }
    
    console.log(" debes aparecer hijo del maiz palomero   "+ just.tipo);

    if (just.tipo == "dias") {
        docDefinition = {
            content: justificante1['asunto'],

            permissions: {
                printing: 'highResolution', //'lowResolution'
                modifying: false,
                copying: false,
                annotating: true,
                fillingForms: true,
                contentAccessibility: true,
                documentAssembly: true
              }
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