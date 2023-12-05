const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB_NAME
});

module.exports = pool;