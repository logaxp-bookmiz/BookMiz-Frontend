"use client"

import React, { useState } from 'react';
import { Copy, Link, Eye } from 'lucide-react';

interface FormData {
  brandName: string;
  phone: string;
  primaryEmail: string;
  industry: string;
  currency: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  about: string;
}

interface BookingPolicies {
  cancellationPolicy: string;
  reschedulePolicy: string;
  noShowPolicy: string;
  advanceBooking: string;
}

interface BookingPreferences {
  bufferTime: string;
  workingHours: { start: string; end: string };
  timeZone: string;
  allowWeekends: boolean;
}

interface Customization {
  primaryColor: string;
  welcomeMessage: string;
  thankYouMessage: string;
}

const BookingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    phone: '+234',
    primaryEmail: '',
    industry: '',
    currency: 'Nigeria NGN',
    country: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    about: ''
  });

  const [bookingPolicies, setBookingPolicies] = useState<BookingPolicies>({
    cancellationPolicy: '24',
    reschedulePolicy: '12',
    noShowPolicy: 'charge',
    advanceBooking: '30'
  });

  const [bookingPreferences, setBookingPreferences] = useState<BookingPreferences>({
    bufferTime: '15',
    workingHours: { start: '09:00', end: '17:00' },
    timeZone: 'Africa/Lagos',
    allowWeekends: false
  });

  const [customization, setCustomization] = useState<Customization>({
    primaryColor: '#41F63BFF',
    welcomeMessage: 'Welcome! Please select a time that works for you.',
    thankYouMessage: 'Thank you for booking with us!'
  });

  const tabs = ['Overview', 'Booking policies', 'Booking preferences', 'Customization'];
  
  const socialApps = [
    { name: 'Facebook', icon: '📘' },
    { name: 'Instagram', icon: '📷' },
    { name: 'Zoom', icon: '🎥' },
    { name: 'Square', icon: '⬜' },
    { name: 'WordPress', icon: '📝' },
    { name: 'Google meet', icon: '📞' },
    { name: 'Skype', icon: '💬' },
    { name: 'Salesforce', icon: '☁️' },
    { name: 'Wix', icon: '🌐' },
    { name: 'Heva', icon: '📊' }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const copyBookingUrl = () => {
    navigator.clipboard.writeText('https://adjust.business.com');
  };

  const renderOverviewTab = () => (
    <div>
      {/* Booking URL */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your booking page URL
        </label>
        <div className="flex items-center space-x-2">
          <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm">
            https://adjust.business.com
          </div>
          <button onClick={copyBookingUrl} className="p-2 text-gray-500 hover:text-gray-700">
            <Copy size={16} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Link size={16} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Connect apps */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Connect apps</h3>
        <div className="grid grid-cols-5 gap-4">
          {socialApps.map((app) => (
            <button
              key={app.name}
              className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mb-1">{app.icon}</span>
              <span className="text-xs text-gray-600">{app.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brand Details */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Your brand details</h2>
        
        {/* Upload Banner */}
        <div className="mb-6 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-green-600 text-2xl">+</span>
          </div>
          <button className="text-sm text-gray-600 hover:text-gray-800">
            + Upload your banner
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Basic Details
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand name
            </label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => handleInputChange('brandName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary email
            </label>
            <input
              type="email"
              value={formData.primaryEmail}
              onChange={(e) => handleInputChange('primaryEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="Nigeria NGN">Nigeria NGN</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          {/* Address */}
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-8">
            Address
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="Nigeria">Nigeria</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Rivers">Rivers</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zipcode
            </label>
            <input
              type="text"
              value={formData.zipcode}
              onChange={(e) => handleInputChange('zipcode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About
            </label>
            <textarea
              value={formData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              rows={4}
              placeholder="Write a short description of your brand/recommended"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookingPoliciesTab = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Booking Policies</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cancellation Policy (hours before appointment)
        </label>
        <select
          value={bookingPolicies.cancellationPolicy}
          onChange={(e) => setBookingPolicies(prev => ({ ...prev, cancellationPolicy: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="24">24 hours</option>
          <option value="12">12 hours</option>
          <option value="6">6 hours</option>
          <option value="2">2 hours</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reschedule Policy (hours before appointment)
        </label>
        <select
          value={bookingPolicies.reschedulePolicy}
          onChange={(e) => setBookingPolicies(prev => ({ ...prev, reschedulePolicy: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="12">12 hours</option>
          <option value="6">6 hours</option>
          <option value="4">4 hours</option>
          <option value="2">2 hours</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          No-show Policy
        </label>
        <select
          value={bookingPolicies.noShowPolicy}
          onChange={(e) => setBookingPolicies(prev => ({ ...prev, noShowPolicy: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="charge">Charge full amount</option>
          <option value="partial">Charge partial amount</option>
          <option value="none">No charge</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maximum advance booking (days)
        </label>
        <select
          value={bookingPolicies.advanceBooking}
          onChange={(e) => setBookingPolicies(prev => ({ ...prev, advanceBooking: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="30">30 days</option>
          <option value="60">60 days</option>
          <option value="90">90 days</option>
          <option value="unlimited">Unlimited</option>
        </select>
      </div>
    </div>
  );

  const renderBookingPreferencesTab = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Booking Preferences</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Buffer time between appointments (minutes)
        </label>
        <select
          value={bookingPreferences.bufferTime}
          onChange={(e) => setBookingPreferences(prev => ({ ...prev, bufferTime: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="0">No buffer</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work start time
          </label>
          <input
            type="time"
            value={bookingPreferences.workingHours.start}
            onChange={(e) => setBookingPreferences(prev => ({ 
              ...prev, 
              workingHours: { ...prev.workingHours, start: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work end time
          </label>
          <input
            type="time"
            value={bookingPreferences.workingHours.end}
            onChange={(e) => setBookingPreferences(prev => ({ 
              ...prev, 
              workingHours: { ...prev.workingHours, end: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Time Zone
        </label>
        <select
          value={bookingPreferences.timeZone}
          onChange={(e) => setBookingPreferences(prev => ({ ...prev, timeZone: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York (EST)</option>
          <option value="Europe/London">Europe/London (GMT)</option>
        </select>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="allowWeekends"
          checked={bookingPreferences.allowWeekends}
          onChange={(e) => setBookingPreferences(prev => ({ ...prev, allowWeekends: e.target.checked }))}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="allowWeekends" className="text-sm font-medium text-gray-700">
          Allow weekend bookings
        </label>
      </div>
    </div>
  );

  const renderCustomizationTab = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Customization</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Color
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={customization.primaryColor}
            onChange={(e) => setCustomization(prev => ({ ...prev, primaryColor: e.target.value }))}
            className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={customization.primaryColor}
            onChange={(e) => setCustomization(prev => ({ ...prev, primaryColor: e.target.value }))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="#3B82F6"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Welcome Message
        </label>
        <textarea
          value={customization.welcomeMessage}
          onChange={(e) => setCustomization(prev => ({ ...prev, welcomeMessage: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          placeholder="Welcome! Please select a time that works for you."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thank You Message
        </label>
        <textarea
          value={customization.thankYouMessage}
          onChange={(e) => setCustomization(prev => ({ ...prev, thankYouMessage: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          placeholder="Thank you for booking with us!"
        />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
        <div 
          className="p-4 rounded border-2 border-dashed"
          style={{ borderColor: customization.primaryColor }}
        >
          <p className="text-sm text-gray-600 mb-2">{customization.welcomeMessage}</p>
          <div 
            className="inline-block px-3 py-1 rounded text-white text-xs"
            style={{ backgroundColor: customization.primaryColor }}
          >
            Sample Button
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Overview':
        return renderOverviewTab();
      case 'Booking policies':
        return renderBookingPoliciesTab();
      case 'Booking preferences':
        return renderBookingPreferencesTab();
      case 'Customization':
        return renderCustomizationTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking page</h1>
        <p className="text-gray-600">Personalise how people schedule appointment with you</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderActiveTab()}
    </div>
  );
};

export default BookingPage;