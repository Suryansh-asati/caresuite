import React from 'react';
import PageContainer from '../../dashboard/components/PageContainer';
import { ContentCard, ContentGrid, SectionHero } from '../../content';
import { useLibrary } from '../hooks/useLibrary';

const LibraryHomePage: React.FC = () => {
  const { items } = useLibrary();

  const featured = items.slice(0, 1);

  const audioItems = items.filter((i) => i.libraryType === 'audio');
  const yogaItems = items.filter((i) => i.libraryType === 'yoga');
  const articleItems = items.filter((i) => i.libraryType === 'article');

  const renderSection = (title: string, sectionItems: typeof items, description: string) => (
    <section
      aria-labelledby={title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
      className="space-y-4"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2
            id={title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            className="text-xl font-semibold text-slate-900 sm:text-2xl"
          >
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">{description}</p>
        </div>
      </div>
      <ContentGrid
        items={sectionItems}
        emptyTitle={`No ${title.toLowerCase()} yet`}
        emptyDescription="More content will appear here as the library grows."
        renderItem={(item) => (
          <ContentCard key={item.id} item={item} ctaLabel="Open" className="h-full" />
        )}
      />
    </section>
  );

  return (
    <PageContainer>
      <SectionHero
        title="Explore Your Wellness Journey"
        subtitle="Discover audio, movement, and reading in one calm, cohesive wellness library."
        eyebrow="Wellness Library"
        titleAs="h1"
      />

      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="featured" className="mb-8">
          <h2 id="featured" className="sr-only">
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((f) => (
              <div key={f.id} className="md:col-span-1">
                <ContentCard item={f} ctaLabel="Start" className="h-full" />
              </div>
            ))}
            <div className="md:col-span-2">
              <SectionHero
                title="Discover Calm, Focus & Balance"
                subtitle="Tailored sessions for what you need today, with a unified path across audio, yoga, and reading."
                titleAs="h2"
              />
            </div>
          </div>
        </section>

        <div className="space-y-10 pb-8">
          {renderSection(
            'Meditation Audio',
            audioItems,
            'Audio sessions for calm, focus, and reset.'
          )}
          {renderSection(
            'Yoga & Stretching',
            yogaItems,
            'Movement sessions for mobility, balance, and release.'
          )}
          {renderSection(
            'Wellness Reading',
            articleItems,
            'Short reads and future educational content.'
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default LibraryHomePage;
