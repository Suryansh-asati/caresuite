import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import Login from '../pages/Login';
import MoodTrackerPage from '../features/mood/pages/MoodTrackerPage';
import JournalPage from '../features/journal/pages/JournalPage';
import WorkoutsPage from '../features/workouts/pages/WorkoutsPage';
import ContentLibrary from '../pages/ContentLibrary';
import { LibraryHomePage } from '../features/library';
import { TherapyDetailPage, TherapyHomePage } from '../features/therapy';
import { YogaDetailPage, YogaHomePage } from '../features/yoga';
import { ProfilePage, SettingsPage } from '../features/profile';
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
          <Route path="therapy" element={<TherapyHomePage />} />
          <Route path="therapy/:id" element={<TherapyDetailPage />} />
          <Route path="audio-therapy" element={<Navigate to="/therapy" replace />} />
          <Route path="yoga" element={<YogaHomePage />} />
          <Route path="yoga/:id" element={<YogaDetailPage />} />
          <Route path="library" element={<LibraryHomePage />} />
          <Route path="library/audio" element={<Navigate to="/therapy" replace />} />
          <Route path="library/yoga" element={<Navigate to="/yoga" replace />} />
          <Route path="library/articles" element={<ContentLibrary />} />
          <Route path="content" element={<ContentLibrary />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* We will add Laugh Therapy, Education etc. here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
