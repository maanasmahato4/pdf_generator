const joi = require("joi");
const { BAD_REQUEST_EXCEPTION } = require("../constants/exception.constant");

const schema = joi.object({
    title: joi.string().required(),
    body: joi.string().required(),
    conclusion: joi.string().required()
});


function validator(request, response, next) {
    try {
        const { value, error, warning } = schema.validate(request.body);
        console.log(value, error, warning);
        if (error) {
            return response.status(400).json({ error: BAD_REQUEST_EXCEPTION, message: error.message })
        };
        next();
    } catch (error) {
        return response.sendStatus(500);
    };
};

module.exports = { validator };