import { useState, useEffect, useCallback } from 'react';
import { moodApi } from '../api/mood.api';
import { MoodEntry } from '../types';

export const useMoods = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMoods = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await moodApi.getMoods();
      setMoods(data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to fetch moods');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoods();
  }, [fetchMoods]);

  const addMood = async (mood: string, note?: string) => {
    setError(null);
    try {
      const newMood = await moodApi.createMood({ mood, note });
      setMoods((prev) => [newMood, ...prev]);
      return true;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to add mood');
      return false;
    }
  };

  const removeMood = async (id: string) => {
    setError(null);
    try {
      await moodApi.deleteMood(id);
      setMoods((prev) => prev.filter((m) => m.id !== id));
      return true;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to delete mood');
      return false;
    }
  };

  return { moods, loading, error, addMood, removeMood, refetch: fetchMoods };
};
