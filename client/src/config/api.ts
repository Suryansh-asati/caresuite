// Centralized API URL config — read from Vite env variables.
// Keeps the frontend free of hard-coded backend URLs.

const rawApiUrl = import.meta.env.VITE_API_URL;
const rawBase = import.meta.env.VITE_API_BASE_URL;

export const API_URL = rawApiUrl ?? (rawBase ? `${rawBase.replace(/\/$/, '')}/api` : '');

if (!API_URL) {
  // Warn during development; prevents accidental hard-coded fallbacks.
  // Consumers should handle empty string if needed.
  // eslint-disable-next-line no-console
  console.warn('VITE_API_URL and VITE_API_BASE_URL are not set. Set one in .env');
}

export default API_URL;
