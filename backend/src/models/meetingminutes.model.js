// models/MeetingMinutes.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const MeetingMinutes = sequelize.define(
  "MeetingMinutes",
  {
    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      forignKey: true,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = MeetingMinutes;
