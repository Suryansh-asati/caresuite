# API Contracts

REST endpoints handled by Node/Express Backend. Requests require Authorization headers where applicable.

## Users & Authentication
- `POST /api/users/signup`
  - Body: `{ name, email, password }`
  - Response: `{ token, user: { id, name, email } }`
- `POST /api/users/login`
  - Body: `{ email, password }`
  - Response: `{ token, user: { id, name, email } }`

## Mood Tracking
- `POST /api/moods`
  - Body: `{ date, mood, note }`
  - Response: Created Mood object.
- `GET /api/moods`
  - Response: Array of User's Mood objects.

## Journaling
- `POST /api/journal`
  - Body: `{ date, title, content, tags }`
  - Response: Created Journal object.
- `GET /api/journal`
  - Response: Array of User's Journal objects.

## Fitness / Workouts
- `POST /api/workouts`
  - Body: `{ date, type, duration, intensity }`
  - Response: Created Workout object.
- `GET /api/workouts`
  - Response: Array of User's Workout objects.

## AI Chatbot
- `POST /api/chat`
  - Body: `{ message, history }`
  - Response: `{ reply }`