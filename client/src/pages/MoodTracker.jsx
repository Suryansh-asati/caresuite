import PageContainer from '../shared/layout/PageContainer';
import Button from '../shared/ui/Button';
import Card from '../shared/ui/Card';
import {
  SectionHero,
  ContentGrid,
  ContentCard,
  EmptyContent,
  therapyCategories,
  yogaCategories,
} from '../features/content';

const recommendedSessions = [
  {
    id: 'mood-1',
    title: 'Breathing Reset',
    description: 'Short breathing practice for emotional balance.',
    category: therapyCategories[0],
    duration: 5,
    difficulty: 'all-levels',
    type: 'therapy',
    createdAt: '2026-05-06',
  },
  {
    id: 'mood-2',
    title: 'Evening Unwind',
    description: 'Release tension and settle the nervous system.',
    category: therapyCategories[3],
    duration: 12,
    difficulty: 'beginner',
    type: 'therapy',
    createdAt: '2026-05-02',
  },
  {
    id: 'mood-3',
    title: 'Gentle Grounding',
    description: 'Light movement to reconnect with your body.',
    category: yogaCategories[3],
    duration: 14,
    difficulty: 'beginner',
    type: 'yoga',
    createdAt: '2026-04-30',
  },
];

const MoodTracker = () => {
  // Placeholder data
  const moods = [];

  return (
    <PageContainer>
      <SectionHero
        title="Mood Tracker"
        subtitle="Log your daily emotions and view your history."
        actions={<Button>Log Mood</Button>}
      />
      <Card className="mt-6">{/* MoodForm will go here */}</Card>

      <div className="mt-8">
        {moods.length === 0 ? (
          <EmptyContent
            title="No moods logged yet"
            description="Start by logging your first mood."
            action={{
              label: 'Log your mood',
              onClick: () => {},
            }}
          />
        ) : (
          <div>{/* MoodChart and MoodList will go here */}</div>
        )}
      </div>

      <section className="mt-10 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Recommended sessions</h3>
          <p className="mt-2 text-sm text-slate-600">
            Support your mood with calming sessions tailored for quick resets.
          </p>
        </div>
        <ContentGrid
          items={recommendedSessions}
          renderItem={(item) => (
            <ContentCard key={item.id} item={item} ctaLabel="Start session" onCtaClick={() => {}} />
          )}
        />
      </section>
    </PageContainer>
  );
};

export default MoodTracker;
