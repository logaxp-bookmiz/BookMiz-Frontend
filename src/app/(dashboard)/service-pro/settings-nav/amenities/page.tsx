'use client';

import { useState } from 'react';

interface Amenity {
  id: string;
  name: string;
  enabled: boolean;
}

const AmenitiesPage = () => {
  const [amenities, setAmenities] = useState<Amenity[]>([
    { id: '1', name: 'Amenity', enabled: false },
    { id: '2', name: 'Parking space', enabled: false },
    { id: '3', name: 'Accessible for people with disabilities', enabled: false },
    { id: '4', name: 'Credit cards accepted', enabled: false },
    { id: '5', name: 'Child-friendly', enabled: false },
  ]);

  const handleToggleAmenity = (id: string) => {
    setAmenities(prev =>
      prev.map(amenity =>
        amenity.id === id ? { ...amenity, enabled: !amenity.enabled } : amenity
      )
    );
  };

  const handleEditAmenity = (id: string) => {
    // Handle edit functionality
    console.log('Edit amenity:', id);
  };

  const handleDeleteAmenity = (id: string) => {
    setAmenities(prev => prev.filter(amenity => amenity.id !== id));
  };

  const handleAddAmenity = () => {
    // Handle add amenity functionality
    console.log('Add new amenity');
  };

  return (
<div className="min-h-screen bg-white p-8 flex justify-center mt-14">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Amenities</h1>
            <div className="mb-6">
              <h2 className="text-base font-medium text-gray-900 mb-1">Manage amenities</h2>
              <p className="text-sm text-gray-600">
                Amenities you offer along side your service
              </p>
            </div>
          </div>
          <button
            onClick={handleAddAmenity}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Amenity
          </button>
        </div>

        {/* Amenities List */}
        <div className="space-y-3">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <label className="relative inline-block w-5 h-5">
                  <input
                    type="checkbox"
                    checked={amenity.enabled}
                    onChange={() => handleToggleAmenity(amenity.id)}
                    className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                  />
                </label>
                <span className="text-sm text-gray-700 font-medium">
                  {amenity.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEditAmenity(amenity.id)}
                  className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAmenity(amenity.id)}
                  className="text-gray-500 hover:text-red-600 text-sm flex items-center gap-1 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {amenities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">No amenities yet</h3>
            <p className="text-sm text-gray-500 mb-4">Get started by adding your first amenity.</p>
            <button
              onClick={handleAddAmenity}
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Add Amenity
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmenitiesPage;