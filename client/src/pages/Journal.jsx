import PageContainer from '../shared/layout/PageContainer';
import Button from '../shared/ui/Button';
import {
  SectionHero,
  ContentGrid,
  ContentCard,
  EmptyContent,
  therapyCategories,
  educationCategories,
} from '../features/content';

const journalResources = [
  {
    id: 'journal-1',
    title: 'Mindful Reflection',
    description: 'A short prompt to capture your day with clarity.',
    category: educationCategories[0],
    duration: 5,
    difficulty: 'all-levels',
    type: 'education',
    createdAt: '2026-05-04',
  },
  {
    id: 'journal-2',
    title: 'Sleep Wind-Down Notes',
    description: 'Guide for closing the day with gratitude.',
    category: educationCategories[2],
    duration: 7,
    difficulty: 'all-levels',
    type: 'education',
    createdAt: '2026-05-02',
  },
  {
    id: 'journal-3',
    title: 'Stress Release Flow',
    description: 'Write and breathe to ease mental load.',
    category: therapyCategories[4],
    duration: 10,
    difficulty: 'beginner',
    type: 'therapy',
    createdAt: '2026-04-29',
  },
];

const Journal = () => {
  // Placeholder data
  const entries = [];

  return (
    <PageContainer>
      <SectionHero
        title="Personal Journal"
        subtitle="Write your thoughts and reflections."
        actions={<Button>New Entry</Button>}
      />
      {entries.length === 0 ? (
        <EmptyContent
          title="No journal entries yet"
          description="Start by writing your first entry."
          action={{
            label: 'Create new entry',
            onClick: () => {},
          }}
        />
      ) : (
        <div>{/* Render entries here */}</div>
      )}

      <section className="mt-10 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Writing support</h3>
          <p className="mt-2 text-sm text-slate-600">
            Use these prompts and resources to deepen your reflection practice.
          </p>
        </div>
        <ContentGrid
          items={journalResources}
          renderItem={(item) => (
            <ContentCard key={item.id} item={item} ctaLabel="Open prompt" onCtaClick={() => {}} />
          )}
        />
      </section>
    </PageContainer>
  );
};

export default Journal;
