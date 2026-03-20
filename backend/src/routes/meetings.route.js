const express = require("express");
const router = express.Router();

const meetingController = require("../controllers/meeting.controller");
const {
  captureTextValidation,
  generateMinutesValidation,
  saveMinutesValidation,
  askGeminiValidation,
  saveChatValidation,
  getMinutesValidation,
  getChatsValidation,
} = require("../middleware/meeting.validators");
const { geminiLimiter } = require("../middleware/rateLimiter");

router.post("/save-meeting", captureTextValidation, meetingController.captureText);
router.get("/meetings", meetingController.getAllMeetings);
router.post("/generate-minutes", geminiLimiter, generateMinutesValidation, meetingController.generateMinutes);
router.post("/save-minutes", saveMinutesValidation, meetingController.saveMinutes);
router.get("/get-minutes", getMinutesValidation, meetingController.getMinutes);
router.post("/ask-gemini-about-minutes", geminiLimiter, askGeminiValidation, meetingController.askGeminiAboutMinutes);
router.post("/save-chat", saveChatValidation, meetingController.saveChat);
router.get("/get-chats", getChatsValidation, meetingController.getChats);

module.exports = router;
