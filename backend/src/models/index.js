const Meeting = require("./meeting.model");
const MeetingMinutes = require("./meetingminutes.model");

Meeting.hasOne(MeetingMinutes, { foreignKey: "meetingId" });
MeetingMinutes.belongsTo(Meeting, { foreignKey: "meetingId" });

module.exports = { 
    Meeting,
    MeetingMinutes
 };
