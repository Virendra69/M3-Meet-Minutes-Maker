import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";

const MeetingMinutesViewer = ({ content }) => {
  const [format, setFormat] = useState("txt");

  const handleDownload = () => {
    if (!content) return;

    if (format === "pdf") {
      const element = document.createElement("div");
      element.innerHTML = `<pre>${content}</pre>`;
      html2pdf().from(element).save("meeting-minutes.pdf");
    } else {
      const blob = new Blob([content], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        format === "md" ? "meeting-minutes.md" : "meeting-minutes.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-gray-100 p-5 mt-4 rounded-lg border border-gray-300 text-black font-sans">
      <div className="prose max-w-none prose-slate">
        {content ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          <p className="italic text-gray-500">No content available.</p>
        )}
      </div>

      {content && (
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <label htmlFor="format" className="text-sm font-medium">
            Download as:
          </label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="txt">.txt</option>
            <option value="md">.md</option>
            <option value="pdf">.pdf</option>
          </select>

          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition duration-200"
          >
            ⬇️ Download Minutes
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingMinutesViewer;
