"use client";

import React, { useState } from "react";
import { FiPlus, FiDownload } from "react-icons/fi";
import AddCustomerModal from "./components/AddCustomerModal";
import ImportCustomerModal from "./components/ImportCustomerModal";

const CustomersPage = () => {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showImportCustomerModal, setShowImportCustomerModal] = useState(false);

  const handleAddCustomer = () => {
    setShowAddCustomerModal(true);
  };

  const handleCustomerSubmit = (customerData: any) => {
    // Handle customer submission
    console.log("Customer data:", customerData);
    // You can add API call here to save the customer
  };

  const handleImportCustomer = () => {
    setShowImportCustomerModal(true);
  };

  const handleImportMethod = (method: "csv" | "google") => {
    console.log("Import method selected:", method);
    // Handle import logic here based on method
    setShowImportCustomerModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>

          {/* Top right icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Emmanuel
              </span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 mt-20">
        <div className="text-center max-w-md">
          {/* Empty State Illustration */}
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto">
              {/* Dashed circular path */}
              <svg className="w-full h-full" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Flying bee */}
                <g transform="translate(64, 64)">
                  <circle cx="0" cy="-40" r="3" fill="#E5E7EB" />
                  <path
                    d="M-2 -38 Q0 -42 2 -38"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M-1 -36 Q1 -40 3 -36"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    fill="none"
                  />
                </g>

                {/* Backpack/container shape */}
                <g transform="translate(64, 80)">
                  {/* Main container */}
                  <rect
                    x="-12"
                    y="0"
                    width="24"
                    height="20"
                    rx="4"
                    fill="#E5E7EB"
                  />

                  {/* Diagonal green fill */}
                  <path
                    d="M-12 0 L-12 20 L12 20 L12 8 L-8 0 Z"
                    fill="#10B981"
                    opacity="0.3"
                  />

                  {/* Green bars at bottom */}
                  <rect
                    x="-8"
                    y="16"
                    width="3"
                    height="4"
                    fill="#10B981"
                    rx="1"
                  />
                  <rect
                    x="-2"
                    y="16"
                    width="3"
                    height="4"
                    fill="#10B981"
                    rx="1"
                  />
                  <rect
                    x="4"
                    y="16"
                    width="3"
                    height="4"
                    fill="#10B981"
                    rx="1"
                  />
                </g>

                {/* Scattered dots and shapes */}
                <circle cx="20" cy="30" r="2" fill="#E5E7EB" />
                <circle cx="100" cy="40" r="1.5" fill="#E5E7EB" />
                <circle cx="25" cy="90" r="1" fill="#E5E7EB" />
                <circle cx="95" cy="85" r="2.5" fill="#E5E7EB" />
                <rect
                  x="15"
                  y="70"
                  width="3"
                  height="3"
                  rx="1"
                  fill="#E5E7EB"
                />
                <rect
                  x="105"
                  y="25"
                  width="2"
                  height="2"
                  rx="1"
                  fill="#E5E7EB"
                />
              </svg>
            </div>
          </div>

          {/* Empty State Message */}
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            No customers to display
          </h3>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={handleAddCustomer}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
            >
              <FiPlus size={16} />
              <span>Add customer</span>
            </button>

            <button
              onClick={handleImportCustomer}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <FiDownload size={16} />
              <span>Import customer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={showAddCustomerModal}
        onClose={() => setShowAddCustomerModal(false)}
        onSubmit={handleCustomerSubmit}
      />

      {/* Import Customer Modal */}
      <ImportCustomerModal
        isOpen={showImportCustomerModal}
        onClose={() => setShowImportCustomerModal(false)}
        onImport={handleImportMethod}
      />
    </div>
  );
};

export default CustomersPage;
