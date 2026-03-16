"use client";

import React, { useState } from "react";

interface TimeSlot {
  id: number;
  serviceName: string;
  day: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  type: "auto" | "custom";
}

const TimeSlotPage = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 1,
      serviceName: "15 Minutes Meeting",
      day: "Monday",
      startTime: "09:00",
      endTime: "17:00",
      isActive: true,
      type: "auto",
    },
    {
      id: 2,
      serviceName: "30 Minutes Meeting",
      day: "Tuesday",
      startTime: "10:00",
      endTime: "16:00",
      isActive: true,
      type: "custom",
    },
    {
      id: 3,
      serviceName: "60 Minutes Meeting",
      day: "Wednesday",
      startTime: "14:00",
      endTime: "18:00",
      isActive: false,
      type: "auto",
    },
  ]);

  const [showAutoForm, setShowAutoForm] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState({
    serviceName: "15 Minutes Meeting",
    day: "Monday",
    startTime: "09:00",
    endTime: "17:00",
    type: "auto" as "auto" | "custom",
  });

  const services = [
    "15 Minutes Meeting",
    "30 Minutes Meeting",
    "60 Minutes Meeting",
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleAddTimeSlot = () => {
    if (newTimeSlot.serviceName && newTimeSlot.day) {
      const timeSlot: TimeSlot = {
        id: timeSlots.length + 1,
        serviceName: newTimeSlot.serviceName,
        day: newTimeSlot.day,
        startTime: newTimeSlot.startTime,
        endTime: newTimeSlot.endTime,
        isActive: true,
        type: newTimeSlot.type,
      };
      setTimeSlots([...timeSlots, timeSlot]);
      setNewTimeSlot({
        serviceName: "15 Minutes Meeting",
        day: "Monday",
        startTime: "09:00",
        endTime: "17:00",
        type: "auto",
      });
      setShowAutoForm(false);
      setShowCustomForm(false);
    }
  };

  const handleToggleTimeSlot = (id: number) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id ? { ...slot, isActive: !slot.isActive } : slot
      )
    );
  };

  const handleDeleteTimeSlot = (id: number) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Time Slots</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAutoForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              + Auto Generate
            </button>
            <button
              onClick={() => setShowCustomForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Custom Generate
            </button>
          </div>
        </div>

        {/* Auto Generate Form */}
        {showAutoForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Auto Generate Time Slots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>
                <select
                  value={newTimeSlot.serviceName}
                  onChange={(e) =>
                    setNewTimeSlot({
                      ...newTimeSlot,
                      serviceName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day of Week
                </label>
                <select
                  value={newTimeSlot.day}
                  onChange={(e) =>
                    setNewTimeSlot({ ...newTimeSlot, day: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newTimeSlot.startTime}
                  onChange={(e) =>
                    setNewTimeSlot({
                      ...newTimeSlot,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={newTimeSlot.endTime}
                  onChange={(e) =>
                    setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleAddTimeSlot}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Generate Auto Slots
              </button>
              <button
                onClick={() => setShowAutoForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Custom Generate Form */}
        {showCustomForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Custom Generate Time Slots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>
                <select
                  value={newTimeSlot.serviceName}
                  onChange={(e) =>
                    setNewTimeSlot({
                      ...newTimeSlot,
                      serviceName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day of Week
                </label>
                <select
                  value={newTimeSlot.day}
                  onChange={(e) =>
                    setNewTimeSlot({ ...newTimeSlot, day: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newTimeSlot.startTime}
                  onChange={(e) =>
                    setNewTimeSlot({
                      ...newTimeSlot,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={newTimeSlot.endTime}
                  onChange={(e) =>
                    setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleAddTimeSlot}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Custom Slots
              </button>
              <button
                onClick={() => setShowCustomForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Time Slots List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Time Slots ({timeSlots.length})
            </h2>
          </div>

          {timeSlots.length === 0 ? (
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No time slots yet
              </h3>
              <p className="text-gray-500 mb-4">
                Generate time slots for your services
              </p>
              <div className="flex space-x-3 justify-center">
                <button
                  onClick={() => setShowAutoForm(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Auto Generate
                </button>
                <button
                  onClick={() => setShowCustomForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Custom Generate
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {timeSlots.map((slot) => (
                <div key={slot.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {slot.serviceName}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            slot.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {slot.isActive ? "Active" : "Inactive"}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            slot.type === "auto"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {slot.type === "auto" ? "Auto" : "Custom"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Day: {slot.day}</span>
                        <span>
                          Time: {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleTimeSlot(slot.id)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          slot.isActive
                            ? "text-orange-600 hover:text-orange-700"
                            : "text-green-600 hover:text-green-700"
                        }`}
                      >
                        {slot.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTimeSlot(slot.id)}
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

export default TimeSlotPage;
