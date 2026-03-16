"use client";

import React, { useState } from "react";
import CreateCategory from "./components/CreateCategory";

const CategoryPage = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Consultation",
      description: "Professional consultation services",
      serviceCount: 3,
    },
    {
      id: 2,
      name: "Training",
      description: "Educational and training sessions",
      serviceCount: 2,
    },
    {
      id: 3,
      name: "Support",
      description: "Customer support services",
      serviceCount: 1,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateCategory = (
    categoryName: string,
    selectedServiceIds: number[]
  ) => {
    // Create new category
    const newCategory = {
      id: categories.length + 1,
      name: categoryName,
      description: `Category with ${selectedServiceIds.length} services`,
      serviceCount: selectedServiceIds.length,
    };

    setCategories([...categories, newCategory]);
    setShowCreateModal(false);
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Category
          </button>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Categories
            </h2>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No categories yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first category to organize your services
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Category
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {categories.map((category) => (
                <div key={category.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {category.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {category.serviceCount} services
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Category Modal */}
      <CreateCategory
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
};

export default CategoryPage;
