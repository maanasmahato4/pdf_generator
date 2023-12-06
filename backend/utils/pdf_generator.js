const pdf_document = require("pdfkit");


// new document
async function generatePDF(text_information) {
    console.log(text_information);
    const doc = new pdf_document;
};


module.exports = generatePDF;
