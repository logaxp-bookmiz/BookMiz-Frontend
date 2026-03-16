"use client"

import React, { useState } from 'react';
import { Bell, User, Users, Settings, Check, Mail, MessageCircle, Calendar } from 'lucide-react';

type NotificationLevel = 'all' | 'focus' | 'none';

interface CustomerSettings {
  confirmation: boolean;
  changes: boolean;
  cancellation: boolean;
  emailReminder: boolean;
  reminderDays: number;
}

interface StaffSettings {
  confirmation: boolean;
  changes: boolean;
  cancellation: boolean;
  emailReminder: boolean;
  reminderDays: number;
}

interface PersonalizedSettings {
  senderName: string;
  emailSignature: string;
}

const NotificationSettings = () => {
  const [activeTab, setActiveTab] = useState('My notification');
  const [notificationLevel, setNotificationLevel] = useState<NotificationLevel>('all');
  
  const [customerSettings, setCustomerSettings] = useState<CustomerSettings>({
    confirmation: true,
    changes: true,
    cancellation: true,
    emailReminder: true,
    reminderDays: 0
  });

  const [staffSettings, setStaffSettings] = useState<StaffSettings>({
    confirmation: true,
    changes: true,
    cancellation: true,
    emailReminder: true,
    reminderDays: 0
  });

  const [personalizedSettings, setPersonalizedSettings] = useState<PersonalizedSettings>({
    senderName: 'Ujah Emmanuel',
    emailSignature: 'Thanks,\nUjah'
  });

  const tabs = [
    { id: 'My notification', label: 'My notification', icon: Bell },
    { id: 'Customer', label: 'Customer', icon: User },
    { id: 'Staff', label: 'Staff', icon: Users },
    { id: 'Personalized notification', label: 'Personalized notifications', icon: Settings }
  ];

  const renderMyNotifications = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">My notifications</h3>
        <p className="text-sm text-gray-600 mb-6">Choose the type of notifications you receive</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="relative">
            <input
              type="radio"
              id="all"
              name="notification-level"
              value="all"
              checked={notificationLevel === 'all'}
              onChange={(e) => setNotificationLevel(e.target.value as NotificationLevel)}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${notificationLevel === 'all' ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {notificationLevel === 'all' && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div>
            <label htmlFor="all" className="font-medium text-gray-900 cursor-pointer">All</label>
            <p className="text-sm text-gray-600">All connects, chats & mentions plus appointments updates</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="relative">
            <input
              type="radio"
              id="focus"
              name="notification-level"
              value="focus"
              checked={notificationLevel === 'focus'}
              onChange={(e) => setNotificationLevel(e.target.value as NotificationLevel)}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${notificationLevel === 'focus' ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {notificationLevel === 'focus' && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div>
            <label htmlFor="focus" className="font-medium text-gray-900 cursor-pointer">Focus mode</label>
            <p className="text-sm text-gray-600">Only direct connects, chats & mentions plus appointments updates</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="relative">
            <input
              type="radio"
              id="none"
              name="notification-level"
              value="none"
              checked={notificationLevel === 'none'}
              onChange={(e) => setNotificationLevel(e.target.value as NotificationLevel)}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${notificationLevel === 'none' ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {notificationLevel === 'none' && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div>
            <label htmlFor="none" className="font-medium text-gray-900 cursor-pointer">None</label>
            <p className="text-sm text-gray-600">Turn off all notifications</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Updates</h3>
        <p className="text-gray-600 mb-6">Automate notifications for new, edited and cancelled bookings</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              id="customer-confirmation"
              checked={customerSettings.confirmation}
              onChange={(e) => setCustomerSettings(prev => ({
                ...prev,
                confirmation: e.target.checked
              }))}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${customerSettings.confirmation ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {customerSettings.confirmation && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-medium text-gray-700 mb-1">Confirmation</h4>
            <p className="text-gray-500">Automate notifications for new bookings</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              id="customer-changes"
              checked={customerSettings.changes}
              onChange={(e) => setCustomerSettings(prev => ({
                ...prev,
                changes: e.target.checked
              }))}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${customerSettings.changes ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {customerSettings.changes && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-medium text-gray-700 mb-1">Changes</h4>
            <p className="text-gray-500">Automate notifications for edited or rescheduled bookings</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              id="customer-cancellation"
              checked={customerSettings.cancellation}
              onChange={(e) => setCustomerSettings(prev => ({
                ...prev,
                cancellation: e.target.checked
              }))}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${customerSettings.cancellation ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {customerSettings.cancellation && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-medium text-gray-700 mb-1">Cancellation</h4>
            <p className="text-gray-500">Automate notifications for cancelled bookings</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Reminders</h3>
        <p className="text-gray-600 mb-6">Keep staff in the loop with automatic reminders for upcoming bookings</p>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              id="customer-email-reminder"
              checked={customerSettings.emailReminder}
              onChange={(e) => setCustomerSettings(prev => ({
                ...prev,
                emailReminder: e.target.checked
              }))}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${customerSettings.emailReminder ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {customerSettings.emailReminder && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <div>
                <h4 className="text-lg font-medium text-gray-700">Email</h4>
                <p className="text-gray-500">prior to appointment</p>
              </div>
              <div className="flex items-center space-x-2 ml-auto">
                <input
                  type="number"
                  value={customerSettings.reminderDays}
                  onChange={(e) => setCustomerSettings(prev => ({
                    ...prev,
                    reminderDays: parseInt(e.target.value) || 0
                  }))}
                  className="w-16 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none    focus:border-primary-500"
                  min="0"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  ">
                  <option>days</option>
                  <option>hours</option>
                  <option>weeks</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaffSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Updates</h3>
        <p className="text-gray-600 mb-6">Automate notifications for new, edited and cancelled bookings</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              id="staff-confirmation"
              checked={staffSettings.confirmation}
              onChange={(e) => setStaffSettings(prev => ({
                ...prev,
                confirmation: e.target.checked
              }))}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${staffSettings.confirmation ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {staffSettings.confirmation && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-medium text-gray-700 mb-1">Confirmation</h4>
            <p className="text-gray-500">Automate notifications for new bookings</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              id="staff-changes"
              checked={staffSettings.changes}
              onChange={(e) => setStaffSettings(prev => ({
                ...prev,
                changes: e.target.checked
              }))}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${staffSettings.changes ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {staffSettings.changes && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-medium text-gray-700 mb-1">Changes</h4>
            <p className="text-gray-500">Automate notifications for edited or rescheduled bookings</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              id="staff-cancellation"
              checked={staffSettings.cancellation}
              onChange={(e) => setStaffSettings(prev => ({
                ...prev,
                cancellation: e.target.checked
              }))}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${staffSettings.cancellation ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {staffSettings.cancellation && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-medium text-gray-700 mb-1">Cancellation</h4>
            <p className="text-gray-500">Automate notifications for cancelled bookings</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Reminders</h3>
        <p className="text-gray-600 mb-6">Keep staff in the loop with automatic reminders for upcoming bookings</p>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              id="staff-email-reminder"
              checked={staffSettings.emailReminder}
              onChange={(e) => setStaffSettings(prev => ({
                ...prev,
                emailReminder: e.target.checked
              }))}
              className="sr-only"
            />
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${staffSettings.emailReminder ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
              {staffSettings.emailReminder && (
                <Check className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <div>
                <h4 className="text-lg font-medium text-gray-700">Email</h4>
                <p className="text-gray-500">prior to appointment</p>
              </div>
              <div className="flex items-center space-x-2 ml-auto">
                <input
                  type="number"
                  value={staffSettings.reminderDays}
                  onChange={(e) => setStaffSettings(prev => ({
                    ...prev,
                    reminderDays: parseInt(e.target.value) || 0
                  }))}
                  className="w-16 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2  focus:border-primary-500"
                  min="0"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  ">
                  <option>days</option>
                  <option>hours</option>
                  <option>weeks</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonalizedSettings = () => (
    <div className="space-y-6">
      <div className="space-y-6">
        <div>
          <label htmlFor="senderName" className="block text-lg font-medium text-gray-900 mb-3">
            Sender Name
          </label>
          <input
            type="text"
            id="senderName"
            value={personalizedSettings.senderName}
            onChange={(e) => setPersonalizedSettings(prev => ({
              ...prev,
              senderName: e.target.value
            }))}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none   focus:ring-primary-500   text-base"
            placeholder="Enter sender name"
          />
        </div>

        <div>
          <label htmlFor="emailSignature" className="block text-lg font-medium text-gray-900 mb-3">
            Email signature
          </label>
          <textarea
            id="emailSignature"
            value={personalizedSettings.emailSignature}
            onChange={(e) => setPersonalizedSettings(prev => ({
              ...prev,
              emailSignature: e.target.value
            }))}
            rows={4}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base resize-none"
            placeholder="Enter your email signature"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'My notification':
        return renderMyNotifications();
      case 'Customer':
        return renderCustomerSettings();
      case 'Staff':
        return renderStaffSettings();
      case 'Personalized notification':
        return renderPersonalizedSettings();
      default:
        return renderMyNotifications();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-gray-500 text-gray-500 font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>

      {/* Save Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Cancel
          </button>
          <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center space-x-2">
            <Check className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;