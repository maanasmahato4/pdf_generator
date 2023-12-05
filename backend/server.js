// Enabling environment variables
require("dotenv");

// Third party libraries
const express = require("express");
const cors = require("cors");

// Custom modules
const corsOptions = require("./utils/cors.options");
const errorHandler = require("./utils/errorHandler");

// Initializing app
const app = express();

// Middlewares
app.use(cors(corsOptions));



// Error Handler
app.use(errorHandler);

// Running the server
app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
})
