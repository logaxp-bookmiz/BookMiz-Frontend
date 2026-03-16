"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDownIcon,
  BellIcon,
  UserIcon,
  EllipsisHorizontalIcon,
  VideoCameraIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { FaShare } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";

// Service data interface
interface Service {
  id: number;
  name: string;
  duration: number;
  price: string;
  color: string;
  category: string;
}

const ServicesClassesPage = () => {
  const router = useRouter();
  const [shareDropdownOpen, setShareDropdownOpen] = useState<number | null>(
    null
  );

  // Sample service data
  const services: Service[] = [
    {
      id: 1,
      name: "15 Minutes Meeting",
      duration: 15,
      price: "Free",
      color: "#10B981", // Green
      category: "Consultation",
    },
    {
      id: 2,
      name: "30 Minutes Meeting",
      duration: 30,
      price: "Free",
      color: "#8B5CF6", // Purple
      category: "Consultation",
    },
    {
      id: 3,
      name: "60 Minutes Meeting",
      duration: 60,
      price: "Free",
      color: "#6B7280", // Gray
      category: "Consultation",
    },
  ];

  const handleServiceClick = (serviceId: number) => {
    // Navigate to service detail or edit page
    console.log("Service clicked:", serviceId);
  };

  const handleShare = (serviceId: number) => {
    // Toggle share dropdown
    setShareDropdownOpen(shareDropdownOpen === serviceId ? null : serviceId);
  };

  const handleCopyLink = (serviceId: number) => {
    // Handle copy link functionality
    const link = `${window.location.origin}/service/${serviceId}`;
    navigator.clipboard.writeText(link);
    console.log("Link copied:", link);
    setShareDropdownOpen(null);
  };

  const handleShareEmail = (serviceId: number) => {
    // Handle share via email functionality
    const subject = "Check out this service";
    const body = `I thought you might be interested in this service: ${window.location.origin}/service/${serviceId}`;
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`
    );
    console.log("Share via email:", serviceId);
    setShareDropdownOpen(null);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setShareDropdownOpen(null);
  };

  // Add click outside listener
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (shareDropdownOpen !== null) {
        setShareDropdownOpen(null);
      }
    };

    if (shareDropdownOpen !== null) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [shareDropdownOpen]);

  const handleMoreOptions = (serviceId: number) => {
    // Handle more options menu
    console.log("More options for service:", serviceId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Services & Classes
            </h1>
          </div>

          {/* Top right icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <BellIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Emmanuel
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Table Header */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Category
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Services (3)
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Time slot
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Appointment
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </div>

          {/* Service Cards */}
          <div className="divide-y divide-gray-200">
            {services.map((service) => (
              <div
                key={service.id}
                className="grid grid-cols-4 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleServiceClick(service.id)}
              >
                {/* Category Column */}
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">
                    {service.category}
                  </span>
                </div>

                {/* Service Column */}
                <div className="flex items-center space-x-3">
                  <div
                    className="w-1 h-12 rounded-full"
                    style={{ backgroundColor: service.color }}
                  />
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm"
                      style={{ backgroundColor: service.color }}
                    >
                      {service.duration}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {service.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {service.duration} Mins • {service.price}
                        </p>
                      </div>
                      <VideoCameraIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Time Slot Column */}
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">Available</span>
                </div>

                {/* Appointment Column */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Open</span>
                  <div className="flex items-center space-x-2 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(service.id);
                      }}
                      className="flex items-center space-x-1 px-3 py-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <FaShare size={14} />
                      <span className="text-xs font-medium">Share</span>
                    </button>

                    {/* Share Dropdown */}
                    {shareDropdownOpen === service.id && (
                      <div
                        className={`absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 ${
                          service.id === services[services.length - 1].id
                            ? "bottom-full mb-1"
                            : "top-full mt-1"
                        }`}
                      >
                        <div className="py-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyLink(service.id);
                            }}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <IoCopyOutline size={14} />
                            <span>Copy button link</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShareEmail(service.id);
                            }}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <HiOutlineMail size={14} />
                            <span>Share via email</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoreOptions(service.id);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <EllipsisHorizontalIcon className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State (when no services) */}
        {services.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <CameraIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No services yet
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first service to get started
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesClassesPage;
