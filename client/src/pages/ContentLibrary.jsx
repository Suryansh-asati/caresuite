import { useState } from 'react';
import PageContainer from '../shared/layout/PageContainer';
import Button from '../shared/ui/Button';
import {
  SectionHero,
  CategoryFilter,
  ContentGrid,
  ContentCard,
  EmptyContent,
  therapyCategories,
  yogaCategories,
  educationCategories,
} from '../features/content';

const libraryItems = [
  {
    id: 'library-1',
    title: 'Quiet Mind',
    description: 'A short meditation to reset your nervous system.',
    category: therapyCategories[0],
    duration: 10,
    difficulty: 'beginner',
    type: 'therapy',
    createdAt: '2026-05-01',
  },
  {
    id: 'library-2',
    title: 'Sleep Prep Routine',
    description: 'Gentle cues to help you wind down.',
    category: therapyCategories[1],
    duration: 14,
    difficulty: 'all-levels',
    type: 'therapy',
    createdAt: '2026-04-25',
  },
  {
    id: 'library-3',
    title: 'Sunrise Flow',
    description: 'Easy morning stretches to wake the body.',
    category: yogaCategories[1],
    duration: 18,
    difficulty: 'beginner',
    type: 'yoga',
    createdAt: '2026-04-28',
  },
  {
    id: 'library-4',
    title: 'Mobility for Desk Days',
    description: 'Simple movements for hips, shoulders, and back.',
    category: yogaCategories[3],
    duration: 12,
    difficulty: 'all-levels',
    type: 'yoga',
    createdAt: '2026-05-06',
  },
  {
    id: 'library-5',
    title: 'Mindful Nutrition Basics',
    description: 'A short guide to balanced meals and steady energy.',
    category: educationCategories[1],
    duration: 6,
    difficulty: 'all-levels',
    type: 'education',
    createdAt: '2026-05-02',
  },
  {
    id: 'library-6',
    title: 'Emotional Wellness Toolkit',
    description: 'Practical ideas for daily emotional care.',
    category: educationCategories[3],
    duration: 7,
    difficulty: 'all-levels',
    type: 'education',
    createdAt: '2026-04-30',
  },
];

const ContentLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryOptions = [
    therapyCategories[0],
    therapyCategories[1],
    yogaCategories[1],
    yogaCategories[3],
    educationCategories[1],
    educationCategories[3],
  ].filter(Boolean);

  const visibleItems =
    selectedCategory === 'all'
      ? libraryItems
      : libraryItems.filter((item) => item.category === selectedCategory);

  return (
    <PageContainer>
      <SectionHero
        title="Content Library"
        subtitle="Browse wellness sessions and resources built on the shared content system."
        actions={
          <Button variant="secondary" onClick={() => {}}>
            Start a session
          </Button>
        }
      />

      <div className="mt-8 space-y-5">
        <CategoryFilter
          categories={categoryOptions}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <ContentGrid
          items={visibleItems}
          emptyState={
            <EmptyContent
              title="No content in this category"
              description="Try a different category to explore more sessions."
            />
          }
          renderItem={(item) => (
            <ContentCard key={item.id} item={item} ctaLabel="View details" onCtaClick={() => {}} />
          )}
        />
      </div>
    </PageContainer>
  );
};

export default ContentLibrary;
