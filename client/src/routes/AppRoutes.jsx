import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import Login from '../pages/Login';
import MoodTrackerPage from '../features/mood/pages/MoodTrackerPage';
import JournalPage from '../features/journal/pages/JournalPage';
import AudioTherapy from '../pages/AudioTherapy';
import WorkoutsPage from '../features/workouts/pages/WorkoutsPage';
import ContentLibrary from '../pages/ContentLibrary';
import { TherapyHomePage, TherapyDetailPage } from '../features/therapy';
import { useAuth } from '../context/AuthContext';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="mood" element={<MoodTrackerPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="workouts" element={<WorkoutsPage />} />
          <Route path="workouts/:id" element={<WorkoutsPage />} />
          <Route path="fitness" element={<Navigate to="/workouts" replace />} />
          <Route path="audio-therapy" element={<AudioTherapy />} />
          <Route path="content" element={<ContentLibrary />} />
          <Route path="therapy" element={<TherapyHomePage />} />
          <Route path="therapy/:id" element={<TherapyDetailPage />} />
          {/* We will add Yoga, Laugh Therapy, Education etc. here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
