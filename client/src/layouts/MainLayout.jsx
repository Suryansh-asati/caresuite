import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../shared/ui/Button';

const MainLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/content', label: 'Content Library' },
    { path: '/mood', label: 'Mood Tracker' },
    { path: '/journal', label: 'Journal' },
    { path: '/workouts', label: 'Workouts' },
    { path: '/therapy', label: 'Audio Therapy' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">CareSuite</h1>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `py-4 px-1 border-b-2 font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'border-emerald-400 text-emerald-800'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="bg-white px-4 py-6 border-t text-center text-sm text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} CareSuite
      </footer>
    </div>
  );
};

export default MainLayout;
