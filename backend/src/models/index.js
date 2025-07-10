const Meeting = require("./meeting.model");
const MeetingMinutes = require("./meetingminutes.model");
const GeminiChat = require("./geminichats.model");

Meeting.hasOne(MeetingMinutes, {
  foreignKey: "meetingId",
  onDelete: "CASCADE",
  hooks: true,
});
MeetingMinutes.belongsTo(Meeting, {
  foreignKey: "meetingId",
  onDelete: "CASCADE",
});

Meeting.hasOne(GeminiChat, {
  foreignKey: "meetingId",
  onDelete: "CASCADE",
  hooks: true,
});
GeminiChat.belongsTo(Meeting, { foreignKey: "meetingId", onDelete: "CASCADE" });

module.exports = {
  Meeting,
  MeetingMinutes,
  GeminiChat,
};
