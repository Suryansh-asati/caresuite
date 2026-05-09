import React from 'react';
import { MoodForm } from '../components/MoodForm';
import { MoodList } from '../components/MoodList';
import { useMoods } from '../hooks/useMoods';

export const MoodTrackerPage: React.FC = () => {
  const { moods, loading, error, addMood, removeMood } = useMoods();
  
  // Custom loading state to handle fast submits nicely
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleAddMood = async (mood: string, note?: string) => {
    setIsSubmitting(true);
    const success = await addMood(mood, note);
    setIsSubmitting(false);
    return success;
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mood Tracker</h1>
        <p className="text-gray-600">Keep track of your daily emotional wellbeing.</p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-100">
          {error}
        </div>
      )}

      <MoodForm onSubmit={handleAddMood} isSubmitting={isSubmitting} />
      
      <MoodList moods={moods} loading={loading} onDelete={removeMood} />
    </div>
  );
};

export default MoodTrackerPage;
