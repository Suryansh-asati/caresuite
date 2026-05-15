import { useCallback, useState } from 'react';
import { journalApi } from '../api/journalApi';
import type { JournalEntry, JournalPayload } from '../types';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await journalApi.getEntries();
      setEntries(data);
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to fetch journal entries'));
    } finally {
      setLoading(false);
    }
  }, []);

  const createEntry = async (payload: JournalPayload) => {
    setSaving(true);
    setError(null);

    try {
      const entry = await journalApi.createEntry(payload);
      setEntries((currentEntries) => [entry, ...currentEntries]);
      return entry;
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to create journal entry'));
      return null;
    } finally {
      setSaving(false);
    }
  };

  const updateEntry = async (id: string, payload: JournalPayload) => {
    setSaving(true);
    setError(null);

    try {
      const updatedEntry = await journalApi.updateEntry(id, payload);
      setEntries((currentEntries) =>
        currentEntries.map((entry) => (entry.id === id ? updatedEntry : entry))
      );
      return updatedEntry;
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to update journal entry'));
      return null;
    } finally {
      setSaving(false);
    }
  };

  const deleteEntry = async (id: string) => {
    setDeletingId(id);
    setError(null);

    try {
      await journalApi.deleteEntry(id);
      setEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== id));
      return true;
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to delete journal entry'));
      return false;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    entries,
    loading,
    saving,
    deletingId,
    error,
    fetchEntries,
    createEntry,
    updateEntry,
    deleteEntry,
  };
};
