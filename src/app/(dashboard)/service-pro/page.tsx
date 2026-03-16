"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Star,
  Plus,
  Settings,
  Banknote,
} from "lucide-react";

const ServiceProviderDashboard = () => {
  const router = useRouter();
  const [editingService, setEditingService] = React.useState<null | any>(null);
  const [editForm, setEditForm] = React.useState({
    name: "",
    description: "",
    cost: 0,
    duration: 0,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const openEdit = (service: any) => {
    setEditingService(service);
    setEditForm({
      name: service.title || service.name || "",
      description: service.description || "",
      cost: service.cost ?? 0,
      duration: service.durationInMinutes ?? service.duration ?? 0,
    });
  };

  const closeEdit = () => {
    setEditingService(null);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "cost" || name === "duration" ? Number(value) : value,
    }));
  };

  const submitEdit = async () => {
    if (!editingService) return;
    setIsSubmitting(true);
    try {
      // TODO: handle update service
      closeEdit();
    } catch (e) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = {
    totalBookings: 24,
    totalRevenue: 2400,
    activeServices: 5,
    averageRating: 4.8,
    todayBookings: 3,
    pendingBookings: 2,
  };

  const recentBookings = [
    {
      id: 1,
      customer: "John Doe",
      service: "Haircut & Styling",
      time: "10:00 AM",
      status: "confirmed",
      amount: 50,
    },
    {
      id: 2,
      customer: "Jane Smith",
      service: "Beard Trim",
      time: "11:30 AM",
      status: "pending",
      amount: 25,
    },
    {
      id: 3,
      customer: "Mike Johnson",
      service: "Full Service",
      time: "2:00 PM",
      status: "confirmed",
      amount: 75,
    },
  ];

  const services = [
    {
      id: 1,
      title: "Haircut & Styling",
      description: "Professional haircut and styling service",
      cost: 50,
      currencyCode: "NGN",
      durationInMinutes: 45,
    },
    {
      id: 2,
      title: "Beard Trim",
      description: "Clean beard trim and shaping",
      cost: 25,
      currencyCode: "NGN",
      durationInMinutes: 20,
    },
    {
      id: 3,
      title: "Full Service",
      description: "Complete hair and beard service package",
      cost: 75,
      currencyCode: "NGN",
      durationInMinutes: 60,
    },
  ];

  const quickActions = [
    {
      title: "View Calendar",
      description: "Check your schedule",
      icon: Calendar,
      color: "bg-blue-500",
      href: "/service-pro/calendar",
    },
    {
      title: "Manage Services",
      description: "Edit your services",
      icon: Settings,
      color: "bg-green-500",
      href: "/service-pro/Services-classes-nav/services",
    },
    {
      title: "View Customers",
      description: "See customer list",
      icon: Users,
      color: "bg-purple-500",
      href: "/service-pro/customers",
    },
    {
      title: "View Reports",
      description: "Check your analytics",
      icon: TrendingUp,
      color: "bg-orange-500",
      href: "/service-pro/settings-nav/report",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome back, Service Provider!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your business today
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/service-pro/create-service")}
                className="px-4 py-2 bg-secondary-500 text-white rounded-lg font-medium hover:bg-secondary-600 transition-colors text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalBookings}
                </p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  NGN {stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <Banknote className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Services
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.activeServices}
                </p>
              </div>
              <div className="p-3 bg-secondary-100 rounded-lg">
                <Settings className="w-6 h-6 text-secondary-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Rating
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.averageRating}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Services
                </h2>
                <button
                  onClick={() =>
                    router.push("/service-pro/Services-classes-nav/services")
                  }
                  className="text-secondary-600 hover:text-secondary-700 text-sm font-medium"
                >
                  Manage All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full">
                            {service.currencyCode}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-900">
                          {service.currencyCode} {service.cost.toLocaleString()}
                        </span>
                        <span className="text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {service.durationInMinutes} mins
                        </span>
                      </div>
                      <button
                        onClick={() => openEdit(service)}
                        className="text-secondary-600 hover:text-secondary-700 text-xs font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Bookings
                  </h2>
                  <button
                    onClick={() =>
                      router.push(
                        "/service-pro/Services-classes-nav/appointment"
                      )
                    }
                    className="text-secondary-600 hover:text-secondary-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Users className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.customer}
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.service}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            NGN {booking.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.time}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => router.push(action.href)}
                      className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className={`p-2 ${action.color} rounded-lg`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {action.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editingService && (
        <Modal>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Edit Service
            </h3>
            <p className="text-sm text-gray-600">Update basic details</p>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Service name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Description"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost
                </label>
                <input
                  name="cost"
                  type="number"
                  value={editForm.cost}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (mins)
                </label>
                <input
                  name="duration"
                  type="number"
                  value={editForm.duration}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <button
              onClick={closeEdit}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={submitEdit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Lightweight modal
const Modal = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-5">
      {children}
    </div>
  </div>
);

export default ServiceProviderDashboard;