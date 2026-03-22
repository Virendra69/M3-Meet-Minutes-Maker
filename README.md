# M3 — Meet Minutes Maker

A full-stack application with a Chrome extension that captures Google Meet captions and chat in real-time, generates AI-powered meeting minutes using the **Gemini API**, and lets you interactively ask questions about your meetings through a built-in **Gemini Chat**.

## ✨ Features

- **Real-time Caption & Chat Capture** — Chrome extension automatically records captions and chat messages during Google Meet sessions
- **AI-Powered Minutes Generation** — Generates structured meeting minutes (summaries, key points, action items) using the Gemini API
- **Interactive Gemini Chat** — Ask follow-up questions about your meeting minutes in a dedicated chat interface with persistent chat history
- **PDF & Text Export** — Download meeting minutes as PDF or text files using `html2pdf.js`
- **Meeting Dashboard** — View, manage, and search all your recorded meetings in a responsive table
- **Split-View Interface** — Side-by-side view of meeting minutes and Gemini Chat for seamless interaction
- **Error Handling** — Graceful error recovery with `ErrorBoundary` and a custom 404 page
- **Docker Support** — One-command deployment with Docker Compose

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Chrome Extension** | Manifest V3, Content Scripts, Chrome Storage API |
| **Frontend** | React 19, Vite 7, TailwindCSS v4, React Router v7, Axios, React Markdown |
| **Backend** | Node.js, Express 5, Sequelize ORM (MySQL), Mongoose (MongoDB) |
| **AI** | Google Gemini API (`@google/genai`) |
| **Middleware** | CORS, Morgan, Rate Limiter (`express-rate-limit`), Input Validation (`express-validator`), Global Error Handler |
| **DevOps** | Docker, Docker Compose |

## 📁 Directory Structure

```
M3-Meet-Minutes-Maker/
├── chrome-extension/          # Chrome extension (Manifest V3)
│   ├── content.js             # Content script for capturing captions & chat
│   ├── manifest.json          # Extension manifest
│   └── icons/                 # Extension icons
│
├── frontend/                  # React SPA (Vite + TailwindCSS)
│   └── src/
│       ├── App.jsx            # Root component with routing
│       └── components/
│           ├── MeetingTable.jsx          # Meeting dashboard / list view
│           ├── MinutesGenerator.jsx      # AI minutes generation UI
│           ├── MeetingMinutesViewer.jsx  # Rendered minutes display
│           ├── MinutesChatPage.jsx       # Split-view: minutes + Gemini chat
│           ├── GeminiChat.jsx            # Interactive Gemini Q&A chat
│           ├── ErrorBoundary.jsx         # Global error boundary
│           └── NotFound.jsx             # 404 page
│
├── backend/                   # Node.js / Express API server
│   ├── server.js              # Server entry point
│   └── src/
│       ├── app.js             # Express app setup & middleware
│       ├── config/
│       │   └── db.js          # Database configuration
│       ├── controllers/
│       │   └── meeting.controller.js   # Request handlers
│       ├── models/
│       │   ├── meeting.model.js        # Meeting data model
│       │   ├── meetingminutes.model.js  # Meeting minutes model
│       │   └── geminichats.model.js    # Gemini chat history model
│       ├── routes/
│       │   └── meetings.route.js       # API route definitions
│       └── middleware/
│           ├── errorHandler.js         # Global error handler
│           ├── rateLimiter.js          # Rate limiting for AI endpoints
│           └── meeting.validators.js   # Input validation rules
│
└── docker-compose.yml         # Multi-container Docker setup
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/save-meeting` | Save captured meeting data (captions & chat) |
| `GET` | `/api/meetings` | Retrieve all meetings |
| `POST` | `/api/generate-minutes` | Generate AI meeting minutes via Gemini |
| `POST` | `/api/save-minutes` | Save generated meeting minutes |
| `GET` | `/api/get-minutes` | Retrieve minutes for a specific meeting |
| `POST` | `/api/ask-gemini-about-minutes` | Ask Gemini a question about meeting minutes |
| `POST` | `/api/save-chat` | Save a Gemini chat message |
| `GET` | `/api/get-chats` | Retrieve chat history for a meeting |

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **MySQL** database
- **Google Gemini API Key** — [Get one here](https://ai.google.dev/)
- **Docker & Docker Compose** (optional, for containerized deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/Virendra69/M3-Meet-Minutes-Maker.git
cd M3-Meet-Minutes-Maker
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file at `backend/src/config/.env` using the sample:

```env
DB_HOST="your_db_host"
DB_PORT="your_db_port"
DB_USER="your_db_user"
DB_PASSWORD="your_db_password"
DB_NAME="your_db_name"

GEMINI_API_KEY="your_gemini_api_key"
```

Start the backend:

```bash
npm run dev
```

The server runs on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

### 4. Chrome Extension Setup

1. Open `chrome://extensions/` in Chrome
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `chrome-extension/` directory
4. Join a Google Meet — the extension will automatically start capturing captions and chat

### 5. Docker Deployment (Optional)

```bash
docker-compose up --build
```

This starts both the backend (`:5000`) and frontend (`:5173`) containers.

## 📸 Screenshots

### Meeting Dashboard

![Meeting Dashboard](/frontend/screenshots/Screenshot%202025-07-07%20114722.png)

### Generated Minutes

![Generated Minutes](/frontend/screenshots/Screenshot%202025-07-07%20114943.png)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please submit issues and pull requests to the repository.
