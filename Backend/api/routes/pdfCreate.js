const ccn = require('./connection/connection');
const pdf = require('pdfmake');
const file = require('fs');

const Font = require('./PDFformat/fonts');
const Style = require('./PDFformat/style');
//const { contentBBVA, contentBasico } = require('./PDFformat/formato1');

var tipo = '';
var contents = "";




function create(req, tipo) {

    ccn.query('select * from alumno where numControl = ?', [req.numControl]);
        (err, rows, fields) =>{
            if(!err){
                if(rows.length > 0){

                    let datos = JSON.stringify(rows[0]);
                    let dato = JSON.parse(datos);
                }
            }
        }
    const email = req.email;
    contenido = {
    content:[
        {text:"Constacia de Estudio", style: Style.header},
        {text:`Los algoritmos se han creado, el correo ${email} modificado y utilizado a lo largo de la historia, hace más de 500 años cuando los sumerios ilustraron tablas de arcilla una estructura de repetición utilizado para distribuir de forma equitativa la cosecha de granos entre un número variables de nombres. Como hemos visto el uso de los algoritmos se han utilizado tanto en la ciencia como en la producción. En la ingeniería de procesos se utiliza para él estudio de tiempos y movimientos y tomar la mejor decisión en la implementación de procedimientos productivos; en la ciencia y la tecnología se utiliza para procesar los datos y hacer los cálculos más rápidos y procesar grandes cantidades de volúmenes de datos; en la actualidad los algoritmos se están utilizando en  todas las áreas de las ciencias y las tecnologías del ser humano, con la tecnología de las soluciones del internet de las cosas, Big Data, la industria 4.0, y la nueva computación cuántica. Todo el mundo de este país debería saber programar”, esta frase de Steve Jobs me dejó en claro que  aprender a programar ayudaría a todos y en particular a los alumnos del nivel bachillerato a resolver todo tipo de problemas y procesar un gran volumen de información por la lógica cuando se desarrolla un algoritmo,  además deja en claro los procesos secuenciales y plasmados y de forma que cuando se tenga la solución se pueda analizar el algoritmo y se pueda mejorar los procesos, dando mantenimiento a estas soluciones o implementaciones a soluciones mayores`, style: Style.cursivo}
    ],
    asunto:[
        {text: "Asunto", style: Style.header},
        {text: `Constancias de estudio e inscripcion`,style: Style.cursivo}
    ],
    constancia:[
        {text: "", style: Style.header},
        {text: `Por este conducto, se hace constar que, de acuerdo a los registros de la oficia de constrol escolar, la (el) alumna(o): ${nombre}.`}
    ],
    cuerpo:[
        {text: "Cuerpo", style: Style.header},
        {text: `Con Matricula se encuentra legalmente inscrito(a) es esta institución educativa Clave: 30DCT0236O, y cursando el TERCER SEMESTRE del Bachillerato Tecnológico en la especialidad de: ${especialidad}, Clave: 352100002-16, Área: ${area}, Turno: ${turno}, con un horario de 07:00 a 15:00 hrs. Durante el periodo del 29 de Agosto al 13 de Diciembre del 2022.`, style: Style.cursivo}
    ],
    final:[
        {text: "Final", style: Style.header},
        {text: `Se extiende la presente apeticion del interesado para Tramite de Servicio Medico, en la Ciudad de Tierra Blanca, estado de Veracruz a los trece dias del mes de Octubre de 2022.`, style: Style.cursivo}
    ],
    firma:[
        {text: "Firma", style: Style.header},
        {text: `#$&/$@`, style: Style.cursivo}
    ],
    director:[
        {text: "Director", style: Style.header},
        {text: "RICARDO SERRA BERNAL DIRECTOR", style: Style.cursivo},
        {text:`Los algoritmos se han creado, el correo ${email} modificado y utilizado a lo largo de la historia, hace más de 500 años cuando los sumerios ilustraron tablas de arcilla una estructura de repetición utilizado ara distribuir de forma equitativa la cosecha de granos entre un número variables de hombres. Como hemos visto el uso de los algoritmos se han utilizado tanto en la ciencia como en la producción. En la n geniería de procesos se utiliza para él estudio de tiempos y movimientos y tomar la mejor decisión en la implementación de procedimientos productivos; en la ciencia y la tecnología se utiliza para procesar los datos y hacer los cálculos más rápidos y procesar grandes cantidades de volúmenes de datos; en la actualidad los algoritmos se están utilizando en  todas las áreas de las ciencias y las tecnologías del ser humano, con la tecnología de las soluciones del internet de las cosas, Big Data, la industria 4.0, y la nueva computación cuántica Todo el mundo de este país debería saber programar”, esta frase de Steve Jobs me dejó en claro que  aprender a programar ayudaría a todos y en particular a los alumnos del nivel bachillerato a resolver todo tipo de problemas y procesar un gran volumen de información por la lógica cuando se desarrolla un algoritmo,  además deja en claro los procesos secuenciales y plasmados y de forma que cuando se tenga la solución se pueda analizar el algoritmo y se pueda mejorar los procesos, dando mantenimiento a estas soluciones o implementaciones a soluciones mayores`, style: Style.normal}
    ]
    };
    //if (tipo == "BBVA") { contents = contentBBVA; }
    //if (tipo == "BASICO") { contents = contentBasico; }
    const docDefinition = {
        content: contenido['content'],
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
