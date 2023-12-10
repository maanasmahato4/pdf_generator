const pdf_document = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { generateUniqueName } = require("./utilityFunctions");

// new document
async function generatePDF(text_information) {
    console.log(text_information);
    const { title, body, conclusion } = text_information;
    try {
        let pdfFilePath, uniqueName;
        uniqueName = generateUniqueName();
        pdfFilePath = path.join(__dirname, "../uploads", `${uniqueName}.pdf`);
        const doc = new pdf_document;
        if (!fs.existsSync(path.join(__dirname, "../uploads"))) {
            fs.mkdirSync(path.join(__dirname, "../uploads"));
        };

        doc.pipe(fs.createWriteStream(pdfFilePath));
        doc.text(`Title: ${title}`);
        doc.text(`Body: ${body}`);
        doc.text(`Conclusion: ${conclusion}`);
        doc.end();

        return pdfFilePath;
    } catch (error) {
        throw new Error(error);
    };
};


module.exports = generatePDF;
