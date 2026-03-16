"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Service {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: string;
  description: string;
  isActive: boolean;
}

const ServicesPage = () => {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "15 Minutes Meeting",
      category: "Consultation",
      duration: 15,
      price: "Free",
      description: "Quick consultation session",
      isActive: true,
    },
    {
      id: 2,
      name: "30 Minutes Meeting",
      category: "Consultation",
      duration: 30,
      price: "Free",
      description: "Standard consultation session",
      isActive: true,
    },
    {
      id: 3,
      name: "60 Minutes Meeting",
      category: "Consultation",
      duration: 60,
      price: "Free",
      description: "Extended consultation session",
      isActive: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    category: "Consultation",
    duration: 30,
    price: "Free",
    description: "",
  });

  const categories = ["Consultation", "Training", "Support"];

  const handleAddService = () => {
    if (newService.name.trim()) {
      const service: Service = {
        id: services.length + 1,
        name: newService.name,
        category: newService.category,
        duration: newService.duration,
        price: newService.price,
        description: newService.description,
        isActive: true,
      };
      setServices([...services, service]);
      setNewService({
        name: "",
        category: "Consultation",
        duration: 30,
        price: "Free",
        description: "",
      });
      setShowAddForm(false);
    }
  };

  const handleToggleService = (id: number) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <button
            onClick={() => router.push("/service-pro/create-service")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Service
          </button>
        </div>

        {/* Add Service Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Add New Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({ ...newService, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter service name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newService.category}
                  onChange={(e) =>
                    setNewService({ ...newService, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={newService.duration}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      duration: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({ ...newService, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Free, $50, etc."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter service description"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleAddService}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Service
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Services List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Services ({services.length})
            </h2>
          </div>

          {services.length === 0 ? (
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No services yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first service to get started
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Service
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {services.map((service) => (
                <div key={service.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {service.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            service.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {service.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                        <span>Category: {service.category}</span>
                        <span>Duration: {service.duration} mins</span>
                        <span>Price: {service.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleService(service.id)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          service.isActive
                            ? "text-orange-600 hover:text-orange-700"
                            : "text-green-600 hover:text-green-700"
                        }`}
                      >
                        {service.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
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
    </div>
  );
};

export default ServicesPage;
