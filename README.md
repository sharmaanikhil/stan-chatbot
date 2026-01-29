# STAN Conversational Agent

This project is a human-like conversational chatbot built. 
The chatbot is designed to have natural conversations, remember users over time, and remain reliable even when the LLM is unavailable.

---

## What this project does

- Allows users to chat with a conversational agent
- Stores user-specific memory (name, preferences)
- Uses an LLM for response generation
- Falls back to memory-aware local logic when the LLM is rate-limited

---

## How it works

The application follows a simple client–server architecture:

- The **frontend** provides a chat interface and sends user messages to the backend.
- The **backend** processes messages, manages memory, and generates responses.
- **MongoDB** is used to persist user memory and conversation history.
- The assistant recalls information only if it was explicitly shared by the user.

---

## Project Structure
stan-chatbot/
├── backend/ # Node.js + Express API
└── frontend/ # React chat interface


---

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB Atlas
- LLM: Google Gemini
- Deployment: Vercel (frontend), Render (backend)

---

## Setup Instructions

### Backend

```bash
cd backend
npm install
node src/index.js

Create a .env file inside backend:
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key

### Frontend
cd frontend
npm install
npm start
