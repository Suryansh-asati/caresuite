import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MoodTrackerPage from '../features/mood/pages/MoodTrackerPage';
import JournalPage from '../features/journal/pages/JournalPage';
import AudioTherapy from '../pages/AudioTherapy';
import FitnessTracker from '../pages/FitnessTracker';
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
          <Route index element={<Home />} />
          <Route path="mood" element={<MoodTrackerPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="fitness" element={<FitnessTracker />} />
          <Route path="audio-therapy" element={<AudioTherapy />} />
          {/* We will add Yoga, Laugh Therapy, Education etc. here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
