import MeetingTable from "./components/MeetingTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MinutesChatPage from "./components/MinutesChatPage";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="h-screen flex">
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<MeetingTable />} />
            <Route path="/minutes-chat" element={<MinutesChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;

