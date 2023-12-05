const pool = require("../database/database");

async function createTable(table) {
    return pool.query(`
    CREATE TABLE IF NOT EXISTS ${table} (
        id PRIMARY SERIAL KEY,
        file_path TEXT
    );
    `);
};

module.exports = createTable;