const { INTERNAL_SERVER_EXCEPTION } = require("../constants/exception.constant");
const { logger } = require("./utilityFunctions");

module.exports = (error, request, response, next) => {
    logger.error(`${request.url} GET /api/`, error);
    return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: error.message });
};