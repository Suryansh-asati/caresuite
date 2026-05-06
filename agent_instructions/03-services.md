# Core Services & Business Logic

## Authentication Service
Handles securing the application and authenticating user identities.
- Register new users securely.
- Login existing users and issue session tokens (JWT or Supabase Auth).
- Validate authorization headers on protected routes.

## Tracking Services
Handles logging and persisting user metrics over time.
- **Mood Tracking**: Records selected daily moods, optional user notes, and retrieves mood history.
- **Journaling**: Records personal journal entries with titles and content (linked explicitly to user contexts) in chronological order.
- **Fitness Tracking**: Logs fitness events, recording types, durations, step counts, and calories burned. Provides historical workout data and aggregates.

## Therapy Services (Static/Content)
Provides access to curated emotional and mental well-being content.
- **Audio Therapy**: Serves music playlists, podcasts, and audiobooks.
- **Yoga Therapy**: Offers guided yoga poses via instructions and videos.
- **Laughing Therapy**: Supplies fun/mood-enhancing content like memes and comedy videos.
- **Educational Resources**: Provides hygiene, science, and arts & crafts material.
- **Mindfulness Game**: Hosts interactive games (e.g., maze game) promoting positive thinking.

## AI AI Chatbot Service
Provides responsive, AI-driven conversations to support users dynamically.
- Interacts with an external natural language processing API.
- Evaluates user prompts contextualized for mental wellness.
- Returns comforting, engaging, and resource-linked messages.