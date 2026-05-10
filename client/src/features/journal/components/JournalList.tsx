import React from 'react';
import type { JournalEntry } from '../types';

interface JournalListProps {
  entries: JournalEntry[];
  isLoading: boolean;
  deletingId: string | null;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => Promise<boolean>;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

const getPreview = (content: string) => {
  const cleaned = content.replace(/\s+/g, ' ').trim();
  return cleaned.length > 180 ? `${cleaned.slice(0, 180).trim()}…` : cleaned;
};

export const JournalList: React.FC<JournalListProps> = ({
  entries,
  isLoading,
  deletingId,
  onEdit,
  onDelete,
}) => {
  if (isLoading && entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
        Loading journal entries...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
        <p className="text-base font-medium text-slate-700">No entries yet.</p>
        <p className="mt-1 text-sm text-slate-500">Start with a short note and build from there.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => {
        const preview = getPreview(entry.content);
        const isDeleting = deletingId === entry.id;

        return (
          <article
            key={entry.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold text-slate-900">{entry.title}</h3>
                  <span className="text-xs text-slate-500">{formatDate(entry.createdAt)}</span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                  {preview}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:pt-0.5">
                <button
                  type="button"
                  onClick={() => onEdit(entry)}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(entry.id)}
                  disabled={isDeleting}
                  className="rounded-full border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
