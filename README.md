"todo app for Kaushalam"
# Todo List Application with Google Authentication

This is a Todo List application that allows users to authenticate with their Google account and manage their tasks. The app features task creation, editing, deletion, and task completion management. It uses React for the frontend, Firebase for Google authentication, and a Node.js/Express backend with MongoDB for data persistence.

## Features

- **Google Authentication**: Users can log in and out using their Google account through Firebase authentication.
- **Task Management**: Create, edit, delete, and mark tasks as completed.
- **Responsive Design**: The application is responsive and works across devices of different screen sizes.
- **MongoDB**: Tasks are stored and fetched from MongoDB.
- **Single Repo Setup**: Both the backend and frontend run from the same project folder, using one command.

## Tech Stack

### Frontend:
- **React**: Component-based UI framework.
- **Firebase**: Google authentication using Firebase Auth.
- **Axios**: For making HTTP requests to the backend.
- **CSS**: Styled using TailwindCSS and custom CSS.

### Backend:
- **Node.js & Express**: REST API for handling tasks.
- **MongoDB**: Task persistence and data management.
- **Mongoose**: For MongoDB object modeling.


## Getting Started

### Prerequisites

- **Node.js**: You should have Node.js installed on your system.
- **MongoDB**: A MongoDB instance running locally or remotely (e.g., MongoDB Atlas).

### Environment Variables

You will need two `.env` files: one for the **frontend** and one for the **backend**. These files store sensitive API keys and database connections.

### frontend

cd frontend
npm start

### backend 

cd backend
nodemon server.js
