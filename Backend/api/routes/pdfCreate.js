const pdf = require('pdfmake');
const file = require('fs');

const Font = require('./PDFformat/fonts');
const Style = require('./PDFformat/style');
const { contentBBVA, contentBasico } = require('./PDFformat/formato1');



var tipo = '';

var contents = "";

function create(req, tipo) {
    const email = req.email;
    if (tipo == "BBVA") { contents = contentBBVA; }
    if (tipo == "BASICO") { contents = contentBasico; }
    const docDefinition = {
        content: contents,
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
