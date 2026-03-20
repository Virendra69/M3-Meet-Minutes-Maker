const express = require("express"); // Import Express framework
const app = express(); // Create Express app instance
const router = require("./routes/meetings.route"); // Import API routes
const cors = require("cors"); // Import CORS middleware
const morgan = require("morgan"); // Import HTTP request logger
const errorHandler = require("./middleware/errorHandler"); // Import global error handler

const db = require("./config/db"); // Import database configuration

db.connectDb(); // Connect to the database

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests (built-in Express 5)
app.use(morgan("dev")); // Log HTTP requests in dev format

// API Router
app.use("/api", router); // Mount API routes under '/api' path

// Global Error Handler (must be registered after all routes)
app.use(errorHandler);

module.exports = app; // Export the app instance
