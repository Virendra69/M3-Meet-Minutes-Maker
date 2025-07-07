# Meet Minute Maker

Meet Minute Maker is a Chrome extension designed to capture Google Meet captions and chat. The extension aims to provide a convenient way to generate meeting minutes by summarizing the discussion and highlighting key points.

## Features

- Captures Google Meet captions and chat in real-time
- Generates meeting minutes by summarizing the discussion and highlighting key points
- Allows users to download meeting minutes as a PDF or text file

## Technical Details

- Built using Chrome extension APIs and JavaScript
- Utilizes the `html2pdf.js` library for generating PDFs
- Employs the `@google/genai` library for natural language processing and text summarization
- Stores meeting data in a MySQL database using Sequelize ORM

## Directory Structure

- `backend`: Node.js server-side code for handling meeting data and generating minutes
- `frontend`: React-based client-side code for the Chrome extension popup and meeting minutes viewer
- `chrome-extension`: Chrome extension code, including the manifest file, content script, and icons

## Key Components

- [MeetingMinutesViewer](cci:1://file:///d:/VS%20Code%20Programs/ALT/M3%20-%20Meet%20Minute%20Maker/frontend/src/components/MeetingMinutesViewer.jsx:4:0-66:2): A React component for displaying meeting minutes
- `MinutesGenerator`: A React component for generating meeting minutes
- `meeting.controller.js`: A Node.js controller for handling meeting data and generating minutes
- `content.js`: A Chrome extension content script for capturing Google Meet captions and chat

## Setup and Installation

1. Clone the repository to your local machine
2. Install dependencies using `npm install` or `yarn install`
3. Set up the MySQL database using the `sequelize` CLI
4. Build the Chrome extension using `npm run build` or `yarn build`
5. Load the unpacked extension in Chrome by going to `chrome://extensions/`, enabling developer mode, and selecting the `chrome-extension` directory

## Contributing

Contributions are welcome! Please submit issues and pull requests to the repository.
