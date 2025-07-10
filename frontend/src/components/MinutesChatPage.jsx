import { useLocation } from "react-router-dom";
import { useState } from "react";
import MeetingMinutesViewer from "./MeetingMinutesViewer";
import GeminiChat from "./GeminiChat";

const MinutesChatPage = () => {
  const location = useLocation();
  const { minutes, meetingId } = location.state || {};
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
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
