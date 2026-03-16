import React from "react";
import { Search, Filter } from "react-feather";

type DashboardHeaderProps = {
  username: string;
  timezone: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onFilterClick?: () => void;
  onBookClick?: () => void;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  username,
  timezone,
  searchQuery,
  setSearchQuery,
  onFilterClick,
  onBookClick,
}) => {
  return (
    <div className="flex justify-between items-center mb-6 ">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Hi, {username}</h1>
        <p className="text-sm text-gray-500">Timezone: {timezone}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="What services do you need?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
          />
        </div>
        <button
          onClick={onFilterClick}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button
          onClick={onBookClick}
          className="px-6 py-2 bg-[#011c39] text-white rounded-lg hover:bg-blue-800"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
