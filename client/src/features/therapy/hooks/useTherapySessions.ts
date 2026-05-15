import { useCallback, useEffect, useMemo, useState } from 'react';
import { therapyApi } from '../api/therapyApi';
import type { TherapyCategory, TherapySession } from '../types/therapy.types';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useTherapySessions = () => {
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [categories, setCategories] = useState<TherapyCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TherapyCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async (category: TherapyCategory | 'all' = 'all') => {
    const resolvedCategory = category === 'all' ? undefined : category;
    const data = await therapyApi.getSessions(resolvedCategory);
    setSessions(data);
  }, []);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [allCategories] = await Promise.all([therapyApi.getCategories(), fetchSessions('all')]);
      setCategories(allCategories);
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Unable to load therapy sessions right now.'));
    } finally {
      setLoading(false);
    }
  }, [fetchSessions]);

  useEffect(() => {
    void fetchInitialData();
  }, [fetchInitialData]);

  const updateCategory = useCallback(
    async (category: TherapyCategory | 'all') => {
      setSelectedCategory(category);
      setLoading(true);
      setError(null);

      try {
        await fetchSessions(category);
      } catch (error: unknown) {
        setError(getErrorMessage(error, 'Unable to update therapy category.'));
      } finally {
        setLoading(false);
      }
    },
    [fetchSessions]
  );

  const hasSessions = useMemo(() => sessions.length > 0, [sessions]);

  return {
    sessions,
    categories,
    selectedCategory,
    loading,
    error,
    hasSessions,
    updateCategory,
    refresh: fetchInitialData,
  };
};
