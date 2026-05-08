import React from 'react';
import { MoodEntry } from '../types';

interface MoodListProps {
  moods: MoodEntry[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export const MoodList: React.FC<MoodListProps> = ({ moods, loading, onDelete }) => {
  if (loading && moods.length === 0) {
    return <div className="text-center text-gray-500 py-8">Loading history...</div>;
  }

  if (moods.length === 0) {
    return (
      <div className="text-center bg-gray-50 rounded-lg py-12 border border-dashed border-gray-300">
        <p className="text-gray-500">No mood entries yet. Start tracking your mood!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Past Entries</h3>
      {moods.map((entry) => (
        <div key={entry.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-medium text-gray-800">{entry.mood}</span>
              <span className="text-xs text-gray-500">
                {new Date(entry.createdAt).toLocaleDateString([], { 
                  weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </span>
            </div>
            {entry.note && <p className="text-gray-600 text-sm mt-1">{entry.note}</p>}
          </div>
          
          <button
            onClick={() => onDelete(entry.id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium p-1"
            title="Delete entry"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
