// Importing router from expressjs and initializing it. 
const router = require("express").Router();

// Middlewares
const { limiter } = require("../middlewares/rate_limiter.middleware"); // Rate limiter
const { validator } = require("../middlewares/validator"); // data validator

// Controller functions for the pdf api
const { getAllFiles, downloadpdf, generateNewPdf } = require("../controllers");


router
    .get("/", limiter(2 * 60 * 1000, 50), getAllFiles)
    .get("/download/:id", limiter(60 * 1000, 5), downloadpdf)
    .post("/", limiter(60 * 1000, 20), generateNewPdf);


module.exports = router;