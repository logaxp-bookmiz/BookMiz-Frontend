'use client';

import { useState } from 'react';

interface Message {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  sender: {
    name: string;
    avatar: string;
  };
  isRead: boolean;
}

interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  isMe: boolean;
}

const MessagesComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const messages: Message[] = [
    {
      id: '1',
      title: 'Message title',
      content: 'Hello Emmanuel, how are you doing great! I hope to use this opportunity to inform you that you have been promoted to...',
      timestamp: '2 min',
      sender: { name: 'UE', avatar: 'UE' },
      isRead: false
    },
    {
      id: '2',
      title: 'Message title',
      content: 'Hello Emmanuel, how are you doing great! I hope to use this opportunity to inform you that you have been promoted to...',
      timestamp: '2 min',
      sender: { name: 'UE', avatar: 'UE' },
      isRead: false
    },
    {
      id: '3',
      title: 'Message title',
      content: 'Hello Emmanuel, how are you doing great! I hope to use this opportunity to inform you that you have been promoted to...',
      timestamp: '2 min',
      sender: { name: 'UE', avatar: 'UE' },
      isRead: false
    },
    {
      id: '4',
      title: 'Message title',
      content: 'Hello Emmanuel, how are you doing great! I hope to use this opportunity to inform you that you have been promoted to...',
      timestamp: '2 min',
      sender: { name: 'UE', avatar: 'UE' },
      isRead: false
    },
    {
      id: '5',
      title: 'Message title',
      content: 'Hello Emmanuel, how are you doing great! I hope to use this opportunity to inform you that you have been promoted to...',
      timestamp: '2 min',
      sender: { name: 'UE', avatar: 'UE' },
      isRead: false
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      content: 'Lorem Ipsum has simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      timestamp: 'Friday 2:30pm',
      sender: 'Ujah Emmanuel',
      isMe: false
    },
    {
      id: '2',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap.',
      timestamp: 'Friday 2:30pm',
      sender: 'Ujah Emmanuel',
      isMe: false
    },
    {
      id: '3',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap.',
      timestamp: 'Friday 2:32pm',
      sender: 'Me',
      isMe: true
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log('Sending:', newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackToMessages = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 max-w-6xl mx-auto">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex h-[700px]">
          {/* Messages List - Only show when no message is selected */}
          {!selectedMessage && (
            <div className="w-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-medium text-gray-900">Messages</h1>
                  <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded">7 new</span>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message.id)}
                    className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {message.sender.avatar}
                        </div>
                        {!message.isRead && (
                          <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-sm font-medium text-gray-900">{message.title}</h3>
                          <span className="text-xs text-gray-500 ml-2">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {message.content}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs">
                          <button className="text-slate-700 hover:text-slate-900 flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 3h18v18l-6-6H3V3z"/>
                            </svg>
                            Mark as read
                          </button>
                          <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18"/>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        disabled={page === '...'}
                        className={`w-8 h-8 text-sm rounded ${
                          page === currentPage
                            ? 'bg-slate-800 text-white'
                            : page === '...'
                            ? 'text-gray-400 cursor-default'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                    Next
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat Area - Only show when a message is selected */}
          {selectedMessage && (
            <div className="w-full flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBackToMessages}
                      className="text-gray-600 hover:text-gray-900 mr-2"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6"></polyline>
                      </svg>
                    </button>
                    <h2 className="text-lg font-medium text-gray-900">Messages</h2>
                    <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded">7 new</span>
                  </div>
                  <nav className="text-sm text-gray-500">
                    Messages &gt; Message details
                  </nav>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {msg.isMe ? 'ME' : 'UE'}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <div className="ml-10">
                      <div className={`inline-block max-w-2xl p-4 rounded-lg text-sm leading-relaxed ${
                        msg.isMe 
                          ? 'bg-slate-800 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Reply your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-slate-800 hover:bg-slate-900 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg transition-colors text-sm font-medium"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;