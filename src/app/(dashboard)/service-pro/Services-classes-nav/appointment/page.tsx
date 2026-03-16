"use client";

import React, { useState } from "react";

interface Appointment {
  id: number;
  serviceName: string;
  clientName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  duration: number;
  price: string;
}

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      serviceName: "15 Minutes Meeting",
      clientName: "John Doe",
      date: "2024-01-15",
      time: "10:00",
      status: "confirmed",
      duration: 15,
      price: "Free",
    },
    {
      id: 2,
      serviceName: "30 Minutes Meeting",
      clientName: "Jane Smith",
      date: "2024-01-16",
      time: "14:30",
      status: "pending",
      duration: 30,
      price: "Free",
    },
    {
      id: 3,
      serviceName: "60 Minutes Meeting",
      clientName: "Mike Johnson",
      date: "2024-01-17",
      time: "16:00",
      status: "completed",
      duration: 60,
      price: "Free",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    serviceName: "15 Minutes Meeting",
    clientName: "",
    date: "",
    time: "",
    duration: 15,
    price: "Free",
  });

  const services = [
    "15 Minutes Meeting",
    "30 Minutes Meeting",
    "60 Minutes Meeting",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddAppointment = () => {
    if (
      newAppointment.clientName &&
      newAppointment.date &&
      newAppointment.time
    ) {
      const appointment: Appointment = {
        id: appointments.length + 1,
        serviceName: newAppointment.serviceName,
        clientName: newAppointment.clientName,
        date: newAppointment.date,
        time: newAppointment.time,
        status: "pending",
        duration: newAppointment.duration,
        price: newAppointment.price,
      };
      setAppointments([...appointments, appointment]);
      setNewAppointment({
        serviceName: "15 Minutes Meeting",
        clientName: "",
        date: "",
        time: "",
        duration: 15,
        price: "Free",
      });
      setShowAddForm(false);
    }
  };

  const handleStatusChange = (id: number, newStatus: Appointment["status"]) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Appointment
          </button>
        </div>

        {/* Add Appointment Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Add New Appointment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>
                <select
                  value={newAppointment.serviceName}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
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
                  Client Name
                </label>
                <input
                  type="text"
                  value={newAppointment.clientName}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      clientName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      time: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleAddAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Appointment
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

        {/* Appointments List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Appointments ({appointments.length})
            </h2>
          </div>

          {appointments.length === 0 ? (
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No appointments yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first appointment to get started
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Appointment
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="px-6 py-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {appointment.serviceName}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Client: {appointment.clientName}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span>Date: {formatDate(appointment.date)}</span>
                        <span>Time: {appointment.time}</span>
                        <span>Duration: {appointment.duration} mins</span>
                        <span>Price: {appointment.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(
                            appointment.id,
                            e.target.value as Appointment["status"]
                          )
                        }
                        className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-500">
              Total Appointments
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {appointments.length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-500">Confirmed</h3>
            <p className="text-2xl font-bold text-green-600">
              {appointments.filter((a) => a.status === "confirmed").length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {appointments.filter((a) => a.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-2xl font-bold text-blue-600">
              {appointments.filter((a) => a.status === "completed").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
