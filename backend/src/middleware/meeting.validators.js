const { body, query, validationResult } = require("express-validator");

// Middleware to check validation results and return 400 if errors exist
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const captureTextValidation = [
  body("userId").notEmpty().withMessage("userId is required"),
  body("meetUrl").notEmpty().withMessage("meetUrl is required"),
  validate,
];

const generateMinutesValidation = [
  body("captions").isArray().withMessage("captions must be an array"),
  body("chat").isArray().withMessage("chat must be an array"),
  validate,
];

const saveMinutesValidation = [
  body("meetingId").notEmpty().withMessage("meetingId is required"),
  body("content").notEmpty().withMessage("content is required"),
  validate,
];

const askGeminiValidation = [
  body("question").notEmpty().withMessage("question is required"),
  body("minutes").notEmpty().withMessage("minutes are required"),
  validate,
];

const saveChatValidation = [
  body("meetingId").notEmpty().withMessage("meetingId is required"),
  body("role")
    .isIn(["user", "gemini"])
    .withMessage("role must be 'user' or 'gemini'"),
  body("message").notEmpty().withMessage("message is required"),
  validate,
];

const getMinutesValidation = [
  query("meetingId").notEmpty().withMessage("meetingId query param is required"),
  validate,
];

const getChatsValidation = [
  query("meetingId").notEmpty().withMessage("meetingId query param is required"),
  validate,
];

module.exports = {
  captureTextValidation,
  generateMinutesValidation,
  saveMinutesValidation,
  askGeminiValidation,
  saveChatValidation,
  getMinutesValidation,
  getChatsValidation,
};
