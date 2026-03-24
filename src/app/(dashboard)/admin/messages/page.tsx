"use client"

import React, { useState } from "react";
import Image from 'next/image';
import {
  FaTrashAlt,
  FaReply,
  FaEye,
  FaSearch,
  FaFilter,
} from 'react-icons/fa';

const MessagesDashboard = () => {
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

  const handleSelectMessage = (index: number) => {
    setSelectedMessages(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === messagesData.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messagesData.map((_, index) => index));
    }
  };

  return (
    <div className="w-full p-10 bg-gray-50">
      <header className="flex justify-end mb-6">
        <div className="flex items-center space-x-4">
          {/* Notifications and User Profile */}
          <div className="relative">
            <button className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300">
              <i className="fas fa-envelope text-gray-600"></i>
            </button>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
          </div>
          <div className="relative">
            <button className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300">
              <i className="fas fa-bell text-gray-600"></i>
            </button>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
          </div>
          <div className="flex items-center space-x-2 rounded-md border border-gray-300 px-1 py-1">
            <Image 
              src="/avatar.jpg" 
              alt="avatar" 
              width={28}
              height={28}
              className="w-7 h-7 rounded-full border border-gray-300" 
            />
            <div className="flex items-center">
              <span className="text-gray-600 font-medium">Emmanuel</span>
              <i className="fas fa-chevron-down ml-1 text-gray-600 text-xs pl-1"></i>
            </div>
          </div>
        </div>
      </header>

      <section className='border rounded-lg bg-white'>
        <div className="flex justify-between items-center bg-[#fbfbfb] pt-5 pb-3 px-6 border-b">
          <h2 className="text-xl font-bold">Messages</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Message Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-blue-600">Total Messages</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-green-600">Read Messages</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">6</div>
              <div className="text-sm text-yellow-600">Unread Messages</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-red-600">Priority Messages</div>
            </div>
          </div>

          {/* Messages Table */}
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="text-left bg-[#f6f6f6] border-b border-gray-300">
                <th className="p-3 text-base font-normal flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={selectedMessages.length === messagesData.length}
                    onChange={handleSelectAll}
                  />
                  Sender
                </th>
                <th className="p-3 text-base font-normal">Subject</th>
                <th className="p-3 text-base font-normal">Date</th>
                <th className="p-3 text-base font-normal">Status</th>
                <th className="p-3 text-base font-normal">Priority</th>
                <th className="p-3 text-base font-normal">Actions</th>
              </tr>
            </thead>

            <tbody>
              {messagesData.map((message, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="p-3 flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={selectedMessages.includes(index)}
                      onChange={() => handleSelectMessage(index)}
                    />
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-gray-600">
                          {message.sender.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className={`${!message.read ? 'font-semibold' : ''}`}>
                        {message.sender}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`${!message.read ? 'font-semibold' : ''}`}>
                      {message.subject}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{message.date}</td>
                  <td className="p-3 text-gray-600">{message.read ? 'Read' : 'Unread'}</td>
                  <td className="p-3 text-gray-600">{message.priority}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button className="bg-yellow-100 text-yellow-700 py-1 px-2 rounded inline-flex items-center text-sm">
                        <FaEye className="mr-1" />
                        View
                      </button>
                      <button className="bg-yellow-100 text-yellow-700 py-1 px-2 rounded inline-flex items-center text-sm">
                        <FaReply className="mr-1" />
                        Reply
                      </button>
                      <button className="bg-red-100 text-red-700 py-1 px-2 rounded inline-flex items-center text-sm">
                        <FaTrashAlt className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bulk Actions */}
          {selectedMessages.length > 0 && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {selectedMessages.length} message(s) selected
                </span>
                <div className="flex space-x-2">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Mark as Read
                  </button>
                  <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                    Delete Selected
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Mock messages data
const messagesData = [
  {
    sender: 'John Smith',
    subject: 'Welcome to our platform',
    date: '2024-01-15',
    read: false,
    priority: 'High'
  },
  {
    sender: 'Sarah Johnson',
    subject: 'Account verification required',
    date: '2024-01-14',
    read: true,
    priority: 'Medium'
  },
  {
    sender: 'Mike Wilson',
    subject: 'Payment confirmation',
    date: '2024-01-13',
    read: true,
    priority: 'Low'
  },
  {
    sender: 'Emma Davis',
    subject: 'New feature announcement',
    date: '2024-01-12',
    read: false,
    priority: 'Medium'
  },
  {
    sender: 'David Brown',
    subject: 'Security alert',
    date: '2024-01-11',
    read: false,
    priority: 'High'
  },
  {
    sender: 'Lisa Taylor',
    subject: 'Monthly newsletter',
    date: '2024-01-10',
    read: true,
    priority: 'Low'
  },
];

export default MessagesDashboard;