"use client";

import React from "react";

const HomeLocationTab = () => {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">
          Home Location
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Set your home address for delivery and location-based services
        </p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <p className="text-gray-600">Home location settings.</p>
      </div>
    </div>
  );
};

export default HomeLocationTab;