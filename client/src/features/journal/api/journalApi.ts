import axios from 'axios';
import type { JournalEntry, JournalPayload } from '../types';
import { API_URL } from '../../../config/api';

const apiClient = axios.create({
  baseURL: `${API_URL}/journal`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const unwrapData = <T>(response: { data: { data: T } }) => response.data.data;

export const journalApi = {
  getEntries: async (): Promise<JournalEntry[]> => {
    const response = await apiClient.get('');
    return unwrapData<JournalEntry[]>(response);
  },

  createEntry: async (data: JournalPayload): Promise<JournalEntry> => {
    const response = await apiClient.post('', data);
    return unwrapData<JournalEntry>(response);
  },

  updateEntry: async (id: string, data: JournalPayload): Promise<JournalEntry> => {
    const response = await apiClient.put(`/${id}`, data);
    return unwrapData<JournalEntry>(response);
  },

  deleteEntry: async (id: string): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },
};
