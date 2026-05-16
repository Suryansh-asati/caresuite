import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../shared/ui/Button';

const MainLayout = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const leftNavItems = [
    { path: '/', label: 'Home' },
    { path: '/library', label: 'Wellness Library' },
    { path: '/mood', label: 'Mood Tracker' },
    { path: '/journal', label: 'Journal' },
    { path: '/workouts', label: 'Workouts' },
    { path: '/therapy', label: 'Audio Therapy' },
    { path: '/yoga', label: 'Yoga Therapy' },
    { path: '/content', label: 'Content Library' },
  ];

  const accountNavItems = [
    { path: '/profile', label: 'Profile' },
    { path: '/settings', label: 'Settings' },
  ];

  const navLinkClassName = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 ${
      isActive
        ? 'bg-emerald-50 text-emerald-900 shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(180deg,#f6fbf8_0%,#f3f7f4_56%,#eef3ef_100%)] text-slate-900">
      <header className="border-b border-white/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">CareSuite</h1>
            <p className="mt-1 text-sm text-slate-500">A calmer place for your wellness routine</p>
          </div>
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-slate-900">{currentUser.name}</p>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
              </div>
            )}
            <Button
              onClick={handleLogout}
              variant="secondary"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-900"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <nav className="border-b border-emerald-100 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 py-3">
            {leftNavItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClassName}>
                {item.label}
              </NavLink>
            ))}
            <div className="ml-auto flex flex-wrap gap-2">
              {accountNavItems.map((item) => (
                <NavLink key={item.path} to={item.path} className={navLinkClassName}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="mt-8 border-t border-white/70 bg-white/80 px-4 py-6 text-center text-sm text-slate-500 backdrop-blur">
        &copy; {new Date().getFullYear()} CareSuite
      </footer>
    </div>
  );
};

export default MainLayout;
