import PageContainer from '../shared/layout/PageContainer';
import SectionHeader from '../shared/ui/SectionHeader';
import Button from '../shared/ui/Button';
import EmptyState from '../shared/ui/EmptyState';

const Journal = () => {
  // Placeholder data
  const entries = [];

  return (
    <PageContainer>
      <SectionHeader
        title="Personal Journal"
        subtitle="Write your thoughts and reflections."
        action={<Button>New Entry</Button>}
      />
      {entries.length === 0 ? (
        <EmptyState
          title="No journal entries yet"
          message="Start by writing your first entry."
          action={<Button>Create New Entry</Button>}
        />
      ) : (
        <div>{/* Render entries here */}</div>
      )}
    </PageContainer>
  );
};

export default Journal;
