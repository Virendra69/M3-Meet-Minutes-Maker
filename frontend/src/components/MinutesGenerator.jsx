import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MinutesGenerator = ({ meetingId, captions, chat }) => {
  const [minutes, setMinutes] = useState(null); // stores minutes (either from db or Gemini)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingMinutes = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_BASE_URL
          }/get-minutes/?meetingId=${meetingId}`
        );
        const data = await res.json();
        if (res.ok && data.minutes) {
          setMinutes(data.minutes); // store it
        }
      } catch (err) {
        console.error("Error checking existing minutes:", err);
      }
    };
    checkExistingMinutes();
  }, [meetingId]);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setMinutes(null);

    let parsedCaptions = captions;
    let parsedChat = chat;

    try {
      parsedCaptions = Array.isArray(captions)
        ? captions
        : JSON.parse(captions);
      parsedChat = Array.isArray(chat) ? chat : JSON.parse(chat);
    } catch (e) {
      setError("Captions or chat data is not valid JSON.");
      setLoading(false);
      return;
    }

    if (!Array.isArray(parsedCaptions) || !Array.isArray(parsedChat)) {
      setError("Captions and chat must be arrays.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/generate-minutes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ captions: parsedCaptions, chat: parsedChat }),
        }
      );

      const data = await res.json();

      if (res.ok && data.minutes) {
        setMinutes(data.minutes);

        // Save to DB
        await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/save-minutes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ meetingId, content: data.minutes }),
        });

        // Navigate to full view
        navigate("/minutes-chat", {
          state: {
            minutes: data.minutes,
            meetingId,
          },
        });
      } else {
        setError(data.error || "Failed to generate minutes.");
      }
    } catch (err) {
      console.error("Error generating minutes:", err);
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  const handleShow = () => {
    navigate("/minutes-chat", {
      state: {
        minutes,
        meetingId,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {minutes ? (
        <button
          onClick={handleShow}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-fit cursor-pointer"
        >
          Show Minutes
        </button>
      ) : (
        <button
          onClick={handleGenerate}
          className={`cursor-pointer px-4 py-2 text-white rounded w-fit ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Minutes"}
        </button>
      )}

      {error && (
        <div className="text-red-600 border border-red-200 bg-red-50 px-3 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default MinutesGenerator;
