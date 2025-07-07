const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const connectDb = async () => {
  try {
    await sequelize.authenticate(); // Test the database connection
    await sequelize.sync({
      alter: true,
      // force: true 
    }); // Sync models with DB, altering tables if needed
    console.log("DB initialized"); // Log success message
  } catch (error) {
    console.log(`Error Connecting DB: ${error}`); // Log error if connection fails
  }
};

module.exports = { sequelize, connectDb };
