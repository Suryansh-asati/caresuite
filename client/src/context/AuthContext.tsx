import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, LoginData, RegisterData, User } from '../services/auth.api';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // You could restore token into axios/fetch headers here
          const user = await authApi.getMe();
          setCurrentUser(user);
        } catch (error) {
          console.error("Session restoration failed:", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (data: LoginData) => {
    const authData = await authApi.login(data);
    localStorage.setItem('token', authData.token);
    setCurrentUser(authData.user);
  };

  const register = async (data: RegisterData) => {
    const authData = await authApi.register(data);
    localStorage.setItem('token', authData.token);
    setCurrentUser(authData.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
