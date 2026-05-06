# Database Schemas

We are transitioning from local browser `localStorage` variables to a scalable remote DBMS (MongoDB/Mongoose or Supabase Postgres). Below are the core object models.

## User
```json
{
  "id": "ObjectId",
  "name": "String",
  "email": "String (Unique, Indexed)",
  "passwordHash": "String"
}
```

## MoodEntry
```json
{
  "userId": "ObjectId (Ref: User)",
  "date": "Date (or ISO String)",
  "mood": "String (e.g., 'Happy', 'Sad')",
  "note": "String"
}
```

## JournalEntry
```json
{
  "userId": "ObjectId (Ref: User)",
  "date": "Date",
  "title": "String",
  "content": "String"
}
```

## WorkoutEntry
```json
{
  "userId": "ObjectId (Ref: User)",
  "date": "Date",
  "type": "String",
  "duration": "Number (Minutes)",
  "intensity": "String"
}
```