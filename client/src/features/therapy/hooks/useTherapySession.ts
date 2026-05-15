import { useCallback, useEffect, useState } from 'react';
import { therapyApi } from '../api/therapyApi';
import type { TherapySession } from '../types/therapy.types';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useTherapySession = (sessionId?: string) => {
  const [session, setSession] = useState<TherapySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    if (!sessionId) {
      setSession(null);
      setLoading(false);
      setError('Invalid therapy session id.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await therapyApi.getSessionById(sessionId);
      setSession(data);
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Unable to load this therapy session.'));
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
