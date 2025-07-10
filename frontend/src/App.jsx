import MeetingTable from "./components/MeetingTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MinutesChatPage from "./components/MinutesChatPage";

function App() {
  return (
    <div className="h-screen flex">
      <Router>
        <Routes>
          <Route path="/" element={<MeetingTable />} />
          <Route path="/minutes-chat" element={<MinutesChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
