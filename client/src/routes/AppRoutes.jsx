import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MoodTracker from '../pages/MoodTracker';
import Journal from '../pages/Journal';
import AudioTherapy from '../pages/AudioTherapy';
import FitnessTracker from '../pages/FitnessTracker';
import { useAuth } from '../context/AuthContext';

// Basic Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="mood" element={<MoodTracker />} />
          <Route path="journal" element={<Journal />} />
          <Route path="fitness" element={<FitnessTracker />} />
          <Route path="audio-therapy" element={<AudioTherapy />} />
          {/* We will add Yoga, Laugh Therapy, Education etc. here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;