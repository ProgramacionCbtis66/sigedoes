const ccn = require('../connection/connection');
const pdf = require('pdfmake');
const file = require('fs');

const Font = require('./PDFformat/fonts');
const Style = require('./PDFformat/style');
//const { contentBBVA, contentBasico } = require('./PDFformat/formato1');

var tipo = '';
var contents = "";
var dato = '';




function create(req, tipo) {

    ccn.query('select * from alumno where numControl = ?', [req.numControl],
        (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    let datos = JSON.stringify(rows[0]);
                    dato = JSON.parse(datos);
                    console.log(dato);
                }
            }
        });
        console.log(dato);
const email = req.email;
contenido = {
    asunto: [

        { image: './api/assets/texto-secretaria.png', width: 520 },
        { text: "\n \n Asunto : Constancias de estudio e inscripcion \n \n", style: Style.normal, alignment: 'right', bold: true },


        { text: `Por este conducto, se hace constar que, de acuerdo a los registros de la oficia de constrol escolar, la (el) alumna(o):`, style: Style.normal },
        { text: ` ${dato.nombre}.`, style: Style.header, alignment: 'center', bold: true },

        { text: "Cuerpo", style: Style.header },
        { text: `Con Matricula se encuentra legalmente inscrito(a) es esta institución educativa Clave: 30DCT0236O, y cursando el TERCER SEMESTRE del Bachillerato Tecnológico en la especialidad de: ${dato.especialidad}, Clave: 352100002-16, Área: ${dato.area}, Turno: ${dato.turno}, con un horario de 07:00 a 15:00 hrs. Durante el periodo del 29 de Agosto al 13 de Diciembre del 2022.`, style: Style.normal },

    
        { text: `Se extiende la presente apeticion del interesado para Tramite de Servicio Medico, en la Ciudad de Tierra Blanca, estado de Veracruz a los trece dias del mes de Octubre de 2022.`, style: Style.normal },

        { text: "Firma", style: Style.header },
        { text: `#$&/$@`, style: Style.cursivo },

        { text: "Director", style: Style.header },
        { text: "RICARDO SERRA BERNAL DIRECTOR", style: Style.cursivo },
    ]
};
//if (tipo == "BBVA") { contents = contentBBVA; }
//if (tipo == "BASICO") { contents = contentBasico; }
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
module.exports = create;
