'use client';

import React from 'react';
import {
  FaUsers,
  FaUserShield,
  FaGlobe,
  FaComments,
  FaCreditCard,
  FaStar,
  FaTags,
 
  FaArrowUp,
  FaArrowDown,
 
} from 'react-icons/fa';

// Stat Card Component
function StatCard({
  icon,
  title,
  value,
  change,
  changeType,
  color = 'bg-white',
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  color?: string;
}) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'up':
        return <FaArrowUp className="text-xs" />;
      case 'down':
        return <FaArrowDown className="text-xs" />;
      default:
        return null;
    }
  };

  return (
    <div className={`${color} p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-lg text-gray-700">
            {icon}
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            {getChangeIcon()}
            <span className="text-sm font-semibold">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Recent Activity Item Component
function ActivityItem({
  icon,
  title,
  description,
  time,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="p-2 bg-green-50 rounded-lg text-gray-700 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 truncate">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

// Quick Actions Component
function QuickActionCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:bg-gray-50 transition-all duration-200 group"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-green-100 rounded-lg text-gray-700 group-hover:bg-green-200 transition-colors duration-200">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </a>
  );
}

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here is what is happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaUsers className="text-xl" />}
          title="Total Users"
          value="2,847"
          change="+12.3%"
          changeType="up"
        />
        <StatCard
          icon={<FaUserShield className="text-xl" />}
          title="Active Admins"
          value="8"
          change="+2"
          changeType="up"
        />
        <StatCard
          icon={<FaComments className="text-xl" />}
          title="Messages"
          value="1,234"
          change="+5.7%"
          changeType="up"
        />
        <StatCard
          icon={<FaCreditCard className="text-xl" />}
          title="Active Plans"
          value="456"
          change="-2.1%"
          changeType="down"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaGlobe className="text-xl" />}
          title="Countries"
          value="25"
          change="+3"
          changeType="up"
        />
        <StatCard
          icon={<FaTags className="text-xl" />}
          title="Categories"
          value="18"
          change="No change"
          changeType="neutral"
        />
        <StatCard
          icon={<FaStar className="text-xl" />}
          title="Avg Rating"
          value="4.8"
          change="+0.2"
          changeType="up"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            <ActivityItem
              icon={<FaUsers className="text-sm" />}
              title="New User Registration"
              description="john.doe@email.com joined the platform"
              time="2 hours ago"
            />
            <ActivityItem
              icon={<FaComments className="text-sm" />}
              title="New Message"
              description="Support inquiry from premium user"
              time="4 hours ago"
            />
            <ActivityItem
              icon={<FaCreditCard className="text-sm" />}
              title="Plan Upgrade"
              description="User upgraded to Premium plan"
              time="6 hours ago"
            />
            <ActivityItem
              icon={<FaStar className="text-sm" />}
              title="New Rating"
              description="5-star rating received for event planner"
              time="8 hours ago"
            />
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              View all activity →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <QuickActionCard
              icon={<FaUsers className="text-lg" />}
              title="Manage Users"
              description="Add, edit, or remove users"
              href="/admin/users"
            />
            <QuickActionCard
              icon={<FaTags className="text-lg" />}
              title="Manage Categories"
              description="Configure event and planner categories"
              href="/admin/categories"
            />
            <QuickActionCard
              icon={<FaCreditCard className="text-lg" />}
              title="Billing Plans"
              description="Update subscription plans and pricing"
              href="/admin/billing"
            />
            <QuickActionCard
              icon={<FaComments className="text-lg" />}
              title="View Messages"
              description="Check and respond to user messages"
              href="/admin/messages"
            />
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Database</p>
              <p className="text-xs text-gray-600">All systems operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">API Services</p>
              <p className="text-xs text-gray-600">Running smoothly</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Email Service</p>
              <p className="text-xs text-gray-600">Minor delays expected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;