# CareSuite

CareSuite is a comprehensive mental and physical wellness platform. It merges the features of CareSuite-Web and Well-Being-Hub into a modern, unified architecture.

## Features

### Core Tracking
* **Mood Tracker**: Select daily moods, write detailed notes, and view analytical mood history chronologically.
* **Personal Journal**: Write titled journal entries, tag them, and retrieve comprehensive historical journals.
* **Fitness Tracking**: Log specific physical exercises including workout types, durations, and intensity. Track historical steps and calories.

### Curated Therapies
* **Audio Therapy**: A hub for streaming curated audio content such as peaceful music playlists, mood-focused podcasts, and engaging audiobooks.
* **Yoga Therapy**: Step-by-step instructions accompanied by videos for therapeutic yoga poses.
* **Laughing Therapy**: Access to a feed of memes and humorous videos specifically chosen for mood enhancement.
* **Educational Resources**: Content pages spanning topics of hygiene, general science, and creative arts/crafts.
* **Mindfulness Game**: An interactive positive-thinking maze game.
* **AI Chatbot**: An interactive AI-powered conversational agent providing responsive well-being guidance and support.

## Tech Stack
* **Frontend**: React, TailwindCSS/Bootstrap
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (via Mongoose) or Supabase (serverless Postgres)
* **Authentication**: JSON Web Tokens (JWT)

## Local Setup

### Prerequisites
Ensure environment variables are configured appropriately inside a `.env` file.

Variables:
```sh
DB_URI="mongodb+srv://..."
JWT_SECRET="supersecret_dev_key"
HEROKU_API_KEY="optional_for_actions"
```

### Frontend Setup
```sh
cd caresuite-frontend
npm install
npm start
```

### Backend Setup
```sh
cd caresuite-backend
npm install
npm run start
```

## Documentation
For more detailed information regarding the architecture, database schemas, API contracts, and CI/CD pipelines, please refer to the `agent_instructions` folder.