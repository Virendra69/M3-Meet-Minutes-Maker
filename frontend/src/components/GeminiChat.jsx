import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const GeminiChat = ({ minutes, meetingId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Fetch past chats on mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get-chats/?meetingId=${meetingId}`
        );
        if (res.data.success) {
          const chatMessages = res.data.chats.map((msg) => ({
            role: msg.role,
            text: msg.message,
          }));
          setMessages(chatMessages);
        }
      } catch (err) {
        console.error("Error loading chat history:", err);
      }
    };

    fetchChats();
  }, [meetingId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ask-gemini-about-minutes",
        {
          minutes,
          question: input,
        }
      );

      const reply = res.data.answer;
      const updatedMessages = [...newMessages, { role: "gemini", text: reply }];
      setMessages(updatedMessages);

      // Save user and Gemini messages to DB
      await axios.post("http://localhost:5000/api/save-chat", {
        meetingId,
        role: "user",
        message: input,
      });

      await axios.post("http://localhost:5000/api/save-chat", {
        meetingId,
        role: "gemini",
        message: reply,
      });
    } catch (err) {
      console.error("Error during Gemini response:", err);
      setMessages([
        ...newMessages,
        { role: "gemini", text: "Error getting response." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col p-4 overflow-hidden">
      {/* Chat Window (fixed height, scrollable) */}
      <div className="flex-1 min-h-0 overflow-y-auto border rounded p-3 bg-gray-50 mb-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded max-w-xl whitespace-pre-wrap ${
                msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {msg.role === "gemini" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-left mb-3">
            <span className="inline-block px-4 py-2 bg-gray-200 rounded animate-pulse">
              Gemini is typing...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border rounded px-3 py-2"
          placeholder="Ask something about the minutes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
          }`}
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default GeminiChat;
