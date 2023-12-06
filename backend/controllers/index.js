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
        const generatedPdf_path = await generatePDF(request.body);
        const savedToDatabase = await pool.query(
            'INSERT INTO pdf_storage (file_path) VALUES ($1) RETURNING *',
            [generatedPdf_path]
        );
        if (!savedToDatabase) {
            return response.sendStatus(500);
        }
        return response.status(200).json({status: "success", file: savedToDatabase.rows[0]});
    } catch (error) {
        logger.error(`${request.url} POST /api/`, error);
    };
};

module.exports = {
    getAllFiles,
    generateNewPdf
};