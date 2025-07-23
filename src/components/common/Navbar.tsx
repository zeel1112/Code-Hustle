import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Code2, Menu, X, User, LogOut, Settings, Trophy } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link-active' : 'nav-link-inactive';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-925/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenus}>
            <Code2 size={24} className="text-primary-500" />
            <span className="text-lg font-bold text-gray-100">Code Hustle</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              <li>
                <NavLink to="/" className={navLinkClasses} end>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/problems" className={navLinkClasses}>
                  Problems
                </NavLink>
              </li>
              <li>
                <NavLink to="/leaderboard" className={navLinkClasses}>
                  <Trophy size={16} className="mr-1.5" />
                  Leaderboard
                </NavLink>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <NavLink to="/admin" className={navLinkClasses}>
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                <span className="hidden sm:inline-block">{user?.username}</span>
                <User size={16} />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right animate-slide-down rounded-lg border border-gray-800 bg-gray-900 shadow-dark-lg">
                  <div className="py-2" role="menu">
                    <div className="px-4 py-2 border-b border-gray-800">
                      <p className="text-sm font-medium text-gray-100">{user?.username}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    <Link
                      to={`/profile/${user?.username}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                      onClick={closeMenus}
                    >
                      <User size={16} className="mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                      onClick={closeMenus}
                    >
                      <Settings size={16} className="mr-3" />
                      Settings
                    </Link>
                    <div className="border-t border-gray-800 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-error-400 hover:bg-gray-800"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex sm:items-center sm:space-x-2">
              <Link to="/auth/login" className="btn-ghost">
                Sign in
              </Link>
              <Link to="/auth/register" className="btn-primary">
                Sign up
              </Link>
            </div>
          )}
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="btn-ghost p-2 md:hidden"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-925">
          <div className="space-y-1 px-4 py-4">
            <NavLink
              to="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-gray-100"
              onClick={closeMenus}
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/problems"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-gray-100"
              onClick={closeMenus}
            >
              Problems
            </NavLink>
            <NavLink
              to="/leaderboard"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-gray-100"
              onClick={closeMenus}
            >
              Leaderboard
            </NavLink>
            
            {!isAuthenticated && (
              <div className="mt-4 space-y-2 border-t border-gray-800 pt-4">
                <Link
                  to="/auth/login"
                  className="block w-full rounded-lg px-3 py-2 text-center text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                  onClick={closeMenus}
                >
                  Sign in
                </Link>
                <Link
                  to="/auth/register"
                  className="block w-full rounded-lg bg-primary-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-primary-700"
                  onClick={closeMenus}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;