"use client"

import { useState } from 'react';

export default function SecuritySettings() {
  const [ ] = useState(false);
  const [ ] = useState(false);
  const [ ] = useState(false);
  

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-14">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Security settings
            </h1>
            <p className="text-sm text-gray-600">
              Update your security settings
            </p>
          </div>

          {/* Password Section */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="mb-4">
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
                PASSWORD
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Update your password
                </h3>
              </div>
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Change password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication Section */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="mb-6">
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-6">
                TWO-FACTOR AUTHENTICATION
              </h2>
            </div>
            
            {/* Email Authentication */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 mr-6">
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Enable Email Authentication
                </h3>
                <p className="text-sm text-gray-600">
                  You will receive an OTP to your email each time you want to login
                </p>
              </div>
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Add Email Backup
              </button>
            </div>

            {/* SMS Authentication */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-6">
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Enable SMS Authentication
                </h3>
                <p className="text-sm text-gray-600">
                  You will receive an OTP to your phone each time you want to login
                </p>
              </div>
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Add SMS Backup
              </button>
            </div>
          </div>

          {/* Google Authenticator Section */}
          <div className="px-8 py-6">
            <div className="mb-6">
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-6">
                GOOGLE AUTHENTICATOR
              </h2>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Enable Authenticator App
                </h3>
                <p className="text-sm text-gray-600">
                  Configuring an authenticator app is a great way to add an extra layer of security to your account
                </p>
              </div>
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Add Authenticator App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}