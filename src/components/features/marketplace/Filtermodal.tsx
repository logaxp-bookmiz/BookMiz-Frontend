import React from "react";
import { FiX } from "react-icons/fi";

const FilterModal = ({ isOpen, onClose, filters, setFilters }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Minimum Rating
            </label>
            <select
              value={filters.rating}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, rating: e.target.value }))
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Price Range
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priceRange: e.target.value }))
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Prices</option>
              <option value="budget">Budget (Under 10,000)</option>
              <option value="mid">Mid-range (10,000 - 25,000)</option>
              <option value="premium">Premium (25,000+)</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Locations</option>
              <option value="victoria-island">Victoria Island</option>
              <option value="lekki">Lekki</option>
              <option value="ikeja">Ikeja</option>
              <option value="yaba">Yaba</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => {
              setFilters({ priceRange: "all", rating: "all", location: "all" });
            }}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 font-semibold transition-all shadow-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;