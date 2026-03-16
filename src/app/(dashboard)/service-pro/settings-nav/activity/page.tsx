// app/activity/page.tsx (Next.js App Router)
"use client";

import React from "react";

interface ActivityItem {
  time: string;
  user: string;
  action: string;
}

const activities: ActivityItem[] = [
  {
    time: "3:24 PM",
    user: "Ujah",
    action: "Created class titled product design",
  },
  {
    time: "6:34 PM",
    user: "Ujah",
    action: "Updated location for 30 Minutes Meeting from In Person to Video",
  },
  {
    time: "3:24 PM",
    user: "Ujah",
    action: "Created class titled product design",
  },
];

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Container */}
      <div className="max-w-4xl mx-auto">
        {/* Page title */}
        <h1 className="text-lg font-medium text-gray-900 mb-6">
          Activity
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          View your most recent booking updates.
        </p>

        {/* Date Header */}
        <h2 className="text-sm font-semibold text-gray-800 mb-4">
          Sun 28 Jan 2024
        </h2>

        {/* Activity List */}
        <div className="space-y-5">
          {activities.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              {/* User Initial */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                <span className="text-white font-medium">
                  {item.user.charAt(0)}
                </span>
              </div>

              {/* Details */}
              <div>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{item.user}</span>{" "}
                  {item.action}
                </p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
