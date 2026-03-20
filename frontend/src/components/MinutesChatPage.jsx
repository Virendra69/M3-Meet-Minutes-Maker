import { useLocation, useNavigate } from "react-router-dom";
import MeetingMinutesViewer from "./MeetingMinutesViewer";
import GeminiChat from "./GeminiChat";

const MinutesChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { minutes, meetingId } = location.state || {};

  if (!minutes || !meetingId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-lg text-gray-600">
          No meeting data available. Please select a meeting first.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-200"
        >
          ← Back to Meetings
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full transition-all duration-300">
      {/* Left Section: Minutes */}
      <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r p-4 overflow-y-auto max-h-1/2 md:max-h-screen">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
          Meeting Minutes
        </h2>
        <MeetingMinutesViewer content={minutes} />
      </div>

      {/* Right Section: Gemini Chat */}
      <div className="w-full md:w-1/2 p-4 flex flex-col max-h-1/2 md:max-h-screen">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
          Ask Gemini
        </h2>
        <GeminiChat minutes={minutes} meetingId={meetingId} />
      </div>
    </div>
  );
};

export default MinutesChatPage;

