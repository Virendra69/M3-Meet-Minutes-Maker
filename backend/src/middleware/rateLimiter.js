const rateLimit = require("express-rate-limit");

// Rate limiter for Gemini AI endpoints
// Allows 10 requests per minute per IP
const geminiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests to AI endpoints. Please try again after a minute.",
  },
});

module.exports = { geminiLimiter };
