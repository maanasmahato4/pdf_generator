// Enabling environment variables
require("dotenv").config();

// Third party libraries
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Custom
const corsOptions = require("./utils/cors.options");
const errorHandler = require("./utils/errorHandler");
const testDatabaseConnection = require("./database/database.connection");

// Initializing app
const app = express();

// Call the function to test the database connection
testDatabaseConnection();

// serve static files
app.use(express.static("uploads"));

// Middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use("/api", require("./routes"));



// Error Handler
app.use(errorHandler);

// Running the server
app.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
})
