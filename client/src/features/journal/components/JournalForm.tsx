import React, { useEffect, useState } from 'react';

interface JournalFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => Promise<boolean>;
  isLoading?: boolean;
  onCancel?: () => void;
}

export const JournalForm: React.FC<JournalFormProps> = ({
  initialTitle = '',
  initialContent = '',
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState('');

  const isEditing = Boolean(initialTitle || initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setError('');
  }, [initialTitle, initialContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setError('');
    const success = await onSubmit(title.trim(), content.trim());
    if (success && !isEditing) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditing ? 'Edit entry' : 'New entry'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            A simple place to write, reflect, and come back later.
          </p>
        </div>
        {isEditing && onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
      ) : null}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give this entry a short title"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-1 block text-sm font-medium text-slate-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write what happened, how you felt, or what you want to remember."
            rows={7}
            className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Saving...' : isEditing ? 'Update entry' : 'Save entry'}
        </button>
      </div>
    </form>
  );
};
