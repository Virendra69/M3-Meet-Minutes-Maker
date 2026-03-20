const dotenv = require("dotenv"); // Import dotenv to load environment variables from .env file
dotenv.config(); // Configure dotenv to make env variables available in process.env
const app = require("./src/app"); // Import the Express app from the src/app module
const port = process.env.PORT; // Set the port from environment or default to 3000

app.listen(port, () => {
  console.log(`Running on port ${port}`); // Log the port the server is running on
});
