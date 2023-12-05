const winston = require("winston");
const { printf, combine, timestamp, label, errors } = winston.format;

const devLogFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${message}\n${stack}`;
});

const prodLogFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const developmentLogger = winston.createLogger({
    level: "info",
    format: combine(
        label({ label: "development logger" }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        devLogFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ dirname: "logs", filename: "devLog.log" })
    ]
});

const productionLogger = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: "production logger" }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        prodLogFormat
    ),
    transports: [
        new winston.transports.File({ dirname: "logs", filename: 'prodLog.log' })
    ]
});

module.exports = {
    developmentLogger,
    productionLogger
};