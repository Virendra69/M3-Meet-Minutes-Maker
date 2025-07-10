const express = require("express");
const router = express.Router();

const meetingController = require("../controllers/meeting.controller");

router.post("/save-meeting", meetingController.captureText);
router.get("/meetings", meetingController.getAllMeetings);
router.post("/generate-minutes", meetingController.generateMinutes);
router.post("/save-minutes", meetingController.saveMinutes);
router.get("/get-minutes", meetingController.getMinutes);
router.post("/ask-gemini-about-minutes", meetingController.askGeminiAboutMinutes);
router.post("/save-chat", meetingController.saveChat);
router.get("/get-chats", meetingController.getChats);

module.exports = router;
