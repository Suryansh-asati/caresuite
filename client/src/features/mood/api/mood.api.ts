import axios from 'axios';
import { MoodEntry, CreateMoodDto } from '../types';
import { API_URL } from '../../../config/api';

const apiClient = axios.create({
  baseURL: `${API_URL}/moods`,
});

// Request interceptor to add bearer token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const moodApi = {
  getMoods: async (): Promise<MoodEntry[]> => {
    const response = await apiClient.get('');
    return response.data.data;
  },

  createMood: async (data: CreateMoodDto): Promise<MoodEntry> => {
    const response = await apiClient.post('', data);
    return response.data.data;
  },

  deleteMood: async (id: string): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },
};
