import PageContainer from '../shared/layout/PageContainer';
import SectionHeader from '../shared/ui/SectionHeader';
import Button from '../shared/ui/Button';
import EmptyState from '../shared/ui/EmptyState';
import Card from '../shared/ui/Card';

const MoodTracker = () => {
  // Placeholder data
  const moods = [];

  return (
    <PageContainer>
      <SectionHeader
        title="Mood Tracker"
        subtitle="Log your daily emotions and view your history."
        action={<Button>Log Mood</Button>}
      />
      <Card>{/* MoodForm will go here */}</Card>

      <div className="mt-8">
        {moods.length === 0 ? (
          <EmptyState
            title="No moods logged yet"
            message="Start by logging your first mood."
            action={<Button>Log Your Mood</Button>}
          />
        ) : (
          <div>{/* MoodChart and MoodList will go here */}</div>
        )}
      </div>
    </PageContainer>
  );
};

export default MoodTracker;
