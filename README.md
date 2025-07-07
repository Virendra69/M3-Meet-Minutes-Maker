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

## Screenshots

### Frontend Screenshots

#### Meeting Table

![Meetings Table](/frontend/screenshots/Screenshot%202025-07-07%20114722.png)

#### Generated Minutes

![Generated Minutes](/frontend/screenshots/Screenshot%202025-07-07%20114943.png)

## Contributing

Contributions are welcome! Please submit issues and pull requests to the repository.
