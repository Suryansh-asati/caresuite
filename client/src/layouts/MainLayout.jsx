import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/mood', label: 'Mood Tracker' },
    { path: '/journal', label: 'Journal' },
    { path: '/fitness', label: 'Fitness' },
    { path: '/audio-therapy', label: 'Audio Therapy' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">CareSuite</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full">
        <Outlet />
      </main>

      <footer className="bg-white px-4 py-6 border-t text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CareSuite
      </footer>
    </div>
  );
};

export default MainLayout;
