# Authentication & Sessions

We replace the legacy PHP/MySQL & Firebase patterns from the static applications with a modern scalable token authentication flow.

## JSON Web Tokens (JWT)
The default pattern for custom backend security.
1. The user logs in via `/api/users/login`.
2. The Node.js Express server validates password hashes and generates a `JWT`.
3. The React frontend caches the `JWT` (typically in `localStorage` or `HttpOnly` cookies, depending on final security decisions).
4. Subsequent React API calls (to interact with Journal/Mood/Fitness data) append the `JWT` within the `Authorization: Bearer <token>` header.

## Supabase Auth Alternative
If chosen over MongoDB, Supabase provides an out-of-the-box API for authentication.
- Implements standard JWT principles but offloads session management mechanisms and database mappings directly to Supabase client libraries (`supabase-js`).