const { logger } = require("../utils/utilityFunctions");
const pool = require("./database");

async function testDatabaseConnection() {
    try {
        const clientConnection = await pool.connect();
        const result = await clientConnection.query('SELECT NOW() as current_time');
        clientConnection.release();
        logger.info(`Current time from the database: ${result.rows[0].current_time}`, "");
        return true;
    } catch (error) {
        logger.error("Error connecting to database. \n", error);
        return false;
    };
};


module.exports = testDatabaseConnection;