import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  ChevronLeft, 
  Play, 
  Clock, 
  Users, 
  Clipboard, 
  Check, 
  AlertTriangle, 
  XCircle, 
  List, 
  FileText,
  Settings,
  Maximize2,
  Minimize2,
  Bot,
  MessageSquare
} from 'lucide-react';
import { problems } from '../utils/problemsData';
import AIAssistant from '../components/features/AIAssistant';
import CollaborationPanel from '../components/features/CollaborationPanel';

type Language = 'python' | 'javascript' | 'cpp';
type SubmissionStatus = 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'runtime_error' | null;

interface SubmissionResult {
  status: SubmissionStatus;
  runtime: string;
  memory: string;
  message?: string;
}

const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const problem = problems.find(p => p.id === id);

  const [selectedLanguage, setSelectedLanguage] = useState<Language>('python');
  const [code, setCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'description' | 'submissions'>('description');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);

  useEffect(() => {
    // Set initial code based on selected language
    if (problem) {
      setCode(problem.solutionTemplate[selectedLanguage]);
    }
  }, [problem, selectedLanguage]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Problem not found</h1>
          <button 
            onClick={() => navigate('/problems')}
            className="btn-primary"
          >
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as Language;
    setSelectedLanguage(newLanguage);
    setCode(problem.solutionTemplate[newLanguage]);
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setSubmissionResult(null);
    
    // Simulate submission delay
    setTimeout(() => {
      // Mock submission result (randomly success or fail)
      const statuses: SubmissionStatus[] = ['accepted', 'wrong_answer', 'time_limit_exceeded', 'runtime_error'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const result: SubmissionResult = {
        status: randomStatus,
        runtime: `${Math.floor(Math.random() * 100)} ms`,
        memory: `${Math.floor(Math.random() * 10) + 1} MB`,
      };
      
      if (randomStatus !== 'accepted') {
        result.message = {
          'wrong_answer': 'Your output does not match the expected output for test case #2.',
          'time_limit_exceeded': 'Your solution exceeded the time limit. Consider optimizing your algorithm.',
          'runtime_error': `Runtime Error: ${selectedLanguage === 'python' ? 'IndexError: list index out of range' : selectedLanguage === 'javascript' ? 'TypeError: Cannot read property of undefined' : 'Segmentation fault'}`
        }[randomStatus] || 'An error occurred during execution.';
      }
      
      setSubmissionResult(result);
      setIsSubmitting(false);
    }, 2000);
  };

  const getStatusIcon = (status: SubmissionStatus) => {
    switch (status) {
      case 'accepted':
        return <Check size={20} className="text-success-400" />;
      case 'time_limit_exceeded':
        return <Clock size={20} className="text-warning-400" />;
      default:
        return <XCircle size={20} className="text-error-400" />;
    }
  };

  const getStatusText = (status: SubmissionStatus) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'wrong_answer':
        return 'Wrong Answer';
      case 'time_limit_exceeded':
        return 'Time Limit Exceeded';
      case 'runtime_error':
        return 'Runtime Error';
      default:
        return 'Unknown';
    }
  };

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case 'accepted':
        return 'badge-accepted';
      case 'wrong_answer':
        return 'badge-wrong';
      case 'time_limit_exceeded':
        return 'badge-tle';
      case 'runtime_error':
        return 'badge-runtime-error';
      default:
        return 'badge-wrong';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-925">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => navigate('/problems')}
            className="btn-ghost mb-4 text-sm"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Problems
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-100 mb-2">
                {problem.id}. {problem.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className={problem.difficulty === 'easy' ? 'badge-easy' : problem.difficulty === 'medium' ? 'badge-medium' : 'badge-hard'}>
                  {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                </span>
                <div className="flex items-center text-sm text-gray-400">
                  <Users size={14} className="mr-1" />
                  {((problem.acceptedCount / problem.submissionCount) * 100).toFixed(1)}% acceptance
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Clock size={14} className="mr-1" />
                  {problem.submissionCount} submissions
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="btn-secondary"
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className={`btn-secondary ${showAIAssistant ? 'bg-primary-600 text-white' : ''}`}
              >
                <Bot size={16} className="mr-1" />
                AI Assistant
              </button>
              <button
                onClick={() => setShowCollaboration(!showCollaboration)}
                className={`btn-secondary ${showCollaboration ? 'bg-primary-600 text-white' : ''}`}
              >
                <MessageSquare size={16} className="mr-1" />
                Collaborate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-gray-950' : ''} flex`}>
        <div className={`${isFullscreen ? 'h-full' : 'container mx-auto px-4 py-6'} flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6`}>
          {/* Left Panel: Problem Description */}
          <div className={`${isFullscreen ? 'h-full' : ''} flex flex-col`}>
            <div className="card flex-1 flex flex-col">
              {/* Tabs */}
              <div className="flex border-b border-gray-800">
                <button
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'description'
                      ? 'border-b-2 border-primary-500 text-primary-400'
                      : 'text-gray-400 hover:text-gray-100'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  <FileText size={16} className="mr-2" />
                  Description
                </button>
                <button
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'submissions'
                      ? 'border-b-2 border-primary-500 text-primary-400'
                      : 'text-gray-400 hover:text-gray-100'
                  }`}
                  onClick={() => setActiveTab('submissions')}
                >
                  <List size={16} className="mr-2" />
                  Submissions
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
                {activeTab === 'description' ? (
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-3">Problem Statement</h3>
                      <div className="prose prose-sm max-w-none">
                        {problem.description.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Examples */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-3">Examples</h3>
                      <div className="space-y-4">
                        {problem.examples.map((example, index) => (
                          <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-gray-300 mb-1">Input:</p>
                                <code className="block bg-gray-800 rounded px-3 py-2 text-sm font-mono text-gray-100">
                                  {example.input}
                                </code>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-300 mb-1">Output:</p>
                                <code className="block bg-gray-800 rounded px-3 py-2 text-sm font-mono text-gray-100">
                                  {example.output}
                                </code>
                              </div>
                              {example.explanation && (
                                <div>
                                  <p className="text-sm font-medium text-gray-300 mb-1">Explanation:</p>
                                  <p className="text-sm text-gray-400">{example.explanation}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Constraints */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-3">Constraints</h3>
                      <ul className="space-y-2">
                        {problem.constraints.map((constraint, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-start">
                            <span className="text-primary-400 mr-2">•</span>
                            <code className="font-mono">{constraint}</code>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map(tag => (
                          <span 
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-100">Your Submissions</h3>
                    
                    {submissionResult ? (
                      <div className={`rounded-lg border p-4 ${
                        submissionResult.status === 'accepted'
                          ? 'border-success-800/50 bg-success-900/20'
                          : 'border-error-800/50 bg-error-900/20'
                      }`}>
                        <div className="flex items-center mb-3">
                          {getStatusIcon(submissionResult.status)}
                          <h4 className={`ml-2 font-medium ${
                            submissionResult.status === 'accepted'
                              ? 'text-success-400'
                              : 'text-error-400'
                          }`}>
                            {getStatusText(submissionResult.status)}
                          </h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-gray-400">Runtime:</span>
                            <span className="ml-2 text-gray-100">{submissionResult.runtime}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Memory:</span>
                            <span className="ml-2 text-gray-100">{submissionResult.memory}</span>
                          </div>
                        </div>
                        
                        {submissionResult.message && (
                          <div className="bg-gray-900 rounded-lg p-3">
                            <p className="text-sm font-mono text-gray-300">{submissionResult.message}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        <List size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No submissions yet</p>
                        <p className="text-sm">Submit your solution to see results here</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Code Editor */}
          <div className={`${isFullscreen ? 'h-full' : ''} flex flex-col`}>
            <div className="card flex-1 flex flex-col">
              {/* Editor Header */}
              <div className="flex items-center justify-between border-b border-gray-800 p-4">
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="select text-sm"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="cpp">C++</option>
                  </select>
                  
                  <div className="flex items-center space-x-2">
                    <Settings size={16} className="text-gray-400" />
                    <input
                      type="range"
                      min="12"
                      max="20"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-16"
                    />
                    <span className="text-xs text-gray-400">{fontSize}px</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    className="btn-secondary text-sm"
                    onClick={() => setCode(problem.solutionTemplate[selectedLanguage])}
                  >
                    <Clipboard size={14} className="mr-1" />
                    Reset
                  </button>
                  <button
                    className={`btn-primary text-sm ${isSubmitting ? 'opacity-70' : ''}`}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play size={14} className="mr-1" />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
                  value={code}
                  onChange={handleCodeChange}
                  theme="vs-dark"
                  options={{
                    fontSize: fontSize,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                    fontFamily: 'JetBrains Mono, Fira Code, monospace',
                    lineNumbers: 'on',
                    renderLineHighlight: 'line',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Collaboration Panel */}
        {showCollaboration && (
          <CollaborationPanel 
            isOpen={showCollaboration}
            onToggle={() => setShowCollaboration(!showCollaboration)}
            roomId="problem-123"
          />
        )}
      </div>
      
      {/* AI Assistant */}
      <AIAssistant 
        isOpen={showAIAssistant}
        onToggle={() => setShowAIAssistant(!showAIAssistant)}
        currentCode={code}
        problemId={problem.id}
      />
    </div>
  );
};

export default ProblemDetailPage;