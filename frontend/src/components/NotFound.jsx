import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-50 w-full">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-200"
        >
          ← Back to Meetings
        </button>
      </div>
    </div>
  );
};

export default NotFound;
