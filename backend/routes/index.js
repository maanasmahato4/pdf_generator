// Importing router from expressjs and initializing it. 
const router = require("express").Router();
// Controller functions for the pdf api
const {getAllFiles, generateNewPdf} = require("../controllers");

router
    .get("/", getAllFiles)
    .post("/", generateNewPdf);


module.exports = router;