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
        const pdf = await pool.query('SELECT * FROM pdf_storage');
        if (!pdf || !pdf.rows) {
            return response.sendStatus(404);
        }
        const file_path = path.join(__dirname, "uploads", pdf.rows);
        return response.status(200).json({ files: pdf });
    } catch (error) {
        logger.error(`${request.url} GET /api/`, error);
        return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: error.message });
    };
};

async function generateNewPdf(request, response) {
    logger.info(`${request.url} POST /api/`, null);
    try {
        await createTable('pdf_storage');
        const savedPdf = generatePDF(request.body);
        return response.sendStatus(200);
    } catch (error) {
        logger.error(`${request.url} POST /api/`, error);
    };
};

module.exports = {
    getAllFiles,
    generateNewPdf
};