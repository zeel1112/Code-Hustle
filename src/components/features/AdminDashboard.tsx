import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'draft' | 'published' | 'archived';
  submissions: number;
  acceptance: number;
  createdAt: Date;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  joinDate: Date;
  problemsSolved: number;
  lastActive: Date;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'problems' | 'users' | 'submissions'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const mockProblems: Problem[] = [
    {
      id: '1',
      title: 'Two Sum',
      difficulty: 'easy',
      status: 'published',
      submissions: 1425,
      acceptance: 61.5,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Binary Tree Traversal',
      difficulty: 'medium',
      status: 'published',
      submissions: 892,
      acceptance: 45.2,
      createdAt: new Date('2024-01-20')
    },
    {
      id: '3',
      title: 'Graph Algorithms',
      difficulty: 'hard',
      status: 'draft',
      submissions: 0,
      acceptance: 0,
      createdAt: new Date('2024-01-25')
    }
  ];

  const mockUsers: User[] = [
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      role: 'user',
      joinDate: new Date('2024-01-10'),
      problemsSolved: 45,
      lastActive: new Date()
    },
    {
      id: '2',
      username: 'alice_dev',
      email: 'alice@example.com',
      role: 'user',
      joinDate: new Date('2024-01-12'),
      problemsSolved: 67,
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ];

  const stats = {
    totalUsers: 1247,
    totalProblems: 156,
    totalSubmissions: 45678,
    activeUsers: 89
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-content flex items-center space-x-4">
            <div className="p-3 bg-primary-900/30 rounded-lg">
              <Users size={24} className="text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-100">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content flex items-center space-x-4">
            <div className="p-3 bg-success-900/30 rounded-lg">
              <FileText size={24} className="text-success-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Problems</p>
              <p className="text-2xl font-bold text-gray-100">{stats.totalProblems}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content flex items-center space-x-4">
            <div className="p-3 bg-warning-900/30 rounded-lg">
              <BarChart3 size={24} className="text-warning-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-100">{stats.totalSubmissions}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content flex items-center space-x-4">
            <div className="p-3 bg-error-900/30 rounded-lg">
              <Users size={24} className="text-error-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-100">{stats.activeUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-100">Recent Activity</h3>
        </div>
        <div className="card-content">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm text-gray-300">New user registered: alice_coder</span>
              <span className="text-xs text-gray-500 ml-auto">2 minutes ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Problem "Dynamic Programming Basics" published</span>
              <span className="text-xs text-gray-500 ml-auto">15 minutes ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
              <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Contest "Weekly Challenge #47" started</span>
              <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProblems = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-100">Problem Management</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems..."
              className="input pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-secondary">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button className="btn-primary">
            <Plus size={16} className="mr-2" />
            Add Problem
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Status</th>
                <th>Submissions</th>
                <th>Acceptance</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProblems.map((problem) => (
                <tr key={problem.id} className="table-row">
                  <td className="table-cell font-medium text-gray-100">
                    {problem.title}
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${
                      problem.difficulty === 'easy' ? 'badge-easy' :
                      problem.difficulty === 'medium' ? 'badge-medium' : 'badge-hard'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${
                      problem.status === 'published' ? 'badge-accepted' :
                      problem.status === 'draft' ? 'badge-tle' : 'badge-wrong'
                    }`}>
                      {problem.status}
                    </span>
                  </td>
                  <td className="table-cell">{problem.submissions}</td>
                  <td className="table-cell">{problem.acceptance}%</td>
                  <td className="table-cell">{problem.createdAt.toLocaleDateString()}</td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-primary-400">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-warning-400">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-error-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-100">User Management</h2>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="btn-secondary">
            <Upload size={16} className="mr-2" />
            Import
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Problems Solved</th>
                <th>Join Date</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="table-cell font-medium text-gray-100">
                    {user.username}
                  </td>
                  <td className="table-cell">{user.email}</td>
                  <td className="table-cell">
                    <span className={`badge ${
                      user.role === 'admin' ? 'badge-accepted' : 'badge-tle'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="table-cell">{user.problemsSolved}</td>
                  <td className="table-cell">{user.joinDate.toLocaleDateString()}</td>
                  <td className="table-cell">
                    {user.lastActive.toLocaleDateString()}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-primary-400">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-warning-400">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'problems', label: 'Problems', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'submissions', label: 'Submissions', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-100 mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your competitive programming platform</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'problems' && renderProblems()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'submissions' && (
          <div className="text-center py-12">
            <p className="text-gray-400">Submissions management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;