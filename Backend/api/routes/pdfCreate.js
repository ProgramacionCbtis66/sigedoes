const pdf = require('pdfmake');
const file = require('fs');

const Font = require('./PDFformat/fonts');
const Style = require('./PDFformat/style');
//const { contentBBVA, contentBasico } = require('./PDFformat/formato1');

var tipo = '';

var contents = "";




function create(req, tipo) {
    const email = req.email;
    contenido = {
    content:[
        {text:"Constacia de Estudio", style: Style.header},
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
