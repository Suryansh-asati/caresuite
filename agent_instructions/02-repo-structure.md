# Repository Structure

A monorepo layout combining frontend (React) and backend (Node.js) to manage the merged application.

```text
caresuite/
├── backend/
│   ├── models/
│   │   └── ...                 # Mongoose/Supabase models (User, MoodEntry, etc.)
│   ├── routes/
│   │   ├── users.js            # User auth routes (/signup, /login)
│   │   ├── moods.js            # Mood routes (/api/moods)
│   │   ├── journal.js          # Journal routes (/api/journal)
│   │   ├── workouts.js         # Workout routes (/api/workouts)
│   │   └── chat.js             # Chatbot AI routes (/api/chat)
│   └── server.js               # Express app entry point
├── frontend/
│   ├── public/                 # Static assets (images, fonts)
│   └── src/
│       ├── components/         # Reusable UI (Navbar, Footer, etc.)
│       ├── pages/
│       │   ├── Mood.jsx        # Mood Tracker
│       │   ├── Journal.jsx     # Journal
│       │   ├── Fitness.jsx     # Fitness Tracker
│       │   ├── Audio.jsx       # Audio Therapy
│       │   ├── Yoga.jsx        # Yoga Therapy
│       │   ├── Laugh.jsx       # Laughing Therapy
│       │   ├── Education.jsx   # Educational Resources
│       │   ├── Game.jsx        # Mindfulness Game
│       │   ├── Chatbot.jsx     # AI Chatbot Interface
│       │   ├── Login.jsx       # Login form
│       │   └── Signup.jsx      # Signup form
│       ├── services/
│       │   └── api.js          # Axios/Fetch helpers for backend calls
│       └── App.jsx             # Root React component (Router and Layout)
```