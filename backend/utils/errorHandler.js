const { INTERNAL_SERVER_EXCEPTION } = require("../constants/exception.constant");

module.exports = (error, request, response, next) => {
    return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: "" });
};