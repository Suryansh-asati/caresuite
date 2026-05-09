import React, { useEffect, useState } from 'react';
import { useJournal } from '../hooks/useJournal';
import { JournalForm } from '../components/JournalForm';
import { JournalList } from '../components/JournalList';
import type { JournalEntry } from '../types';

export const JournalPage: React.FC = () => {
  const {
    entries,
    loading,
    saving,
    deletingId,
    error,
    fetchEntries,
    createEntry,
    updateEntry,
    deleteEntry,
  } = useJournal();
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleCreate = async (title: string, content: string) => {
    if (editingEntry) {
      const updatedEntry = await updateEntry(editingEntry.id, { title, content });
      if (!updatedEntry) {
        return false;
      }

      setEditingEntry(null);
      return true;
    }

    const createdEntry = await createEntry({ title, content });
    return Boolean(createdEntry);
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  const handleDelete = async (id: string) => {
    const deleted = await deleteEntry(id);
    if (deleted && editingEntry?.id === id) {
      setEditingEntry(null);
    }

    return deleted;
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Journal</h1>
        <p className="mt-2 text-sm text-slate-500">
          A quiet place for daily reflection and personal notes.
        </p>
      </div>

      {error ? (
        <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="space-y-6">
        <JournalForm
          initialTitle={editingEntry?.title}
          initialContent={editingEntry?.content}
          onSubmit={handleCreate}
          isLoading={loading || saving}
          onCancel={editingEntry ? handleCancelEdit : undefined}
        />

        <JournalList
          entries={entries}
          isLoading={loading}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default JournalPage;
