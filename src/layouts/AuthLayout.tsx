import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import ThemeToggle from '../components/common/ThemeToggle';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Code2 size={24} className="text-primary-500" />
          <span className="text-lg font-bold text-gray-100">Code Hustle</span>
        </Link>
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <Outlet />
      </div>
      
      <footer className="py-6 text-center text-sm text-gray-400 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Code Hustle. Built for developers.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;