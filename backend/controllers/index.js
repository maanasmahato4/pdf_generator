const path = require("path");
const fsPromise = require("fs").promises;
const pool = require("../database/database");
const { logger } = require("../utils/utilityFunctions");
const createTable = require("../utils/createTable");
const generatePDF = require("../utils/pdf_generator");
const { INTERNAL_SERVER_EXCEPTION } = require("../constants/exception.constant");


async function getAllFiles(request, response) {
    logger.info(`${request.url} GET /api/`, null);
    try {
        const pdfs = await pool.query('SELECT * FROM pdf_storage');
        if (!pdfs || !pdfs.rows) {
            return response.sendStatus(404);
        }
        return response.status(200).json({ files: pdfs.rows });
    } catch (error) {
        logger.error(`${request.url} GET /api/`, error);
        return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: error.message });
    };
};

async function downloadpdf(request, response) {
    console.log(request.url);
    logger.info(`${request.url} GET /api/download/:id`, null);
    try {
        //const { id } = request.body;
        const id = request.params.id
        console.log(id)
        const pdf = await pool.query("SELECT * FROM pdf_storage WHERE id=$1", [id]);
        if (!pdf || !pdf.rows) {
            return response.sendStatus(404);
        };
        console.log(pdf.rows);
        return response.download(pdf.rows[0].file_path);
    } catch (error) {
        logger.error(`${request.url} GET /api/download/:id`, error);
        return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: error.message });
    }
};

async function generateNewPdf(request, response) {
    logger.info(`${request.url} POST /api/`, null);
    try {
        await createTable('pdf_storage');
        const generatedPdf_path = await generatePDF(request.body);
        const savedToDatabase = await pool.query(
            'INSERT INTO pdf_storage (file_path) VALUES ($1) RETURNING *',
            [generatedPdf_path]
        );
        if (!savedToDatabase) {
            return response.sendStatus(500);
        }
        return response.status(200).json({ status: "success", file: savedToDatabase.rows[0] });
    } catch (error) {
        logger.error(`${request.url} POST /api/`, error);
    };
};

module.exports = {
    getAllFiles,
    downloadpdf,
    generateNewPdf
};