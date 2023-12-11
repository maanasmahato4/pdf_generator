const pdf_document = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { generateUniqueName } = require("./utilityFunctions");

// new document
async function generatePDF(extractedHtml) {
    const content = extractedHtml.content;
    const attributes = {
        "ql-align-left": "left",
        "ql-align-center": "center",
        "ql-align-right": "right",
        "ql-align-justify": "justify"
    };
    //const fonts = ['ql-font-monospace', 'ql-font-serif', ''];
    //const tags = ['p', 'span', 'br', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    try {
        let pdfFilePath, uniqueName;
        uniqueName = generateUniqueName();
        pdfFilePath = path.join(__dirname, "../uploads", `${uniqueName}.pdf`);
        const doc = new pdf_document;
        if (!fs.existsSync(path.join(__dirname, "../uploads"))) {
            fs.mkdirSync(path.join(__dirname, "../uploads"));
        };

        doc.pipe(fs.createWriteStream(pdfFilePath));

        content.forEach(obj => {
            if (obj.attributes?.class) {
                for (const attribute in attributes) {
                    if (obj.attributes.class.split("-")[2] === attributes[attribute]) {
                        console.log(`attribute: ${attribute} value: ${obj.attributes.class.split("-")[2]}`);
                        doc.text(obj.text, {
                            align: obj.attributes.class.split("-")[2]
                        });
                    };
                };
            } else {
                doc.text(obj.text);
            };
        });

        doc.end();
        return pdfFilePath;
    } catch (error) {
        throw new Error(error);
    };
};


module.exports = generatePDF;
