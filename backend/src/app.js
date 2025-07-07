const express = require("express"); // Import Express framework
const app = express(); // Create Express app instance
const router = require("./routes/meetings.route"); // Import API routes
const bodyParser = require("body-parser"); // Import body-parser middleware
const cors = require("cors"); // Import CORS middleware

const db = require("./config/db"); // Import database configuration

db.connectDb(); // Connect to the database

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON requests

// API Router
app.use("/api", router); // Mount API routes under '/api' path

module.exports = app; // Export the app instance
