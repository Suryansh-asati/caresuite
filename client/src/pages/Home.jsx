import { Link } from 'react-router-dom';
import PageContainer from '../shared/layout/PageContainer';
import SectionHeader from '../shared/ui/SectionHeader';
import Card from '../shared/ui/Card';

const Home = () => {
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
      <SectionHeader title="Welcome to CareSuite" subtitle="Your personal wellness companion" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
    </PageContainer>
  );
};

export default Home;
