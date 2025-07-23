import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-925 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 size={24} className="text-primary-500" />
              <span className="text-lg font-bold text-gray-100">Code Hustle</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              A modern competitive programming platform built for developers who demand excellence.
            </p>
          </div>
          
          <div className="md:col-span-3 md:grid md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Platform
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/problems" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    Problem Set
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                    API Docs
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Connect
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Code Hustle. Built with ❤️ for developers.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;