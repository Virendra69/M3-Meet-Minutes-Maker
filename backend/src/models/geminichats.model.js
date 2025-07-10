// models/GeminiChat.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const GeminiChat = sequelize.define(
  "GeminiChat",
  {
    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    role: {
      type: DataTypes.ENUM("user", "gemini"),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = GeminiChat;
