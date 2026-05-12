import PageContainer from '../shared/layout/PageContainer';
import SectionHeader from '../shared/ui/SectionHeader';
import Button from '../shared/ui/Button';
import EmptyState from '../shared/ui/EmptyState';

const FitnessTracker = () => {
  // Placeholder data
  const workouts = [];

  return (
    <PageContainer>
      <SectionHeader
        title="Fitness Tracker"
        subtitle="Log your daily workouts, steps, and calories."
        action={<Button>Log Workout</Button>}
      />
      {workouts.length === 0 ? (
        <EmptyState
          title="No workouts logged yet"
          message="Start by logging your first workout."
          action={<Button>Log Your First Workout</Button>}
        />
      ) : (
        <div>{/* Render workouts here */}</div>
      )}
    </PageContainer>
  );
};

export default FitnessTracker;
