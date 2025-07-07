const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Meeting = sequelize.define(
  "Meeting",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meetUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    captions: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    chat: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Meeting;
