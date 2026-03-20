import { useEffect, useState } from "react";
import axios from "axios";
import MinutesGenerator from "./MinutesGenerator";

const safeParse = (data) => {
  try {
    return Array.isArray(data) ? data : JSON.parse(data);
  } catch {
    return [];
  }
};

const MeetingTable = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/meetings`)
      .then((res) => {
        setMeetings(res.data.meetings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching meetings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pb-12 w-full">
        <header className="sticky top-0 z-10 bg-white shadow-md py-4 px-6 border-b border-slate-200">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-700 flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/18366/18366442.png"
                alt="Meet Minute Maker Logo"
                width={20}
                className="mr-2"
              />
              <p>Meet Minute Maker</p>
            </h1>
            <p className="text-sm text-gray-500">
              Your meeting summaries & insights hub
            </p>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 mt-10">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 py-4 border-b border-slate-100 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-12 w-full">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md py-4 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/18366/18366442.png"
              alt="Meet Minute Maker Logo"
              width={20}
              className="mr-2"
            />
            <p>Meet Minute Maker</p>
          </h1>
          <p className="text-sm text-gray-500">
            Your meeting summaries & insights hub
          </p>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-3xl font-semibold text-center text-black mb-2">
          Meeting Records
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Access your meeting data, generate summaries, and chat with Gemini.
        </p>

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse" aria-label="Meetings list">
            <thead>
              <tr className="bg-slate-50 text-black">
                <th className="p-4 text-left font-semibold border-b border-slate-200">
                  Title
                </th>
                <th className="p-4 text-left font-semibold border-b border-slate-200">
                  URL
                </th>
                <th className="p-4 text-left font-semibold border-b border-slate-200">
                  Captions
                </th>
                <th className="p-4 text-left font-semibold border-b border-slate-200">
                  Chats
                </th>
                <th className="p-4 text-left font-semibold border-b border-slate-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr
                  key={meeting.id}
                  className="hover:bg-slate-100 text-black transition-colors"
                >
                  <td className="p-4 border-b border-slate-200 align-top">
                    {meeting.title}
                  </td>
                  <td className="p-4 border-b border-slate-200 align-top">
                    <a
                      href={meeting.meetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {meeting.meetUrl}
                    </a>
                  </td>
                  <td className="p-4 border-b border-slate-200 align-top">
                    {meeting.captions.length == 0
                      ? "-"
                      : meeting.captions.length}
                  </td>
                  <td className="p-4 border-b border-slate-200 align-top">
                    {meeting.chat.length}
                  </td>
                  <td className="p-4 border-b border-slate-200 align-top">
                    <MinutesGenerator
                      meetingId={meeting.id}
                      captions={safeParse(meeting.captions)}
                      chat={safeParse(meeting.chat)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MeetingTable;
