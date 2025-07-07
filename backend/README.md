# Backend

This directory contains the server-side code for the Meet Minute Maker application, built using Node.js and Express.

## Directory Structure

- `config`: Configuration files for the application
  - `db.js`: Database configuration
- `controllers`: Controller functions for handling requests
  - `meeting.controller.js`: Handles meeting data and generates minutes
- `models`: Database models for the application
  - `meeting.model.js`: Meeting data model
  - `meetingminutes.model.js`: Meeting minutes data model
- `routes`: API routes for the application
  - `meetings.route.js`: Handles meeting data requests
- `src`: Source code for the application
  - `app.js`: Main application file
  - `index.js`: Entry point for the application

## Key Components

- `meeting.controller.js`: Handles meeting data and generates minutes
- `meeting.model.js`: Meeting data model
- `meetingminutes.model.js`: Meeting minutes data model

## Setup and Installation

1. Install dependencies using `npm install` or `yarn install`
2. Set up the MySQL database using the `sequelize` CLI
3. Start the server using `npm run dev` or `yarn dev`

## API Endpoints

- `POST /api/save-meeting`: Saves meeting data
- `GET /api/meetings`: Retrieves meeting data
- `POST /api/generate-minutes`: Generates meeting minutes
- `POST /api/save-minutes`: Saves meeting minutes
- `GET /api/get-minutes`: Retrieves meeting minutes

## Contributing

Contributions are welcome! Please submit issues and pull requests to the repository.
