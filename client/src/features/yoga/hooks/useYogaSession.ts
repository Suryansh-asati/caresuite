import { useCallback, useEffect, useState } from 'react';
import { yogaApi } from '../api/yogaApi';
import type { YogaSession } from '../types/yoga.types';

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  const axiosError = error as { response?: { data?: { message?: string } } };
  return axiosError.response?.data?.message || fallbackMessage;
};

export const useYogaSession = (sessionId?: string) => {
  const [session, setSession] = useState<YogaSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    if (!sessionId) {
      setSession(null);
      setLoading(false);
      setError('Invalid yoga session id.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await yogaApi.getSessionById(sessionId);
      setSession(data);
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Unable to load this yoga session.'));
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    void fetchSession();
  }, [fetchSession]);

  return {
    session,
    loading,
    error,
    refresh: fetchSession,
  };
};
