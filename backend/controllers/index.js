const pool = require("../database/database");
const logger = require("../utils/logger");

function getAllFiles(request, response) {
    logger.info(`${request.url} GET /api/`, null);
    try {
        return response.sendStatus(200);
    } catch (error) {
        logger.error(`${request.url} GET /api/`, error);
    };
};

function generateNewPdf(request, response) {
    logger.info(`${request.url} POST /api/`, null);
    try {
        return response.sendStatus(200);
    } catch (error) {
        logger.error(`${request.url} POST /api/`, error);
    };
};

module.exports = {
    getAllFiles,
    generateNewPdf
};