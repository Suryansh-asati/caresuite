import PageContainer from '../shared/layout/PageContainer';
import SectionHeader from '../shared/ui/SectionHeader';
import Card from '../shared/ui/Card';

const AudioTherapy = () => {
  // Placeholder data
  const sessions = [
    { id: 1, title: 'Morning Meditation', duration: '10 min' },
    { id: 2, title: 'Stress Relief', duration: '15 min' },
    { id: 3, title: 'Deep Sleep', duration: '20 min' },
  ];

  return (
    <PageContainer>
      <SectionHeader
        title="Audio Therapy"
        subtitle="Listen to peaceful music and guided meditations."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <Card key={session.id}>
            <h3 className="text-lg font-semibold">{session.title}</h3>
            <p className="text-gray-500">{session.duration}</p>
            {/* Add a play button or link here */}
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default AudioTherapy;
