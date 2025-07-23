import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Lightbulb, Code, Zap, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'hint' | 'optimization' | 'explanation' | 'debug';
}

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  currentCode?: string;
  problemId?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ 
  isOpen, 
  onToggle, 
  currentCode = '', 
  problemId = '' 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI coding assistant. I can help you with hints, code optimization, debugging, and explanations. What would you like to work on?",
      timestamp: new Date(),
      category: 'explanation'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue, currentCode),
        timestamp: new Date(),
        category: detectCategory(inputValue)
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string, code: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hint') || input.includes('help')) {
      return "Here's a hint: Try thinking about this problem step by step. Consider what data structure would be most efficient for the operations you need to perform. Would a hash map help you achieve O(1) lookups?";
    }
    
    if (input.includes('optimize') || input.includes('performance')) {
      return "I notice your current approach has O(n²) time complexity. You could optimize this to O(n) by using a hash map to store previously seen values. This would eliminate the need for the nested loop.";
    }
    
    if (input.includes('debug') || input.includes('error')) {
      return "I can see a potential issue in your code. Check your loop boundaries - you might be accessing an array index that's out of bounds. Also, make sure you're handling edge cases like empty inputs.";
    }
    
    if (input.includes('explain') || input.includes('algorithm')) {
      return "This problem can be solved using the two-pointer technique. The idea is to use two pointers starting from opposite ends of the array and move them towards each other based on certain conditions. This approach is efficient and elegant for many array problems.";
    }
    
    return "I understand you're working on this problem. Could you be more specific about what you'd like help with? I can provide hints, help with debugging, explain algorithms, or suggest optimizations.";
  };

  const detectCategory = (input: string): Message['category'] => {
    const inputLower = input.toLowerCase();
    if (inputLower.includes('hint')) return 'hint';
    if (inputLower.includes('optimize') || inputLower.includes('performance')) return 'optimization';
    if (inputLower.includes('debug') || inputLower.includes('error')) return 'debug';
    return 'explanation';
  };

  const getCategoryIcon = (category?: Message['category']) => {
    switch (category) {
      case 'hint':
        return <Lightbulb size={14} className="text-warning-400" />;
      case 'optimization':
        return <Zap size={14} className="text-primary-400" />;
      case 'debug':
        return <Code size={14} className="text-error-400" />;
      default:
        return <Bot size={14} className="text-success-400" />;
    }
  };

  const quickActions = [
    { label: 'Give me a hint', action: () => setInputValue('Can you give me a hint for this problem?') },
    { label: 'Optimize my code', action: () => setInputValue('How can I optimize my current code?') },
    { label: 'Debug help', action: () => setInputValue('Help me debug this code') },
    { label: 'Explain algorithm', action: () => setInputValue('Explain the best algorithm for this problem') }
  ];

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-12' : 'w-96 h-[500px]'
    }`}>
      <div className="card h-full flex flex-col shadow-dark-lg border-primary-800/50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary-900/30 flex items-center justify-center">
              <Bot size={16} className="text-primary-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-100">AI Assistant</h3>
              <p className="text-xs text-gray-400">Ready to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-gray-400 hover:text-gray-100 transition-colors"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={onToggle}
              className="p-1 text-gray-400 hover:text-gray-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.type === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-1 mb-1">
                        {getCategoryIcon(message.category)}
                        <span className="text-xs text-gray-400 capitalize">
                          {message.category || 'assistant'}
                        </span>
                      </div>
                    )}
                    <p className="leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg px-3 py-2 text-sm text-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-400">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-gray-800">
              <div className="flex flex-wrap gap-1">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about your code..."
                  className="input flex-1 text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="btn-primary p-2"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;