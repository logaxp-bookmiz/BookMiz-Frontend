"use client";

import React, { useState } from "react";
import {
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Trash2,
} from "lucide-react";
import DashboardHeader from "../_components/UserDashboardHeader";

// Static user data
const STATIC_USER = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  isAuthenticated: true,
};

// Define types for your appointment data
interface Service {
  name: string;
}

interface Business {
  name: string;
}

interface Appointment {
  id: number;
  service: Service;
  business: Business;
  date: string;
  startTime: string;
  endTime: string;
  status: "Pending" | "Complete" | string;
}

// Static appointments data
const STATIC_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    service: { name: "Hair Styling" },
    business: { name: "Prestige Barber Studio" },
    date: "2025-10-15",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Pending",
  },
  {
    id: 2,
    service: { name: "Beard Trim" },
    business: { name: "Prestige Barber Studio" },
    date: "2025-10-10",
    startTime: "2:00 PM",
    endTime: "2:30 PM",
    status: "Complete",
  },
  {
    id: 3,
    service: { name: "Deep Pore Facial" },
    business: { name: "Glow Skin & Beauty Lounge" },
    date: "2025-10-05",
    startTime: "11:30 AM",
    endTime: "12:30 PM",
    status: "Complete",
  },
  {
    id: 4,
    service: { name: "Personal Training Session" },
    business: { name: "FlexFit Personal Training" },
    date: "2025-10-20",
    startTime: "9:00 AM",
    endTime: "10:30 AM",
    status: "Pending",
  },
];

// Flag to toggle between showing real data or dummy data
// Set to true to show STATIC_APPOINTMENTS, false to show only dummy data
const HAS_REAL_APPOINTMENTS = true;

// Dummy data to show when no appointments exist
const dummyAppointment: Appointment = {
  id: 0,
  service: { name: "Hair Styling" },
  business: { name: "Sample Salon" },
  date: "2025-10-15",
  startTime: "10:00 AM",
  endTime: "11:00 AM",
  status: "Pending",
};

const AppointmentHistory = () => {
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>(
    HAS_REAL_APPOINTMENTS ? STATIC_APPOINTMENTS : []
  );

  // Static user data (no loading needed)
  const user = STATIC_USER;
  const isAuthenticated = STATIC_USER.isAuthenticated;
  const isLoading = false;

  // Use dummy data if no appointments exist
  const displayAppointments: Appointment[] = appointments.length > 0 ? appointments : [dummyAppointment];
  const hasRealAppointments = appointments.length > 0;

  const userFirstName = user?.firstname || "User";

  const handleSelectAppointment = (id: number) => {
    // Don't allow selection if no real appointments
    if (!hasRealAppointments) return;
    
    setSelectedAppointments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    // Don't allow selection if no real appointments
    if (!hasRealAppointments) return;
    
    if (selectedAppointments.length === appointments.length) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(appointments.map((apt) => apt.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedAppointments.length === 0 || !hasRealAppointments) return;
    
    // Simulate delete
    console.log("Deleting appointments:", selectedAppointments);
    
    // Remove selected appointments from state
    setAppointments((prev) => prev.filter((apt) => !selectedAppointments.includes(apt.id)));
    setSelectedAppointments([]);
    
    // Show success message
    alert(`Successfully deleted ${selectedAppointments.length} appointment(s)`);
  };

  const handleDeleteSingle = (appointmentId: number) => {
    if (!hasRealAppointments) return;
    
    // Find the appointment to delete
    const appointmentToDelete = appointments.find(apt => apt.id === appointmentId);
    
    // Simulate delete
    console.log("Deleting appointment:", appointmentId);
    
    // Remove appointment from state
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
    
    // Also remove from selected if it was selected
    if (selectedAppointments.includes(appointmentId)) {
      setSelectedAppointments((prev) => prev.filter((id) => id !== appointmentId));
    }
    
    // Show success message
    alert(`Successfully deleted appointment: ${appointmentToDelete?.service?.name || "Appointment"}`);
  };

  const getStatusBadge = (status: string) => {
    const base =
      "px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1";
    if (status === "Pending") return `${base} bg-yellow-100 text-yellow-800`;
    if (status === "Complete") return `${base} bg-green-100 text-green-800`;
    return base;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          username={userFirstName}
          timezone="GMT+01"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilterClick={() => console.log("Filter clicked")}
          onBookClick={() => console.log("Book Appointment clicked")}
        />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-xl">
              <Clock className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Appointment History
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            View and manage your past and upcoming appointments
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={hasRealAppointments && selectedAppointments.length === appointments.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        disabled={!hasRealAppointments}
                      />
                      {hasRealAppointments && selectedAppointments.length > 0 && (
                        <button
                          onClick={handleDeleteSelected}
                          className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                          title="Delete selected appointments"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete ({selectedAppointments.length})
                        </button>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200/50">
                {displayAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-primary-50/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedAppointments.includes(apt.id)}
                        onChange={() => handleSelectAppointment(apt.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        disabled={!hasRealAppointments}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">
                          {apt.service?.name || "—"}
                        </span>
                        {!hasRealAppointments && (
                          <span className="ml-2 text-xs text-gray-400 italic">
                            (Sample)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">
                        {apt.business?.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(apt.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {apt.startTime} - {apt.endTime}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(apt.status)}>
                        {apt.status === "Complete" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteSingle(apt.id)}
                        disabled={!hasRealAppointments}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete appointment"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty state when no appointments at all */}
            {appointments.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-50 rounded-xl w-fit mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No Appointments Found
                </h3>
                <p className="text-gray-500">
                  You don't have any appointment history yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentHistory;