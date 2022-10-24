const pdf = require('pdfmake');
const file = require('fs');

const Font = require('./PDFformat/fonts');
const Style = require('./PDFformat/style');
const {contentBBVA} = require('./PDFformat/formato1');


var tipo='';
var contents ='';



function datos(dato){
    tipo = dato;
    if (tipo == "BBVA"){contents = content;}
    console.log(contents + '\n');
}

const docDefinition = {
    content: contentBBVA,
    style: Style
}

const printer = new pdf(Font);

let pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(file.createWriteStream("./api/assets/prueba.pdf"));
pdfDoc.end();

module.exports = {pdfDoc,tipo};
