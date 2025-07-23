import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock API calls for authentication
const mockLogin = async (email: string, password: string) => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, any email/password combination works
  // In a real app, this would validate credentials against a backend
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTYxNjE1MTYxNiwiZXhwIjoxNjE2MjM4MDE2fQ.ZQmV66HRYrb9TI-xQ-7cYgNe-_K2nIZV32u3WaGrF7A';
  
  localStorage.setItem('auth_token', token);
  return token;
};

const mockRegister = async (username: string, email: string, password: string) => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, any registration info works
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTYxNjE1MTYxNiwiZXhwIjoxNjE2MjM4MDE2fQ.ZQmV66HRYrb9TI-xQ-7cYgNe-_K2nIZV32u3WaGrF7A';
  
  localStorage.setItem('auth_token', token);
  return token;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing auth token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          // In a real app, you would validate the token with your backend
          const decoded = jwtDecode<User>(token);
          setUser(decoded);
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('auth_token');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const token = await mockLogin(email, password);
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      navigate('/problems');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const token = await mockRegister(username, email, password);
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      navigate('/problems');
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};