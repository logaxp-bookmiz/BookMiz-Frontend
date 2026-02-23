"use client";

import React, { useState } from "react";

interface NotificationsTabProps {
  onUpdateStatus?: (status: { loading: boolean; success: boolean; error: string | null }) => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ onUpdateStatus }) => {
  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Update status
  const [updateStatus, setUpdateStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  const handleSubmit = () => {
    const newStatus = { loading: true, success: false, error: null };
    setUpdateStatus(newStatus);
    onUpdateStatus?.(newStatus);

    // Simulate API call
    setTimeout(() => {
      console.log("Notifications updated:", {
        emailNotifications,
        pushNotifications,
        smsNotifications,
        marketingEmails,
      });

      const successStatus = { loading: false, success: true, error: null };
      setUpdateStatus(successStatus);
      onUpdateStatus?.(successStatus);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">
          Notifications
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Manage your notification preferences and communication settings
        </p>
      </div>

      {updateStatus.loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800">Updating notifications...</p>
        </div>
      )}

      {updateStatus.success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-green-800">Notifications updated successfully!</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <h4 className="text-lg font-medium text-gray-900">
              Email Notifications
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Receive updates and alerts via email
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <h4 className="text-lg font-medium text-gray-900">
              Push Notifications
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Receive push notifications on your device
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <h4 className="text-lg font-medium text-gray-900">
              SMS Notifications
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Receive text messages for important updates
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <h4 className="text-lg font-medium text-gray-900">
              Marketing Emails
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Receive promotional offers and product updates
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={marketingEmails}
              onChange={(e) => setMarketingEmails(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={updateStatus.loading}
        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {updateStatus.loading ? "Updating..." : "Update Notifications"}
      </button>
    </div>
  );
};

export default NotificationsTab;