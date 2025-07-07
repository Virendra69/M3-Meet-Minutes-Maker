const Meeting = require("../models/meeting.model");
const MeetingMinutes = require("../models/meetingminutes.model");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const captureText = async (req, res) => {
  const { userId, meetUrl, title, captions, chat } = req.body;

  try {
    const existing = await Meeting.findOne({ where: { userId, meetUrl } });

    if (existing) {
      // Append new captions/chat
      existing.captions = JSON.stringify([
        ...(existing.captions ? JSON.parse(existing.captions) : []),
        ...(captions || []),
      ]);

      existing.chat = JSON.stringify([
        ...(existing.chat ? JSON.parse(existing.chat) : []),
        ...(chat || []),
      ]);
      await existing.save();
      return res.json({ message: "Updated existing meeting" });
    }

    await Meeting.create({
      userId,
      meetUrl,
      title,
      captions: JSON.stringify(captions || []),
      chat: JSON.stringify(chat || []),
    });

    res.json({ message: "Meeting data saved" });
  } catch (err) {
    console.error("DB save error:", err);
    res.status(500).json({ error: "Failed to save meeting data" });
  }
};

const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.findAll({
      order: [["createdAt", "DESC"]],
    });
    const parsedMeetings = meetings.map((m) => ({
      ...m.toJSON(),
      captions: m.captions ? JSON.parse(m.captions) : [],
      chat: m.chat ? JSON.parse(m.chat) : [],
    }));
    res.json({ success: true, meetings: parsedMeetings });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const generateMinutes = async (req, res) => {
  try {
    const { captions, chat } = req.body;

    if (!Array.isArray(captions) || !Array.isArray(chat)) {
      return res
        .status(400)
        .json({ error: "captions and chat must be arrays" });
    }

    const combinedText = `
      These are the captions from the meeting:
      ${captions.join("\n")}

      These are the chat messages:
      ${chat.join("\n")}

      Please summarize the meeting and highlight key discussion points, decisions made, and action items.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: combinedText,
    });
    const minutes = response.text;

    res.json({ minutes });
  } catch (error) {
    console.error("❌ Gemini error:", error);
    res.status(500).json({ error: "Failed to generate meeting minutes" });
  }
};

const saveMinutes = async (req, res) => {
  try {
    const { meetingId, content } = req.body;

    if (!meetingId || !content) {
      return res
        .status(400)
        .json({ error: "meetingId and content are required" });
    }

    const existing = await MeetingMinutes.findOne({ where: { meetingId } });

    if (existing) {
      return res
        .status(409)
        .json({ error: "Minutes already exist for this meeting" });
    }

    const saved = await MeetingMinutes.create({ meetingId, content });

    res
      .status(201)
      .json({ message: "Minutes saved successfully", minutes: saved });
  } catch (err) {
    console.error("Error saving minutes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMinutes = async (req, res) => {
  try {
    const { meetingId } = req.query;
    const minutes = await MeetingMinutes.findOne({ where: { meetingId } });

    if (!minutes) {
      return res
        .status(404)
        .json({ message: "No minutes found for this meeting" });
    }

    res.json({ minutes: minutes.content });
  } catch (err) {
    console.error("Error fetching minutes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  captureText,
  getAllMeetings,
  generateMinutes,
  saveMinutes,
  getMinutes,
};
