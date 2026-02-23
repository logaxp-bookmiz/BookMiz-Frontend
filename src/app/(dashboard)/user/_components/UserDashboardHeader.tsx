"use client";

import React from "react";
import { FiSearch, FiFilter, FiUser, FiMail } from "react-icons/fi";

type UserDashboardHeaderProps = {
  username?: string;
  timezone?: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onFilterClick?: () => void;
  onBookClick?: () => void;
};

const STATIC_USER = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
};

const UserDashboardHeader: React.FC<UserDashboardHeaderProps> = ({
  username = "John",
  timezone = "GMT+01",
  searchQuery,
  setSearchQuery,
  onFilterClick,
  onBookClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Hi, {username}!
        </h1>
        <p className="text-sm text-gray-500">Welcome to your dashboard</p>

        {/* Static User Info */}
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FiUser className="w-4 h-4" />
            <span>
              {STATIC_USER.firstname} {STATIC_USER.lastname}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FiMail className="w-4 h-4" />
            <span>{STATIC_USER.email}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="What services do you need?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-72"
          />
        </div>
        <button
          onClick={onFilterClick}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FiFilter className="w-4 h-4" />
          Filter
        </button>
        <button
          onClick={onBookClick}
          className="px-6 py-2 bg-[#011c39] text-white rounded-lg border-2 border-[#011c39] hover:bg-transparent hover:text-[#011c39] transition-all duration-300"
        >
          Book Service
        </button>
      </div>
    </div>
  );
};

export default UserDashboardHeader;