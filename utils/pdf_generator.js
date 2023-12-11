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
    const tags = {
        'p': { fontSize: 12 },
        'span': { fontSize: 12 },
        'br': { moveDown: true },
        'strong': { fontSize: 10 },
        'h1': { fontSize: 32 },
        'h2': { fontSize: 24 },
        'h3': { fontSize: 18 },
        'h4': { fontSize: 16 },
        'h5': { fontSize: 14 },
        'h6': { fontSize: 12 }
    };
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
            const tagExist = tags[obj.tag];
            if (tagExist) {
                const alignmentRegex = new RegExp(`ql-align-(left|center|right|justify)`);
                const matched = alignmentRegex.exec(obj.attributes.class);
                if (matched) {
                    doc.fontSize(tagExist.fontSize);
                    doc.text(obj.text, {
                        align: matched[1]
                    });
                } else {
                    doc.fontSize(tagExist.fontSize);
                    doc.text(obj.text);
                };
            };
        });
        doc.end();
        return pdfFilePath;
    } catch (error) {
        throw new Error(error);
    };
};


module.exports = generatePDF;
