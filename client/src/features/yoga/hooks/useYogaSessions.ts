import { useCallback, useEffect, useMemo, useState } from 'react';
import { yogaApi } from '../api/yogaApi';
import type { YogaCategory, YogaLevel, YogaSession } from '../types/yoga.types';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useYogaSessions = () => {
  const [sessions, setSessions] = useState<YogaSession[]>([]);
  const [categories, setCategories] = useState<YogaCategory[]>([]);
  const [levels, setLevels] = useState<YogaLevel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<YogaCategory | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<YogaLevel | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(
    async (category: YogaCategory | 'all' = 'all', level: YogaLevel | 'all' = 'all') => {
      const resolvedCategory = category === 'all' ? undefined : category;
      const resolvedLevel = level === 'all' ? undefined : level;
      const data = await yogaApi.getSessions(resolvedCategory, resolvedLevel);
      setSessions(data);
    },
    []
  );

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [allCategories, allLevels] = await Promise.all([
        yogaApi.getCategories(),
        yogaApi.getLevels(),
      ]);
      setCategories(allCategories);
      setLevels(allLevels);
      await fetchSessions('all', 'all');
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Unable to load yoga sessions right now.'));
    } finally {
      setLoading(false);
    }
  }, [fetchSessions]);

  useEffect(() => {
    void fetchInitialData();
  }, [fetchInitialData]);

  const updateCategory = useCallback(
    async (category: YogaCategory | 'all') => {
      setSelectedCategory(category);
      setLoading(true);
      setError(null);

      try {
        await fetchSessions(category, selectedLevel);
      } catch (error: unknown) {
        setError(getErrorMessage(error, 'Unable to update yoga category.'));
      } finally {
        setLoading(false);
      }
    },
    [fetchSessions, selectedLevel]
  );

  const updateLevel = useCallback(
    async (level: YogaLevel | 'all') => {
      setSelectedLevel(level);
      setLoading(true);
      setError(null);

      try {
        await fetchSessions(selectedCategory, level);
      } catch (error: unknown) {
        setError(getErrorMessage(error, 'Unable to update yoga level.'));
      } finally {
        setLoading(false);
      }
    },
    [fetchSessions, selectedCategory]
  );

  const hasSessions = useMemo(() => sessions.length > 0, [sessions]);

  return {
    sessions,
    categories,
    levels,
    selectedCategory,
    selectedLevel,
    loading,
    error,
    hasSessions,
    updateCategory,
    updateLevel,
    refresh: fetchInitialData,
  };
};
