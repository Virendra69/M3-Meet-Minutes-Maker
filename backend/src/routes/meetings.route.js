const express = require("express");
const router = express.Router();

const meetingController = require("../controllers/meeting.controller");

router.post("/save-meeting", meetingController.captureText);
router.get("/meetings", meetingController.getAllMeetings);
router.post("/generate-minutes", meetingController.generateMinutes);
router.post("/save-minutes", meetingController.saveMinutes);
router.get("/get-minutes", meetingController.getMinutes);

module.exports = router;
