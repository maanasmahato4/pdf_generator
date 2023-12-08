const joi = require("joi");
const { BAD_REQUEST_EXCEPTION } = require("../constants/exception.constant");

const pdf_schema = joi.object({
    title: joi.string().required(),
    body: joi.string().required(),
    conclusion: joi.string().required()
});

const user_schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

function pdf_validator(request, response, next) {
    try {
        const { value, error, warning } = pdf_schema.validate(request.body);
        if (error) {
            return response.status(400).json({ error: BAD_REQUEST_EXCEPTION, message: error.message })
        };
        next();
    } catch (error) {
        return response.sendStatus(500);
    };
};

function user_validator(request, response, next) {
    try {
        const { value, error, warning } = user_schema.validate(request.body);
        if (error) {
            return response.status(400).json({ error: BAD_REQUEST_EXCEPTION, message: error.message });
        };
        next();
    } catch (error) {
        return response.sendStatus(500);
    };
};

module.exports = { pdf_validator, user_validator};