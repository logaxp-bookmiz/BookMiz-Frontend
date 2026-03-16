"use client"
import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  isActive: boolean;
}

const PaymentIntegrations = () => {
  const [activeTab, setActiveTab] = useState<string>('payment-integrations');
  const [acceptBookingPayments, setAcceptBookingPayments] = useState<boolean>(false);
  const [requirePaymentUpfront, setRequirePaymentUpfront] = useState<boolean>(false);

  const tabs: Tab[] = [
    { id: 'payment-integrations', label: 'Payment integrations', isActive: activeTab === 'payment-integrations' },
    { id: 'booking-page-payments', label: 'Booking page payments', isActive: activeTab === 'booking-page-payments' },
    { id: 'payment-history', label: 'Payment history', isActive: activeTab === 'payment-history' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderPaymentBoxes = (count: number) => {
    const boxes = [];
    for (let i = 0; i < count; i++) {
      boxes.push(
        <div key={i} className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-950 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Square</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Get paid for your services via Square, CashApp, Apple Pay or Google Pay.
          </p>
        </div>
      );
    }
    return boxes;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen mt-14">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-6 py-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Payment integrations</h1>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-6">
          <div className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  tab.isActive
                    ? 'border-blue-950 text-blue-950'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'payment-integrations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderPaymentBoxes(8)}
            </div>
          )}

          {activeTab === 'booking-page-payments' && (
            <div className="space-y-6">
              {/* Tab Title and Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Booking page payments</h2>
                <p className="text-gray-600">Manage how customers are able to pay for your service</p>
              </div>

              {/* Accept Booking Page payments */}
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Accept Booking Page payments</h3>
                    <p className="text-gray-600 text-sm">Enable customers to pay online ahead of time</p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => setAcceptBookingPayments(!acceptBookingPayments)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        acceptBookingPayments ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          acceptBookingPayments ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Require payment upfront */}
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Require payment upfront</h3>
                    <p className="text-gray-600 text-sm">Switch off for payment to be optional at the time of booking.</p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => setRequirePaymentUpfront(!requirePaymentUpfront)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        requirePaymentUpfront ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          requirePaymentUpfront ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional charges section */}
              <div className="space-y-4">
                <p className="text-gray-600">Would you like to apply additional charges or reductions, like taxes or discounts?</p>
                
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm">Add charge or reduction</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'payment-history' && (
            <div className="space-y-6">
              {/* Tab Title */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment history</h2>
              </div>

              {/* Search and Date Filter Section */}
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="What services do you need?"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Date Filters */}
                <div className="flex gap-4">
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-3 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                      <option>11 feb 2024</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-3 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                      <option>20 feb 2024</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <button className="bg-blue-950 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition-colors font-medium">
                  Generate
                </button>
              </div>

              {/* Empty State */}
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No payment to display</h3>
                <p className="text-gray-500">Try a different range</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentIntegrations;