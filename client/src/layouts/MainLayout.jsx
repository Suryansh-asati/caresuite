import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">CareSuite</h1>
        </div>
      </header>
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