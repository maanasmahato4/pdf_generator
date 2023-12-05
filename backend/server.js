// Enabling environment variables
require("dotenv").config();

// Third party libraries
const express = require("express");
const cors = require("cors");

// Custom
const corsOptions = require("./utils/cors.options");
const errorHandler = require("./utils/errorHandler");
const pool = require("./database/database");

// Initializing app
const app = express();

async function testDatabaseConnection() {
    try {
      // Get a client from the pool
      const client = await pool.connect();
  
      // Use the client to query the database
      const result = await client.query('SELECT NOW() as current_time');
  
      // Release the client back to the pool
      client.release();
  
      // Log the result or perform any necessary actions
      console.log('Current time from the database:', result.rows[0].current_time);
      
      return true; // Indicates successful connection and query execution
    } catch (error) {
      // Log and handle any errors that occur during the process
      console.error('Error occurred while testing database connection:', error);
      return false; // Indicates failure in connecting or executing query
    }
  }
  
  // Call the function to test the database connection
  testDatabaseConnection();

// Middlewares
app.use(cors(corsOptions));
app.use("/api", require("./routes"));



// Error Handler
app.use(errorHandler);

// Running the server
app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
})
