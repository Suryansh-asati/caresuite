import React, { useState } from 'react';

const MOOD_OPTIONS = ['Excellent', 'Good', 'Okay', 'Bad', 'Terrible'];

interface MoodFormProps {
  onSubmit: (mood: string, note?: string) => Promise<boolean>;
  isSubmitting?: boolean;
}

export const MoodForm: React.FC<MoodFormProps> = ({ onSubmit, isSubmitting }) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) {
      setError('Please select a mood.');
      return;
    }
    
    setError('');
    const success = await onSubmit(selectedMood, note);
    if (success) {
      setSelectedMood('');
      setNote('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">How are you feeling?</h2>
      
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((mood) => (
            <button
              key={mood}
              type="button"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedMood === mood
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
            Note (optional)
          </label>
          <textarea
            id="note"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any thoughts about your mood?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !selectedMood}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save Mood'}
        </button>
      </form>
    </div>
  );
};
