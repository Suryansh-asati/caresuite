import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../shared/layout/PageContainer';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner';
import { CategoryFilter, ContentCard, ContentGrid, EmptyContent, SectionHero } from '../../content';
import { useYogaSessions } from '../hooks/useYogaSessions';

export const YogaHomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    sessions,
    categories,
    levels,
    selectedCategory,
    selectedLevel,
    loading,
    error,
    updateCategory,
    updateLevel,
    refresh,
  } = useYogaSessions();

  return (
    <PageContainer>
      <div className="space-y-8">
        <SectionHero
          eyebrow="Yoga Therapy"
          title="Guided wellness and stretching for calm, strength, and balance"
          subtitle="Choose your practice level and category to find the perfect session for your wellness journey."
          titleAs="h1"
          className="shadow-sm"
        />

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Filter by level</h2>
            {error ? (
              <button
                type="button"
                onClick={refresh}
                className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Retry
              </button>
            ) : null}
          </div>

          <CategoryFilter
            categories={levels}
            selectedCategory={selectedLevel}
            onSelect={updateLevel}
            allLabel="All Levels"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Browse by category</h2>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={updateCategory}
            allLabel="All Sessions"
          />
        </section>

        {loading ? (
          <div className="rounded-3xl border border-slate-100 bg-white px-6 py-16 shadow-sm">
            <LoadingSpinner />
          </div>
        ) : null}

        {!loading && error ? (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <ContentGrid
            items={sessions}
            emptyState={
              <EmptyContent
                title="No sessions match your filters"
                description="Try adjusting your level or category selection to explore more yoga practices."
              />
            }
            renderItem={(session) => (
              <ContentCard
                key={session.id}
                item={session}
                ctaLabel="Start Session"
                onClick={() => navigate(`/yoga/${session.id}`)}
                showMeta
                ariaLabel={`Open ${session.title}`}
                thumbnailAlt={`${session.title} yoga session artwork`}
                className="bg-gradient-to-b from-white to-violet-50/30"
              />
            )}
          />
        ) : null}
      </div>
    </PageContainer>
  );
};

export default YogaHomePage;
