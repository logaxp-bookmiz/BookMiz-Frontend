"use client";

import React, { useState } from "react";
import ProfileTab from "./_components/ProfileTab";
import CityTab from "./_components/CityTab";
import HomeLocationTab from "./_components/HomeLocationTab";
import NotificationsTab from "./_components/NotificationsTab";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [updateStatus, setUpdateStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "city", label: "My City" },
    { id: "home", label: "Home Location" },
    { id: "notifications", label: "Notifications" },
  ];

  const handleUpdateStatus = (status: {
    loading: boolean;
    success: boolean;
    error: string | null;
  }) => {
    setUpdateStatus(status);
  };

  const renderActiveForm = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab onUpdateStatus={handleUpdateStatus} />;
      case "city":
        return <CityTab onUpdateStatus={handleUpdateStatus} />;
      case "home":
        return <HomeLocationTab />;
      case "notifications":
        return <NotificationsTab onUpdateStatus={handleUpdateStatus} />;
      default:
        return <ProfileTab onUpdateStatus={handleUpdateStatus} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Settings</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setUpdateStatus({ loading: false, success: false, error: null });
                }}
                className={`px-6 py-4 text-base font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-gray-900 border-b-2 border-gray-900 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">{renderActiveForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;