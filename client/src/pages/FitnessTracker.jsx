import PageContainer from '../shared/layout/PageContainer';
import Button from '../shared/ui/Button';
import {
  SectionHero,
  ContentGrid,
  ContentCard,
  EmptyContent,
  yogaCategories,
  therapyCategories,
} from '../features/content';

const FitnessTracker = () => {
  // Placeholder data
  const workouts = [];

  return (
    <PageContainer>
      <SectionHero
        title="Fitness Tracker"
        subtitle="Log your daily workouts, steps, and calories."
        actions={<Button>Log Workout</Button>}
      />

      {workouts.length === 0 ? (
        <EmptyContent
          title="No workouts logged yet"
          description="Start by logging your first workout."
          action={{ label: 'Log your first workout', onClick: () => {} }}
        />
      ) : (
        <div>{/* Render workouts here */}</div>
      )}

      <section className="mt-10 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Mini yoga & mobility</h3>
          <p className="mt-2 text-sm text-slate-600">
            Short sessions to support movement and recovery.
          </p>
        </div>
        <ContentGrid
          items={[
            {
              id: 'fit-1',
              title: 'Desk Mobility',
              description: 'Simple movements to ease tension.',
              category: yogaCategories[3],
              duration: 10,
              difficulty: 'all-levels',
              type: 'yoga',
              createdAt: '2026-05-05',
            },
            {
              id: 'fit-2',
              title: 'Post-Run Recovery',
              description: 'Gentle recovery sequence to support soreness.',
              category: therapyCategories[3],
              duration: 8,
              difficulty: 'all-levels',
              type: 'therapy',
              createdAt: '2026-04-29',
            },
          ]}
          renderItem={(item) => (
            <ContentCard key={item.id} item={item} ctaLabel="Start" onCtaClick={() => {}} />
          )}
        />
      </section>
    </PageContainer>
  );
};

export default FitnessTracker;
