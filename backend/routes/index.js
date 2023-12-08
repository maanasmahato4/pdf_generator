// Importing router from expressjs and initializing it. 
const router = require("express").Router();

// Middlewares
const { limiter } = require("../middlewares/rate_limiter.middleware"); // Rate limiter
const { pdf_validator, user_validator } = require("../middlewares/validator"); // data validator

// Controller functions for the pdf api
const { getAllFiles, downloadpdf, generateNewPdf } = require("../controllers/pdf.controller");


router
    .get("/", limiter(2 * 60 * 1000, 50), getAllFiles)
    .get("/download/:id", limiter(60 * 1000, 5), downloadpdf)
    .post("/", pdf_validator, limiter(60 * 1000, 20), generateNewPdf);


module.exports = router;