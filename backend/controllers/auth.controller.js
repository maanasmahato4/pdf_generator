const { logger } = require("../utils/utilityFunctions");
const { INTERNAL_SERVER_EXCEPTION, NOT_FOUND_EXCEPTION } = require("../constants/exception.constant");
const createTable = require("../utils/createTable");
const pool = require("../database/database");

async function register(request, response) {
    try {
        const { email, password } = request.body;
        await createTable('pdf-auth');
        const userExist = await pool.query();
    } catch (error) {
        logger('POST /api/auth/register', error);
        return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: error.message });
    };
};

async function signin(request, response) {
    try {

    } catch (error) {
        logger('POST /api/auth/signin', error);
        return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: error.message });
    };
};

async function signout(request, response) {
    try {

    } catch (error) {
        logger('POST /api/auth/signout', error);
        return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: error.message });
    };
};

async function emailVerification(request, response) {
    try {

    } catch (error) {
        logger('POST /api/auth/verification', error);
        return response.status(500).json({ error: INTERNAL_SERVER_EXCEPTION, message: error.message });
    };
};