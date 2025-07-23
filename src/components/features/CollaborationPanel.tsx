import React, { useState, useEffect } from 'react';
import { Users, Video, Mic, MicOff, VideoOff, MessageSquare, Share, Crown, UserPlus } from 'lucide-react';

interface Participant {
  id: string;
  username: string;
  avatar: string;
  role: 'host' | 'participant';
  isOnline: boolean;
  cursor?: { line: number; column: number };
}

interface CollaborationPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  roomId?: string;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ 
  isOpen, 
  onToggle, 
  roomId = 'room-123' 
}) => {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      username: 'john_doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'host',
      isOnline: true,
      cursor: { line: 15, column: 8 }
    },
    {
      id: '2',
      username: 'alice_dev',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'participant',
      isOnline: true,
      cursor: { line: 23, column: 12 }
    },
    {
      id: '3',
      username: 'bob_coder',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'participant',
      isOnline: false
    }
  ]);

  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', username: 'alice_dev', message: 'I think we should use a hash map here', timestamp: new Date() },
    { id: '2', username: 'john_doe', message: 'Good idea! That would optimize the lookup time', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      username: 'current_user',
      message: newMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/collaborate/${roomId}`);
    // Show toast notification
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-100">Collaboration</h3>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-100 transition-colors"
          >
            <Users size={20} />
          </button>
        </div>
        
        {/* Room Info */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Room ID</span>
            <button
              onClick={copyRoomLink}
              className="text-xs text-primary-400 hover:text-primary-300 flex items-center"
            >
              <Share size={12} className="mr-1" />
              Share
            </button>
          </div>
          <code className="text-xs font-mono text-gray-100">{roomId}</code>
        </div>
      </div>

      {/* Participants */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-300">
            Participants ({participants.length})
          </h4>
          <button className="text-primary-400 hover:text-primary-300">
            <UserPlus size={16} />
          </button>
        </div>
        
        <div className="space-y-2">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={participant.avatar}
                  alt={participant.username}
                  className="w-8 h-8 rounded-full"
                />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${
                  participant.isOnline ? 'bg-success-500' : 'bg-gray-500'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-100 truncate">
                    {participant.username}
                  </span>
                  {participant.role === 'host' && (
                    <Crown size={12} className="text-warning-400" />
                  )}
                </div>
                {participant.cursor && participant.isOnline && (
                  <span className="text-xs text-gray-400">
                    Line {participant.cursor.line}:{participant.cursor.column}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Controls */}
      <div className="p-4 border-b border-gray-800">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Communication</h4>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              isVideoOn 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
          </button>
          
          <button
            onClick={() => setIsAudioOn(!isAudioOn)}
            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              isAudioOn 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {isAudioOn ? <Mic size={16} /> : <MicOff size={16} />}
          </button>
          
          <button
            onClick={() => setShowChat(!showChat)}
            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              showChat 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <MessageSquare size={16} />
          </button>
        </div>
      </div>

      {/* Chat */}
      {showChat && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="text-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-primary-400">{msg.username}</span>
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="input flex-1 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="btn-primary px-3 py-2"
              >
                <MessageSquare size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationPanel;