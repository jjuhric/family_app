# Family Application

A multi-feature web application designed to help families stay organized and connected. This is an ongoing project with new features being added over time.

## Features

### Implemented
*   **Chat:** A real-time chat application for family members to communicate.
*   **Recipe Book:** A section to store, view, and manage family recipes.
*   **Task List:** A shared task list to keep track of chores and to-dos, integrated into the main chat interface.

### Planned
*   Calendar
*   Photo Album
*   Budgeting Tool

## How to Run

This project consists of a Node.js/Express backend and a React frontend.

### Backend
1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory with the necessary environment variables (e.g., `PORT`, `MONGO_DB_URI`, `JWT_SECRET`).
4.  Start the backend server:
    ```bash
    npm run server
    ```

### Frontend
1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:3000`.

## Acknowledgements

This project was originally adapted from burakorkmez/fullstack-chat-app.
