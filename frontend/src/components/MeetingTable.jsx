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
      <div className="text-center text-lg font-medium text-gray-600">
        Loading meetings...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-4xl font-semibold text-center mb-6 text-black">
        Meeting Records
      </h2>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
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
                  {meeting.captions.length}
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
    </div>
  );
};

export default MeetingTable;
