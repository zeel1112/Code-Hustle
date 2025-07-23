import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Search, Medal } from 'lucide-react';
import { leaderboardData } from '../utils/leaderboardData';

const LeaderboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeaderboard = leaderboardData.filter(entry => 
    entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto animate-fadeIn px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Leaderboard</h1>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            Top competitive programmers ranked by performance and problem-solving skills
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
          <input
            type="text"
            placeholder="Search by username or country..."
            className="input pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Top 3 Winners Highlight */}
      <div className="mb-10 hidden lg:block">
        <div className="grid grid-cols-3 gap-4">
          {/* 2nd Place */}
          <div className="col-start-1 flex flex-col items-center">
            <div className="relative">
              <div className="mb-2 flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 p-1 dark:bg-secondary-700">
                <img
                  src={leaderboardData[1].avatar}
                  alt={leaderboardData[1].username}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-gray-100 dark:bg-secondary-800">
                <Medal size={24} className="text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-secondary-900 dark:text-white">
              {leaderboardData[1].username}
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">{leaderboardData[1].score} points</p>
          </div>
          
          {/* 1st Place */}
          <div className="col-start-2 flex flex-col items-center">
            <div className="relative">
              <div className="mb-2 flex h-36 w-36 items-center justify-center rounded-full bg-primary-100 p-1 ring-4 ring-primary-300 dark:bg-primary-900/30 dark:ring-primary-800">
                <img
                  src={leaderboardData[0].avatar}
                  alt={leaderboardData[0].username}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-yellow-100 shadow-md dark:bg-yellow-900">
                <Trophy size={28} className="text-yellow-500" />
              </div>
            </div>
            <h3 className="mt-6 text-xl font-bold text-secondary-900 dark:text-white">
              {leaderboardData[0].username}
            </h3>
            <p className="text-lg font-medium text-primary-600 dark:text-primary-400">{leaderboardData[0].score} points</p>
          </div>
          
          {/* 3rd Place */}
          <div className="col-start-3 flex flex-col items-center">
            <div className="relative">
              <div className="mb-2 flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 p-1 dark:bg-secondary-700">
                <img
                  src={leaderboardData[2].avatar}
                  alt={leaderboardData[2].username}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-gray-100 dark:bg-secondary-800">
                <Medal size={24} className="text-amber-700 dark:text-amber-600" />
              </div>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-secondary-900 dark:text-white">
              {leaderboardData[2].username}
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">{leaderboardData[2].score} points</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-hidden rounded-lg border border-secondary-200 bg-white shadow-sm dark:border-secondary-800 dark:bg-secondary-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                  Problems Solved
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                  Country
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                  Streak
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 bg-white dark:divide-secondary-700 dark:bg-secondary-800">
              {filteredLeaderboard.length > 0 ? (
                filteredLeaderboard.map((entry) => (
                  <tr 
                    key={entry.rank}
                    className={`transition-colors hover:bg-secondary-50 dark:hover:bg-secondary-700 ${
                      entry.rank <= 3 ? 'bg-secondary-50/50 dark:bg-secondary-800/70' : ''
                    }`}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        {entry.rank === 1 ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-sm font-bold text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400">
                            1
                          </div>
                        ) : entry.rank === 2 ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            2
                          </div>
                        ) : entry.rank === 3 ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700 dark:bg-amber-900/50 dark:text-amber-500">
                            3
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">{entry.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={entry.avatar}
                            alt={entry.username}
                          />
                        </div>
                        <div className="ml-4">
                          <Link
                            to={`/profile/${entry.username}`}
                            className="text-sm font-medium text-secondary-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                          >
                            {entry.username}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-secondary-900 dark:text-white">
                        {entry.score.toLocaleString()}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-secondary-600 dark:text-secondary-400">
                        {entry.problemsSolved.toLocaleString()}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <span className="mr-2 text-sm text-secondary-600 dark:text-secondary-400">
                          {entry.country}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2 w-16 rounded-full bg-secondary-200 dark:bg-secondary-700">
                          <div
                            className="h-2 rounded-full bg-primary-600 dark:bg-primary-500"
                            style={{ width: `${Math.min(100, (entry.streakDays / 120) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-secondary-600 dark:text-secondary-400">
                          {entry.streakDays} days
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-secondary-500 dark:text-secondary-400">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;