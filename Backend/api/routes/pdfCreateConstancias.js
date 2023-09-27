const ccn = require('../connection/connection');
const pdf = require('pdfmake');
const file = require('fs');

const Font = require('./PDFformat/fonts');
const Style = require('./PDFformat/style');
const convertir = require('./PDFformat/numlet');

var alumno = "";


const datoAlumno = async (req, tipo) => {
    try {
        const alumno = await ccn.query('select * from pdf where numControl like ?', [req.numControl]);
        if (alumno.length > 0) {
            return JSON.parse(JSON.stringify(alumno[0]));
        } else {
            console.log("error alumno no encontrado");
            return null;
        }
    } catch (error) {
        console.log("error " + error.message);
        return null;
    }
}

async function createConstancias(req, tipo) {
    alumno = await datoAlumno(req, tipo);
    const fecha = new Date();
    let dia = convertir(fecha.getDate());
    let mes = textomes(fecha.getMonth());
    let year = convertir(fecha.getFullYear());

    let horario = "";
    if (alumno.turno == 'Matutino') {
        horario = "7:00 - 15:00";
    } else if (alumno.turno == 'Vespertino') {
        horario = "15:00 - 20:00";
    }

    const contenido = {
        asunto: [

            { image: './api/assets/texto-secretaria.png', width: 520 },
            { text: `\n \n Asunto : Constancias de estudio e inscripción \n \n \n \n`, style: Style.normal, alignment: 'right', bold: true },

            { text: "Por este conducto, se hace constar que, de acuerdo a los registros de la oficia de control escolar, la (el) alumna(o): \n \n \n ", style: Style.normal },
            { text: ` ${alumno.nombre}.`, style: Style.header, alignment: 'center', bold: true },

            { text: " ", style: Style.header },
            { text: `Con matrícula ${alumno.numControl} se encuentra legalmente inscrito(a) en esta institución educativa Clave: ${alumno.CTO}, y cursando el ${alumno.grado} SEMESTRE del Bachillerato Tecnológico en la especialidad de: ${alumno.especialidad}, Clave: ${alumno.cbeesp}, Área: ${alumno.area}, Turno: ${alumno.turno}, con un horario de ${horario} durante el periodo del ${alumno.Esc_Periodo}. \n \n `, style: Style.normal, alignment: 'justify' },

            { text: `Se extiende la presente petición del interesado para ${req.asunto}, en la Ciudad de Tierra Blanca, estado de Veracruz a los ${dia.toLowerCase()} dias del mes de ${mes} de ${year.toLowerCase()}. \n \n `, style: Style.normal },

            {
                layout: 'noBorders',
                table: {
                    widths: [155, 'auto'],
                    body: [
                        [{ qr: `${JSON.stringify(req.datos)}`, fit: 154, alignment: 'center' }, [{ text: "Firma Electrónica", style: Style.header },
                        {
                            text: `Q0 9E Sj cy MT Iw NU hW Wl JN Uj A1 fE pP Uk dF fE NP Ul RF U3 xE T0 1J Tk dV RV p8 MT
                Mw MT c0 MD Aw MT E5 Nz Mw MD U2 Mz B8 TX w1 IG Rl IG Rp Y2 ll bW Jy ZS Bk ZS Ax OT
                cy fF ZF Uk FD Ul Va fG 51 bG x8 bn Vs bA ==`, style: Style.electronica
                        }]
                        ]
                    ]
                }
            },
            { text: "Director", style: Style.header },
            { text: `${alumno.Esc_Director} \n \n `, style: Style.firma, alignment: "center" },
            { image: './api/assets/pieFormato3.0.png', width: 570, absolutePosition: { x: 5, y: 760 } },

        ]

    }
    const docDefinition = {
        content: contenido['asunto'],
        style: Style
    }
    const printer = new pdf(Font);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    if (tipo == "Constancia") {
        pdfDoc.pipe(file.createWriteStream(`./api/assets/cl${req.numControl}cb66.pdf`));
    }
    pdfDoc.end();
}

function textomes(mes) {
    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return month[mes];
}

module.exports = createConstancias;