import React from 'react';
import { useParams } from 'react-router-dom';
import { CalendarDays, Code, Award, BookOpen, Clock, Github, Twitter, Linkedin, MapPin, Briefcase } from 'lucide-react';
import { problems } from '../utils/problemsData';

interface SubmissionData {
  problemId: string;
  problemTitle: string;
  date: string;
  status: 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'runtime_error';
  language: string;
  runtime: string;
}

const mockUserData = {
  username: 'johnDoe',
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=68',
  joined: 'March 2023',
  location: 'San Francisco, CA',
  occupation: 'Software Engineer',
  bio: 'Passionate programmer and algorithm enthusiast. I love solving challenging problems and learning new technologies.',
  stats: {
    problemsSolved: 127,
    totalSubmissions: 342,
    acceptanceRate: 78,
    streak: 24,
    ranking: 1547,
    points: 4580,
  },
  problemStats: {
    easy: { solved: 75, total: 120 },
    medium: { solved: 42, total: 180 },
    hard: { solved: 10, total: 80 },
  },
  socialLinks: {
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
  recentSubmissions: [
    {
      problemId: '1',
      problemTitle: 'Two Sum',
      date: '2 hours ago',
      status: 'accepted',
      language: 'JavaScript',
      runtime: '76 ms',
    },
    {
      problemId: '3',
      problemTitle: 'Maximum Subarray',
      date: '1 day ago',
      status: 'accepted',
      language: 'Python',
      runtime: '124 ms',
    },
    {
      problemId: '5',
      problemTitle: 'Valid Parentheses',
      date: '2 days ago',
      status: 'wrong_answer',
      language: 'C++',
      runtime: '0 ms',
    },
    {
      problemId: '2',
      problemTitle: 'Palindrome Checker',
      date: '3 days ago',
      status: 'accepted',
      language: 'JavaScript',
      runtime: '92 ms',
    },
    {
      problemId: '8',
      problemTitle: 'Longest Substring Without Repeating Characters',
      date: '5 days ago',
      status: 'time_limit_exceeded',
      language: 'Python',
      runtime: '0 ms',
    },
  ] as SubmissionData[],
};

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const userData = mockUserData; // In a real app, you would fetch user data based on the username

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-success-600 dark:text-success-400';
      case 'wrong_answer':
        return 'text-error-600 dark:text-error-400';
      case 'time_limit_exceeded':
        return 'text-warning-600 dark:text-warning-400';
      case 'runtime_error':
        return 'text-error-600 dark:text-error-400';
      default:
        return 'text-secondary-600 dark:text-secondary-400';
    }
  };

  return (
    <div className="container mx-auto animate-fadeIn px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column - User info */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-lg border border-secondary-200 bg-white p-6 shadow-sm dark:border-secondary-800 dark:bg-secondary-800">
            <div className="mb-6 flex flex-col items-center text-center">
              <img
                src={userData.avatar}
                alt={userData.username}
                className="mb-4 h-24 w-24 rounded-full"
              />
              <h1 className="mb-1 text-2xl font-bold text-secondary-900 dark:text-white">{userData.name}</h1>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">@{userData.username}</p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                  <CalendarDays size={16} className="mr-1" />
                  <span>Joined {userData.joined}</span>
                </div>
                {userData.location && (
                  <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                    <MapPin size={16} className="mr-1" />
                    <span>{userData.location}</span>
                  </div>
                )}
                {userData.occupation && (
                  <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                    <Briefcase size={16} className="mr-1" />
                    <span>{userData.occupation}</span>
                  </div>
                )}
              </div>
            </div>
            
            {userData.bio && (
              <div className="mb-6 border-b border-secondary-200 pb-6 dark:border-secondary-700">
                <p className="text-sm text-secondary-700 dark:text-secondary-300">
                  {userData.bio}
                </p>
              </div>
            )}
            
            <div className="mb-6 border-b border-secondary-200 pb-6 dark:border-secondary-700">
              <h2 className="mb-4 text-lg font-semibold text-secondary-900 dark:text-white">Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Problems Solved</p>
                  <p className="text-xl font-bold text-secondary-900 dark:text-white">{userData.stats.problemsSolved}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Submissions</p>
                  <p className="text-xl font-bold text-secondary-900 dark:text-white">{userData.stats.totalSubmissions}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Acceptance Rate</p>
                  <p className="text-xl font-bold text-secondary-900 dark:text-white">{userData.stats.acceptanceRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Daily Streak</p>
                  <p className="text-xl font-bold text-secondary-900 dark:text-white">{userData.stats.streak} days</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Ranking</p>
                  <p className="text-xl font-bold text-secondary-900 dark:text-white">#{userData.stats.ranking}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Points</p>
                  <p className="text-xl font-bold text-secondary-900 dark:text-white">{userData.stats.points}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 border-b border-secondary-200 pb-6 dark:border-secondary-700">
              <h2 className="mb-4 text-lg font-semibold text-secondary-900 dark:text-white">Problem Solving</h2>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-success-600 dark:text-success-400">Easy</span>
                    <span className="text-xs text-secondary-600 dark:text-secondary-400">
                      {userData.problemStats.easy.solved} / {userData.problemStats.easy.total}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary-200 dark:bg-secondary-700">
                    <div
                      className="h-2 rounded-full bg-success-500"
                      style={{ width: `${(userData.problemStats.easy.solved / userData.problemStats.easy.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-warning-600 dark:text-warning-400">Medium</span>
                    <span className="text-xs text-secondary-600 dark:text-secondary-400">
                      {userData.problemStats.medium.solved} / {userData.problemStats.medium.total}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary-200 dark:bg-secondary-700">
                    <div
                      className="h-2 rounded-full bg-warning-500"
                      style={{ width: `${(userData.problemStats.medium.solved / userData.problemStats.medium.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-error-600 dark:text-error-400">Hard</span>
                    <span className="text-xs text-secondary-600 dark:text-secondary-400">
                      {userData.problemStats.hard.solved} / {userData.problemStats.hard.total}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary-200 dark:bg-secondary-700">
                    <div
                      className="h-2 rounded-full bg-error-500"
                      style={{ width: `${(userData.problemStats.hard.solved / userData.problemStats.hard.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="mb-4 text-lg font-semibold text-secondary-900 dark:text-white">Connect</h2>
              <div className="flex space-x-4">
                {userData.socialLinks.github && (
                  <a
                    href={userData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-secondary-600 transition-colors hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white"
                  >
                    <Github size={20} />
                    <span className="sr-only">GitHub</span>
                  </a>
                )}
                {userData.socialLinks.twitter && (
                  <a
                    href={userData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-secondary-600 transition-colors hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white"
                  >
                    <Twitter size={20} />
                    <span className="sr-only">Twitter</span>
                  </a>
                )}
                {userData.socialLinks.linkedin && (
                  <a
                    href={userData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-secondary-600 transition-colors hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white"
                  >
                    <Linkedin size={20} />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Activity */}
        <div className="lg:col-span-2">
          {/* Summary Cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-secondary-200 bg-white p-4 shadow-sm dark:border-secondary-800 dark:bg-secondary-800">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary-100 p-3 dark:bg-primary-900/30">
                  <Code size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Problems Solved</p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">{userData.stats.problemsSolved}</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-secondary-200 bg-white p-4 shadow-sm dark:border-secondary-800 dark:bg-secondary-800">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-warning-100 p-3 dark:bg-warning-900/30">
                  <Award size={20} className="text-warning-600 dark:text-warning-400" />
                </div>
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Global Rank</p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">#{userData.stats.ranking}</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-secondary-200 bg-white p-4 shadow-sm dark:border-secondary-800 dark:bg-secondary-800">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-success-100 p-3 dark:bg-success-900/30">
                  <Clock size={20} className="text-success-600 dark:text-success-400" />
                </div>
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Current Streak</p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">{userData.stats.streak} days</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Submissions */}
          <div className="mb-8 rounded-lg border border-secondary-200 bg-white p-6 shadow-sm dark:border-secondary-800 dark:bg-secondary-800">
            <h2 className="mb-4 text-xl font-semibold text-secondary-900 dark:text-white">Recent Submissions</h2>
            
            <div className="overflow-hidden rounded-lg border border-secondary-200 dark:border-secondary-700">
              <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
                <thead className="bg-secondary-50 dark:bg-secondary-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                      Problem
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                      Language
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                      Runtime
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-200 bg-white dark:divide-secondary-700 dark:bg-secondary-800">
                  {userData.recentSubmissions.map((submission, index) => (
                    <tr key={index} className="hover:bg-secondary-50 dark:hover:bg-secondary-700">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                        <a
                          href={`/problems/${submission.problemId}`}
                          className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          {submission.problemTitle}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span className={getStatusColor(submission.status)}>
                          {submission.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary-600 dark:text-secondary-400">
                        {submission.language}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary-600 dark:text-secondary-400">
                        {submission.runtime}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary-600 dark:text-secondary-400">
                        {submission.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Solved Problems */}
          <div className="rounded-lg border border-secondary-200 bg-white p-6 shadow-sm dark:border-secondary-800 dark:bg-secondary-800">
            <h2 className="mb-4 text-xl font-semibold text-secondary-900 dark:text-white">Solved Problems</h2>
            
            <div className="mb-4 flex gap-2">
              <button className="rounded-md bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-400">
                All
              </button>
              <button className="rounded-md px-3 py-1 text-sm font-medium text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800">
                Easy
              </button>
              <button className="rounded-md px-3 py-1 text-sm font-medium text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800">
                Medium
              </button>
              <button className="rounded-md px-3 py-1 text-sm font-medium text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800">
                Hard
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {problems.slice(0, 6).map((problem) => (
                <a
                  key={problem.id}
                  href={`/problems/${problem.id}`}
                  className="flex flex-col rounded-md border border-secondary-200 p-3 transition-colors hover:border-primary-300 hover:bg-primary-50 dark:border-secondary-700 dark:hover:border-primary-800 dark:hover:bg-primary-900/10"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-secondary-900 dark:text-white">
                        {problem.title}
                      </h3>
                      <p className="mt-1 text-xs text-secondary-600 dark:text-secondary-400">
                        Problem #{problem.id}
                      </p>
                    </div>
                    <span className={`badge ${problem.difficulty === 'easy' ? 'badge-easy' : problem.difficulty === 'medium' ? 'badge-medium' : 'badge-hard'}`}>
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
                View All Solved Problems
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;