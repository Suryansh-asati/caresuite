import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHero } from '../../../features/content/components/SectionHero';
import { CategoryFilter } from '../../../features/content/components/CategoryFilter';
import { ContentCard } from '../../../features/content/components/ContentCard';
import { EmptyContent } from '../../../features/content/components/EmptyContent';
import { useTherapySessions, useTherapyCategories } from '../hooks/useTherapy';
import type { TherapySession } from '../types';

const TherapyHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { categories, error: categoriesError } = useTherapyCategories();
  const {
    sessions,
    loading: sessionsLoading,
    error,
  } = useTherapySessions(selectedCategory || undefined);

  const handleSessionClick = (session: TherapySession) => {
    navigate(`/therapy/${session.id}`);
  };

  const handleCategorySelect = (category: string | 'all') => {
    setSelectedCategory(category === 'all' ? null : category);
  };

  const displayedCategories = categories.map((cat) => cat.name);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <SectionHero
        title="Audio Therapy"
        subtitle="Embrace calm, wellness-focused audio experiences designed for your peace of mind"
        eyebrow="Wellness"
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {(error || categoriesError) && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-900">
              Some content could not be loaded right now.
            </p>
            <p className="mt-2 text-xs text-amber-800">
              Please try again in a moment.
            </p>
          </div>
        )}
        )}

        {/* Category Filter */}
        {!categoriesError && (
          <div className="mb-10">
            <CategoryFilter
              categories={displayedCategories}
              selectedCategory={selectedCategory || 'all'}
              onSelect={handleCategorySelect}
              includeAll
            />
          </div>
        )}

        {/* Content Grid */}
        {sessionsLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4 rounded-2xl bg-slate-100 p-5">
                <div className="h-40 w-full rounded-lg bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-3 w-full rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <EmptyContent
            title="Unable to Load Sessions"
            description={error}
            action={{
              label: 'Try Again',
              onClick: () => window.location.reload(),
            }}
          />
        ) : sessions.length === 0 ? (
          <EmptyContent
            title={
              selectedCategory
                ? `No sessions found in "${selectedCategory}"`
                : 'No therapy sessions available'
            }
            description="Check back soon for more wellness content or ensure the database has been seeded."
            action={{
              label: selectedCategory ? 'Clear Filter' : 'Refresh',
              onClick: selectedCategory
                ? () => handleCategorySelect('all')
                : () => window.location.reload(),
            }}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sessions.map((session) => (
              <ContentCard
                key={session.id}
                item={{
                  id: session.id,
                  title: session.title,
                  description: session.description,
                  category: session.category,
                  thumbnail: session.thumbnail,
                  duration: session.duration,
                }}
                onClick={handleSessionClick}
                ctaLabel="Explore"
                showCategory
                showMeta
              />
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Wellness at Your Fingertips</h2>
          <p className="mb-4 text-slate-600">
            Audio Therapy sessions are thoughtfully crafted to support your mental and emotional
            wellbeing. Whether you need help sleeping, managing anxiety, or enhancing focus, our
            collection of guided meditations and therapeutic soundscapes is here for you.
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex gap-3">
              <span className="text-emerald-500">✓</span>
              <span>Scientifically-designed sessions for proven effectiveness</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500">✓</span>
              <span>Sessions ranging from 5 to 35 minutes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500">✓</span>
              <span>Categories for sleep, meditation, focus, and relaxation</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500">✓</span>
              <span>Access anytime, anywhere, without distractions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TherapyHomePage;
