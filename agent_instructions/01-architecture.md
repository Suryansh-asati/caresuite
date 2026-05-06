# Architecture: CareSuite-Web & Well-Being-Hub

## Tech Stack
We are rebuilding the applications as a modern, unified web app utilizing:
- **Frontend**: React (with components and JSX) substituting vanilla HTML/CSS/JS. UI styling via Tailwind or Bootstrap.
- **Backend**: Node.js with Express exposing RESTful APIs. Replaces client-side storage and PHP.
- **Database**: MongoDB (via Mongoose) or Supabase (serverless Postgres) substituting local browser storage and MySQL.
- **Authentication**: JSON Web Tokens (JWT) or Supabase Auth replacing PHP sessions/Firebase.
- **Progressive Web App**: Optional Service Worker integration for offline support.

## High-Level Flow
1. **Frontend (React)**: Handles all user interface elements (Mood, Journal, Fitness, Therapy components).
2. **Backend API (Node/Express)**: Provides the business logic layer and REST endpoints (`/api/...`).
3. **Database**: Persists all user data (Users, Moods, Journals, Workouts).
4. **Data Flow**: `UI` --> `calls` --> `API` --> `reads/writes` --> `DB`.
5. **Auth Flow**: `UI` --> `Auth` --> `AuthAPI` --> `DB`.
6. **AI Chatbot**: Integrated AI assistant interacting via dedicated backend endpoints (`/api/chat`) backed by an AI service.