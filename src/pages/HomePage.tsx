import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowRight, Terminal, Zap, Trophy, Users, TrendingUp, CheckCircle } from 'lucide-react';
import ContestDashboard from '../components/features/ContestDashboard';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 px-4 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto text-center relative">
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-3 bg-gray-900/50 rounded-full px-6 py-3 border border-gray-800">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Platform Status: Online</span>
              </div>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl md:text-6xl">
              Code. Compete. <span className="text-primary-400">Conquer.</span>
            </h1>
            <p className="mb-8 text-lg text-gray-400 sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Master competitive programming with our cutting-edge platform. Solve challenging problems, 
              compete with developers worldwide, and level up your coding skills.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/problems" className="btn-primary text-lg px-8 py-3">
                <Terminal size={20} className="mr-2" />
                Start Coding
              </Link>
              <Link to="/auth/register" className="btn-secondary text-lg px-8 py-3">
                Join Community
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contest Dashboard Section */}
      <section className="px-4 py-20 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-4 sm:text-4xl">
              Live Contests & Competitions
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Join live contests, compete with developers worldwide, and climb the leaderboards
            </p>
          </div>
          
          <ContestDashboard />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-100 mb-4 sm:text-4xl">
              Built for Developers
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Experience the next generation of competitive programming with our developer-first approach
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="card group hover:border-primary-800/50 transition-all duration-300">
              <div className="card-content">
                <div className="mb-4 inline-flex rounded-lg bg-primary-900/30 p-3 text-primary-400 group-hover:bg-primary-900/50 transition-colors">
                  <Terminal size={24} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-100">
                  Advanced Code Editor
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Monaco Editor with syntax highlighting, IntelliSense, and multi-language support. 
                  Code like a pro with our VS Code-powered environment.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="card group hover:border-primary-800/50 transition-all duration-300">
              <div className="card-content">
                <div className="mb-4 inline-flex rounded-lg bg-success-900/30 p-3 text-success-400 group-hover:bg-success-900/50 transition-colors">
                  <Zap size={24} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-100">
                  Lightning Fast Execution
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Secure Docker containers with optimized runtime environments. 
                  Get instant feedback with sub-second execution times.
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="card group hover:border-primary-800/50 transition-all duration-300">
              <div className="card-content">
                <div className="mb-4 inline-flex rounded-lg bg-warning-900/30 p-3 text-warning-400 group-hover:bg-warning-900/50 transition-colors">
                  <Trophy size={24} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-100">
                  Global Leaderboards
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Compete with developers worldwide. Track your progress, earn achievements, 
                  and climb the ranks in real-time competitions.
                </p>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="card group hover:border-primary-800/50 transition-all duration-300">
              <div className="card-content">
                <div className="mb-4 inline-flex rounded-lg bg-error-900/30 p-3 text-error-400 group-hover:bg-error-900/50 transition-colors">
                  <Users size={24} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-100">
                  Community Driven
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Join a thriving community of competitive programmers. Share solutions, 
                  discuss algorithms, and learn from the best.
                </p>
              </div>
            </div>
            
            {/* Feature 5 */}
            <div className="card group hover:border-primary-800/50 transition-all duration-300">
              <div className="card-content">
                <div className="mb-4 inline-flex rounded-lg bg-primary-900/30 p-3 text-primary-400 group-hover:bg-primary-900/50 transition-colors">
                  <TrendingUp size={24} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-100">
                  Progress Analytics
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Detailed performance metrics and analytics. Track your improvement 
                  with comprehensive statistics and insights.
                </p>
              </div>
            </div>
            
            {/* Feature 6 */}
            <div className="card group hover:border-primary-800/50 transition-all duration-300">
              <div className="card-content">
                <div className="mb-4 inline-flex rounded-lg bg-success-900/30 p-3 text-success-400 group-hover:bg-success-900/50 transition-colors">
                  <CheckCircle size={24} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-100">
                  Comprehensive Testing
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Rigorous test cases with edge case coverage. Detailed feedback 
                  helps you understand and fix issues quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 bg-gray-925">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">500+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Problems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-400 mb-2">10K+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning-400 mb-2">1M+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Submissions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-error-400 mb-2">24/7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-primary-900/20 to-primary-800/20 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-100 sm:text-4xl">
              Ready to level up your coding skills?
            </h2>
            <p className="mb-8 text-lg text-gray-400">
              Join thousands of developers who are already mastering competitive programming 
              with our platform. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/auth/register" className="btn-primary text-lg px-8 py-3">
                <Code2 size={20} className="mr-2" />
                Get Started Free
              </Link>
              <Link to="/problems" className="btn-secondary text-lg px-8 py-3">
                Explore Problems
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;