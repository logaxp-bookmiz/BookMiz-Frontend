"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Clock,
  Scissors,
  Star,
  MapPin,
} from "lucide-react";

// Static user data
const STATIC_USER = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  isAuthenticated: true,
};

const mockAppointments = [
  {
    id: 1,
    title: "Telesvade",
    date: "2024-01-02",
    startTime: "6:30AM",
    endTime: "7:30AM",
    type: "meeting",
    location: "No. 24 Ajengunle Street, Ibadan",
    rating: 4.8,
    service: "Haircut & Styling",
  },
  {
    id: 2,
    title: "Haircut appointment",
    date: "2024-01-10",
    startTime: "6:30AM",
    endTime: "7:30AM",
    type: "appointment",
    location: "No. 24 Ajengunle Street, Ibadan",
    rating: 4.9,
    service: "Beard Trim",
  },
];

// Type for appointment
interface Appointment {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  rating: number;
  service: string;
}

const Appointments = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // No loading state needed since we're using static data
  const isLoading = false;
  const isAuthenticated = STATIC_USER.isAuthenticated;
  const user = STATIC_USER;

  // Show error if not authenticated (commented out as per original)
  // if (!isAuthenticated || !user) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-xl font-semibold text-gray-900 mb-2">
  //           Access Denied
  //         </h2>
  //         <p className="text-gray-600">
  //           Please log in to access your appointments.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // Get user's first name for greeting
  const userFirstName = user?.firstname || "User";

  // Handle appointment cancellation
  const handleCancelAppointment = (appointmentId: number, reason: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
    setSelectedAppointment(null);
    setShowCancelModal(false);
    setCancelReason("");
    console.log(`Appointment ${appointmentId} cancelled. Reason: ${reason}`);
  };

  const openCancelModal = () => {
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setCancelReason("");
  };

  const confirmCancel = () => {
    if (cancelReason.trim() && selectedAppointment) {
      handleCancelAppointment(selectedAppointment.id, cancelReason);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getAppointmentForDate = (day: number | null) => {
    if (!day) return null;
    const dateString = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1,
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return appointments.find((apt) => apt.date === dateString);
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const timeSlots = [
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 AM",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-xl">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage your upcoming appointments and view your schedule
          </p>
        </div>

        {/* Calendar Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <div className="flex items-center gap-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {formatMonth(currentDate)}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-primary-600" />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 hover:text-primary-600" />
                </button>
              </div>
            </div>
            <button 
              onClick={goToToday}
              className="px-4 py-2 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
            >
              Today
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="flex">
            {/* Time slots column */}
            <div className="w-24 border-r border-gray-200/50">
              <div className="h-16 border-b border-gray-200/50"></div> {/* Header spacer */}
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-20 border-b border-gray-200/50 flex items-start justify-end pr-3 pt-2"
                >
                  <span className="text-sm text-gray-600 font-medium">
                    {time}
                  </span>
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="flex-1">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-gray-200/50">
                {dayNames.map((dayName, index) => (
                  <div
                    key={dayName}
                    className="h-16 flex items-center justify-center border-r border-gray-200/50 last:border-r-0"
                  >
                    <span className="text-sm font-semibold text-gray-700">
                      {dayName}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7">
                {days.map((day, index) => {
                  const appointment = getAppointmentForDate(day);
                  const todayHighlight = isToday(day);

                  return (
                    <div
                      key={index}
                      className={`h-24 border-r border-b border-gray-200/50 last:border-r-0 p-2 ${
                        day
                          ? "bg-white hover:bg-primary-50/30 cursor-pointer"
                          : "bg-gray-50/50"
                      }`}
                      onClick={() => day && appointment && setSelectedAppointment(appointment)}
                    >
                      {day && (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <span
                              className={`text-sm font-semibold ${
                                todayHighlight
                                  ? "bg-primary-500 text-white px-2 py-1 rounded-lg"
                                  : "text-gray-900"
                              }`}
                            >
                              {day}
                            </span>
                          </div>

                          {appointment && (
                            <div className="bg-primary-100 text-primary-800 p-2 rounded-lg text-xs transition-all duration-300 hover:scale-105 transform">
                              <div className="font-semibold truncate">
                                {appointment.title}
                              </div>
                              <div className="text-xs opacity-75">
                                {appointment.startTime} - {appointment.endTime}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 w-96 max-w-md mx-4 shadow-xl border border-gray-200/50">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Appointment Details
                </h2>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Scissors className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Service</p>
                    <p className="text-gray-900 font-semibold">
                      {selectedAppointment.service}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Date</p>
                    <p className="text-gray-900 font-semibold">
                      {new Date(selectedAppointment.date).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Time</p>
                    <p className="text-gray-900 font-semibold">
                      {selectedAppointment.startTime} -{" "}
                      {selectedAppointment.endTime}
                    </p>
                  </div>
                </div>

                {selectedAppointment.location && (
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MapPin className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Location
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {selectedAppointment.location}
                      </p>
                    </div>
                  </div>
                )}

                {selectedAppointment.rating && (
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Star className="text-yellow-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Rating
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <p className="text-gray-900 font-semibold">
                          {selectedAppointment.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <button
                  onClick={openCancelModal}
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 w-96 max-w-md mx-4 shadow-xl border border-gray-200/50">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Cancel Appointment
                </h2>
                <button
                  onClick={closeCancelModal}
                  className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4 text-base">
                  Please provide a reason for canceling this appointment:
                </p>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter reason for cancellation..."
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none transition-all duration-300"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeCancelModal}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 hover:scale-105 transform"
                >
                  Back
                </button>
                <button
                  onClick={confirmCancel}
                  disabled={!cancelReason.trim()}
                  className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;