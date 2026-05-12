import { Link } from 'react-router-dom';
import { useState } from 'react';
import PageContainer from '../shared/layout/PageContainer';
import Card from '../shared/ui/Card';
import Button from '../shared/ui/Button';
import {
  SectionHero,
  CategoryFilter,
  ContentGrid,
  ContentCard,
  therapyCategories,
  yogaCategories,
  educationCategories,
} from '../features/content';

const featuredContent = [
  {
    id: 'home-1',
    title: 'Evening Reset',
    description: 'Wind down with a calming reset for better sleep.',
    category: therapyCategories[1],
    duration: 12,
    difficulty: 'all-levels',
    type: 'therapy',
    createdAt: '2026-05-01',
  },
  {
    id: 'home-2',
    title: 'Gentle Morning Flow',
    description: 'Ease into the day with soft stretches.',
    category: yogaCategories[1],
    duration: 18,
    difficulty: 'beginner',
    type: 'yoga',
    createdAt: '2026-04-28',
  },
  {
    id: 'home-3',
    title: 'Focus Builder',
    description: 'Short focus routine to reset attention.',
    category: therapyCategories[2],
    duration: 8,
    difficulty: 'beginner',
    type: 'therapy',
    createdAt: '2026-05-03',
  },
  {
    id: 'home-4',
    title: 'Mindful Habits',
    description: 'Small daily habits that support wellbeing.',
    category: educationCategories[4],
    duration: 6,
    difficulty: 'all-levels',
    type: 'education',
    createdAt: '2026-04-30',
  },
];

const categoryOptions = [
  therapyCategories[1],
  therapyCategories[2],
  yogaCategories[1],
  educationCategories[4],
].filter(Boolean);

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const features = [
    {
      title: 'Mood Tracker',
      description: 'Track your daily emotional wellbeing and identify patterns.',
      path: '/mood',
      icon: '😊',
    },
    {
      title: 'Journal',
      description: 'Write and reflect on your thoughts and experiences.',
      path: '/journal',
      icon: '📝',
    },
    {
      title: 'Workouts',
      description: 'Log gentle workout sessions and keep your routine steady.',
      path: '/workouts',
      icon: '🏃',
    },
    {
      title: 'Audio Therapy',
      description: 'Listen to guided audio sessions for relaxation and wellness.',
      path: '/audio-therapy',
      icon: '🎧',
    },
  ];

  return (
    <PageContainer>
      <SectionHero
        title="Welcome to CareSuite"
        subtitle="Your personal wellness companion for daily wellbeing."
        actions={
          <Link to="/content">
            <Button variant="secondary">Explore content</Button>
          </Link>
        }
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <Link key={feature.path} to={feature.path} className="block hover:no-underline">
            <Card className="hover:shadow-lg transition-shadow hover:bg-gray-50 h-full">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
              <div className="mt-4 text-blue-600 font-medium">Go to feature →</div>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mt-12 space-y-5">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Featured wellness content</h3>
          <p className="mt-2 text-sm text-slate-600">
            Explore a curated set of sessions and resources built on the shared content system.
          </p>
        </div>
        <CategoryFilter
          categories={categoryOptions}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <ContentGrid
          items={
            selectedCategory === 'all'
              ? featuredContent
              : featuredContent.filter((item) => item.category === selectedCategory)
          }
          emptyTitle="No featured content"
          emptyDescription="Try another category to see available items."
          renderItem={(item) => (
            <ContentCard key={item.id} item={item} ctaLabel="View details" onCtaClick={() => {}} />
          )}
        />
      </section>
    </PageContainer>
  );
};

export default Home;
