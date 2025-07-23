import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, SortAsc, SortDesc, Code, Clock, Users, CheckCircle } from 'lucide-react';
import { problems } from '../utils/problemsData';

type Difficulty = 'all' | 'easy' | 'medium' | 'hard';
type SortField = 'id' | 'title' | 'acceptanceRate' | 'difficulty';
type SortOrder = 'asc' | 'desc';

const ProblemsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    problems.forEach(problem => {
      problem.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, []);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredProblems = useMemo(() => {
    return problems
      .filter(problem => {
        // Filter by search query
        if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Filter by difficulty
        if (difficulty !== 'all' && problem.difficulty !== difficulty) {
          return false;
        }
        
        // Filter by tags
        if (selectedTags.length > 0 && !selectedTags.some(tag => problem.tags.includes(tag))) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        const multiplier = sortOrder === 'asc' ? 1 : -1;
        
        switch (sortField) {
          case 'title':
            return multiplier * a.title.localeCompare(b.title);
          case 'acceptanceRate': {
            const rateA = (a.acceptedCount / a.submissionCount) * 100;
            const rateB = (b.acceptedCount / b.submissionCount) * 100;
            return multiplier * (rateA - rateB);
          }
          case 'difficulty': {
            const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
            return multiplier * (difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
          }
          case 'id':
          default:
            return multiplier * (parseInt(a.id) - parseInt(b.id));
        }
      });
  }, [searchQuery, difficulty, selectedTags, sortField, sortOrder]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'badge-easy';
      case 'medium':
        return 'badge-medium';
      case 'hard':
        return 'badge-hard';
      default:
        return '';
    }
  };

  const getAcceptanceRate = (accepted: number, submissions: number) => {
    return submissions > 0 ? ((accepted / submissions) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-100 mb-2">Problem Set</h1>
              <p className="text-gray-400">
                Solve {problems.length} coding challenges and improve your skills
              </p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="input pl-10 w-64"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary ${showFilters ? 'bg-gray-700' : ''}`}
              >
                <Filter size={16} className="mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="card mb-6 animate-slide-down">
              <div className="card-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Difficulty Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Difficulty</h3>
                    <div className="flex flex-wrap gap-2">
                      {(['all', 'easy', 'medium', 'hard'] as const).map(diff => (
                        <button
                          key={diff}
                          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            difficulty === diff
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                          onClick={() => setDifficulty(diff)}
                        >
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto scrollbar-thin">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Problems Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="w-16">
                    <button
                      className="flex items-center space-x-1 hover:text-gray-100 transition-colors"
                      onClick={() => handleSort('id')}
                    >
                      <span>#</span>
                      {sortField === 'id' && (
                        sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </button>
                  </th>
                  <th>
                    <button
                      className="flex items-center space-x-1 hover:text-gray-100 transition-colors"
                      onClick={() => handleSort('title')}
                    >
                      <span>Title</span>
                      {sortField === 'title' && (
                        sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </button>
                  </th>
                  <th className="w-24">
                    <button
                      className="flex items-center space-x-1 hover:text-gray-100 transition-colors"
                      onClick={() => handleSort('acceptanceRate')}
                    >
                      <span>Acceptance</span>
                      {sortField === 'acceptanceRate' && (
                        sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </button>
                  </th>
                  <th className="w-24">
                    <button
                      className="flex items-center space-x-1 hover:text-gray-100 transition-colors"
                      onClick={() => handleSort('difficulty')}
                    >
                      <span>Difficulty</span>
                      {sortField === 'difficulty' && (
                        sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </button>
                  </th>
                  <th className="w-20">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.length > 0 ? (
                  filteredProblems.map(problem => (
                    <tr key={problem.id} className="table-row">
                      <td className="table-cell font-mono text-gray-400">
                        {problem.id}
                      </td>
                      <td className="table-cell">
                        <div>
                          <Link 
                            to={`/problems/${problem.id}`}
                            className="font-medium text-gray-100 hover:text-primary-400 transition-colors"
                          >
                            {problem.title}
                          </Link>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {problem.tags.slice(0, 3).map(tag => (
                              <span 
                                key={tag} 
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300"
                              >
                                {tag}
                              </span>
                            ))}
                            {problem.tags.length > 3 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-400">
                                +{problem.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">
                            {getAcceptanceRate(problem.acceptedCount, problem.submissionCount)}%
                          </span>
                          <div className="w-12 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-500 rounded-full"
                              style={{ 
                                width: `${getAcceptanceRate(problem.acceptedCount, problem.submissionCount)}%` 
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className={getDifficultyColor(problem.difficulty)}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                      </td>
                      <td className="table-cell">
                        <Link
                          to={`/problems/${problem.id}`}
                          className="btn-primary text-xs px-3 py-1.5"
                        >
                          <Code size={14} className="mr-1" />
                          Solve
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="table-cell text-center py-12">
                      <div className="text-gray-400">
                        <Search size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">No problems found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card">
            <div className="card-content flex items-center space-x-3">
              <div className="p-2 bg-primary-900/30 rounded-lg">
                <Code size={20} className="text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Problems</p>
                <p className="text-lg font-semibold text-gray-100">{problems.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-content flex items-center space-x-3">
              <div className="p-2 bg-success-900/30 rounded-lg">
                <CheckCircle size={20} className="text-success-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Solved</p>
                <p className="text-lg font-semibold text-gray-100">0</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-content flex items-center space-x-3">
              <div className="p-2 bg-warning-900/30 rounded-lg">
                <Clock size={20} className="text-warning-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Attempted</p>
                <p className="text-lg font-semibold text-gray-100">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsPage;