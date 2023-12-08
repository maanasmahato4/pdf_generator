const { developmentLogger, productionLogger } = require("./logger");
const { v4: uuid } = require("uuid");

// managing logger for production and development environment
let logger = null;
if (process.env.NODE_ENV = "development") {
    logger = developmentLogger;
} else {
    logger = productionLogger;
};

// unique name generator
function generateUniqueName(){
    return `${uuid()}-${Date.now()}`;
};

module.exports = {
    logger,
    generateUniqueName
};