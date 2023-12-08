const { rateLimit } = require("express-rate-limit");

function limiter(interval, limit) {
    return rateLimit({
        windowMs: interval != null ? interval : 60 * 1000,
        limit: limit != null ? limit : 10,
        standardHeaders: true,
        legacyHeaders: false
    });
};


module.exports = {limiter};