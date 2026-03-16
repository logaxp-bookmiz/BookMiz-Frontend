"use client"
import { useState } from 'react';

const ReportsPage = () => {
  const [startDate, setStartDate] = useState<string>('11 feb 2024');
  const [endDate, setEndDate] = useState<string>('20 feb 2024');
  const [serviceFilter, setServiceFilter] = useState<string>('All services/classes');

  const handleGenerate = () => {
    // Handle generate report logic here
    console.log('Generating report with:', { startDate, endDate, serviceFilter });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 mt-24 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-6 py-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        </div>

        {/* Filter Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Start Date */}
            <div className="relative">
              <select 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-3 pr-8 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-blue-950  "
              >
                <option value="11 feb 2024">11 feb 2024</option>
                <option value="10 feb 2024">10 feb 2024</option>
                <option value="9 feb 2024">9 feb 2024</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* End Date */}
            <div className="relative">
              <select 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-3 pr-8 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border--blue-950"
              >
                <option value="20 feb 2024">20 feb 2024</option>
                <option value="21 feb 2024">21 feb 2024</option>
                <option value="22 feb 2024">22 feb 2024</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Service Filter */}
            <div className="relative">
              <select 
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-3 pr-8 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
              >
                <option value="All services/classes">All services/classes</option>
                <option value="Fitness classes">Fitness classes</option>
                <option value="Personal training">Personal training</option>
                <option value="Yoga sessions">Yoga sessions</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Generate Button */}
            <button 
              onClick={handleGenerate}
              className="bg-blue-950 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition-colors font-medium"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center relative">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {/* Cursor indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-400 rounded-sm transform rotate-12">
                <div className="w-2 h-2 bg-white rounded-full mt-0.5 ml-0.5"></div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Select date range</h2>
          <p className="text-gray-600 max-w-md">
            A report will display for this date range when you click &apos;Generate&apos;.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;