import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-secondary-900">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
        <h2 className="mb-8 text-2xl font-bold text-secondary-900 dark:text-white">Page Not Found</h2>
        <p className="mb-8 text-secondary-600 dark:text-secondary-400">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            to="/"
            className="btn-primary flex items-center justify-center"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline flex items-center justify-center"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;