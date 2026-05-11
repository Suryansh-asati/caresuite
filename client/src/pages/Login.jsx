import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Login failed');
        setIsLoading(false);
        return;
      }

      // Store token and user in context
      const { user, token } = result.data;
      login(user, token);
      navigate('/');
    } catch (err) {
      const msg =
        (err && typeof err.message === 'string' && err.message) ||
        (typeof err === 'string' ? err : String(err)) ||
        'An error occurred';
      setError(msg);
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'User', email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        // If account already exists, switch to login mode with helpful message
        if (response.status === 409 || result.message?.includes('already registered')) {
          setError(
            'Account already exists! Switching to login mode. Please sign in with your credentials.'
          );
          setIsSignUp(false);
          setIsLoading(false);
          return;
        }
        setError(result.message || 'Registration failed');
        setIsLoading(false);
        return;
      }

      // Store token and user in context
      const { user, token } = result.data;
      login(user, token);
      navigate('/');
    } catch (err) {
      const msg =
        (err && typeof err.message === 'string' && err.message) ||
        (typeof err === 'string' ? err : String(err)) ||
        'An error occurred';
      setError(msg);
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {isSignUp ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </div>

        {error && (
          <div
            className={`p-3 rounded text-sm ${
              error.includes('already exists')
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
          >
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={isSignUp ? handleRegister : handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                placeholder="password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading
              ? isSignUp
                ? 'Creating account...'
                : 'Signing in...'
              : isSignUp
                ? 'Create Account'
                : 'Sign In'}
          </button>
        </form>

        {!isSignUp && import.meta.env.DEV && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
            <p className="font-medium">Demo credentials:</p>
            <p>Email: test@caresuite.com</p>
            <p>Password: Test@123456</p>
          </div>
        )}
        )}
      </div>
    </div>
  );
};

export default Login;
