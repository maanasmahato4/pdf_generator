// Importing router from expressjs and initializing it. 
const router = require("express").Router();
// Rate limiter
const { limiter } = require("../middlewares/rate_limiter.middleware");
// Controller functions for the pdf api
const { getAllFiles, generateNewPdf } = require("../controllers");


router
    .get("/", limiter(2 * 60 * 1000, 50), getAllFiles)
    .post("/", limiter(60 * 1000, 20), generateNewPdf);


module.exports = router;