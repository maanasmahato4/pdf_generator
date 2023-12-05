const { developmentLogger, productionLogger } = require("./logger");

// managing logger for production and development environment
let logger = null;
if (process.env.NODE_ENV = "development") {
    logger = developmentLogger;
} else {
    logger = productionLogger;
};


module.exports = {
    logger
};