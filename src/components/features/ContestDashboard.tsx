import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Users, Calendar, Star, Award, TrendingUp } from 'lucide-react';

interface Contest {
  id: string;
  title: string;
  type: 'individual' | 'team';
  status: 'upcoming' | 'live' | 'ended';
  startTime: Date;
  duration: number; // in minutes
  participants: number;
  problems: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prize?: string;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  solved: number;
  penalty: number;
  lastSubmission: Date;
}

const ContestDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'past'>('live');
  const [contests] = useState<Contest[]>([
    {
      id: '1',
      title: 'Weekly Challenge #47',
      type: 'individual',
      status: 'live',
      startTime: new Date(Date.now() - 30 * 60 * 1000), // Started 30 mins ago
      duration: 120,
      participants: 1247,
      problems: 4,
      difficulty: 'intermediate'
    },
    {
      id: '2',
      title: 'Team Battle: Algorithms',
      type: 'team',
      status: 'upcoming',
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // In 2 hours
      duration: 180,
      participants: 89,
      problems: 6,
      difficulty: 'advanced',
      prize: '$500 Prize Pool'
    },
    {
      id: '3',
      title: 'Beginner Bootcamp',
      type: 'individual',
      status: 'upcoming',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      duration: 90,
      participants: 456,
      problems: 3,
      difficulty: 'beginner'
    }
  ]);

  const [leaderboard] = useState<LeaderboardEntry[]>([
    { rank: 1, username: 'codingmaster', score: 3847, solved: 4, penalty: 23, lastSubmission: new Date() },
    { rank: 2, username: 'algoexpert', score: 3621, solved: 4, penalty: 45, lastSubmission: new Date() },
    { rank: 3, username: 'devninja', score: 3456, solved: 3, penalty: 12, lastSubmission: new Date() },
    { rank: 4, username: 'bytewizard', score: 3234, solved: 3, penalty: 34, lastSubmission: new Date() },
    { rank: 5, username: 'codegeek', score: 2987, solved: 3, penalty: 67, lastSubmission: new Date() }
  ]);

  const getStatusColor = (status: Contest['status']) => {
    switch (status) {
      case 'live':
        return 'text-success-400 bg-success-900/30 border-success-800/50';
      case 'upcoming':
        return 'text-warning-400 bg-warning-900/30 border-warning-800/50';
      case 'ended':
        return 'text-gray-400 bg-gray-900/30 border-gray-800/50';
    }
  };

  const getDifficultyColor = (difficulty: Contest['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'badge-easy';
      case 'intermediate':
        return 'badge-medium';
      case 'advanced':
        return 'badge-hard';
    }
  };

  const formatTimeRemaining = (startTime: Date, duration: number, status: Contest['status']) => {
    const now = new Date();
    
    if (status === 'upcoming') {
      const diff = startTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `Starts in ${hours}h ${minutes}m`;
    }
    
    if (status === 'live') {
      const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
      const diff = endTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m remaining`;
    }
    
    return 'Ended';
  };

  const liveContest = contests.find(c => c.status === 'live');

  return (
    <div className="space-y-6">
      {/* Live Contest Banner */}
      {liveContest && (
        <div className="card border-success-800/50 bg-success-900/10">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-success-900/30 flex items-center justify-center">
                  <Trophy size={24} className="text-success-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">{liveContest.title}</h3>
                  <p className="text-sm text-gray-400">
                    {formatTimeRemaining(liveContest.startTime, liveContest.duration, liveContest.status)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success-400">{liveContest.participants}</p>
                  <p className="text-xs text-gray-400">Participants</p>
                </div>
                <button className="btn-primary">
                  Join Contest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contest List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-100">Contests</h2>
                <div className="flex space-x-1">
                  {(['upcoming', 'live', 'past'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card-content">
              <div className="space-y-4">
                {contests
                  .filter(contest => {
                    if (activeTab === 'live') return contest.status === 'live';
                    if (activeTab === 'upcoming') return contest.status === 'upcoming';
                    return contest.status === 'ended';
                  })
                  .map((contest) => (
                    <div key={contest.id} className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-100 mb-1">{contest.title}</h3>
                          <div className="flex items-center space-x-3 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {contest.startTime.toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {contest.duration}m
                            </span>
                            <span className="flex items-center">
                              <Users size={14} className="mr-1" />
                              {contest.participants}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`badge ${getStatusColor(contest.status)}`}>
                            {contest.status.toUpperCase()}
                          </span>
                          <span className={getDifficultyColor(contest.difficulty)}>
                            {contest.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{contest.problems} problems</span>
                          <span className="capitalize">{contest.type}</span>
                          {contest.prize && (
                            <span className="text-warning-400 flex items-center">
                              <Award size={14} className="mr-1" />
                              {contest.prize}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">
                          {formatTimeRemaining(contest.startTime, contest.duration, contest.status)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Leaderboard */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-gray-100 flex items-center">
                <TrendingUp size={20} className="mr-2" />
                Live Leaderboard
              </h2>
            </div>
            
            <div className="card-content">
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      entry.rank === 1 ? 'bg-warning-900/30 text-warning-400' :
                      entry.rank === 2 ? 'bg-gray-700 text-gray-300' :
                      entry.rank === 3 ? 'bg-amber-900/30 text-amber-600' :
                      'bg-gray-800 text-gray-400'
                    }`}>
                      {entry.rank}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-100 truncate">
                        {entry.username}
                      </p>
                      <p className="text-xs text-gray-400">
                        {entry.solved} solved • {entry.score} pts
                      </p>
                    </div>
                    
                    {entry.rank <= 3 && (
                      <Star size={14} className={
                        entry.rank === 1 ? 'text-warning-400' :
                        entry.rank === 2 ? 'text-gray-400' :
                        'text-amber-600'
                      } />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-800">
                <button className="w-full text-sm text-primary-400 hover:text-primary-300 transition-colors">
                  View Full Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDashboard;