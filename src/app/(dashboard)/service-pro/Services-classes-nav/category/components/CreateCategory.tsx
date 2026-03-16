"use client";

import React, { useState } from "react";
import { XMarkIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

interface Service {
  id: number;
  name: string;
  duration: number;
  price: string;
  color: string;
}

interface CreateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoryName: string, selectedServiceIds: number[]) => void;
  services?: Service[];
}

const CreateCategory: React.FC<CreateCategoryProps> = ({
  isOpen,
  onClose,
  onSubmit,
  services = [
    {
      id: 1,
      name: "15 Minutes Meeting",
      duration: 15,
      price: "Free",
      color: "#10B981",
    },
    {
      id: 2,
      name: "30 Minutes Meeting",
      duration: 30,
      price: "Free",
      color: "#8B5CF6",
    },
    {
      id: 3,
      name: "60 Minutes Meeting",
      duration: 60,
      price: "Free",
      color: "#6B7280",
    },
  ],
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectAll = () => {
    if (selectedServices.length === services.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(services.map((service) => service.id));
    }
  };

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = () => {
    if (categoryName.trim()) {
      onSubmit(categoryName.trim(), selectedServices);
      // Reset form
      setCategoryName("");
      setSelectedServices([]);
      setSearchTerm("");
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setCategoryName("");
    setSelectedServices([]);
    setSearchTerm("");
    onClose();
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Create new category
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Category Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter category name*
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter category name"
            />
          </div>

          {/* Services Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Services ({selectedServices.length}/{services.length})
              </h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedServices.length === services.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Select all</span>
              </label>
            </div>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search"
              />
            </div>

            {/* Services List */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: service.color }}
                    >
                      {service.duration}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {service.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {service.duration} Mins • {service.price}
                        </p>
                      </div>
                      <VideoCameraIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={!categoryName.trim()}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
