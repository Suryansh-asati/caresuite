import { Link } from 'react-router-dom';

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
      title: 'Fitness Tracker',
      description: 'Monitor your physical activity and fitness goals.',
      path: '/fitness',
      icon: '💪',
    },
    {
      title: 'Audio Therapy',
      description: 'Listen to guided audio sessions for relaxation and wellness.',
      path: '/audio-therapy',
      icon: '🎧',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome to CareSuite</h2>
        <p className="mt-2 text-gray-600">Your personal wellness companion</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 hover:bg-gray-50"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
            <div className="mt-4 text-indigo-600 font-medium">Learn more →</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;