'use client';

import React, { useState } from 'react';
import {
  FaChevronDown,
  FaEnvelope,
  FaBell,
  FaSearch,
  FaTrashAlt,
} from 'react-icons/fa';

// Status Badge Component
const StatusBadge = ({ status, onClick }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-600 px-4 py-1 text-sm rounded-full';
      case 'inactive':
        return 'bg-red-100 text-red-600 px-4 py-1 text-sm rounded-full';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 px-4 py-1 text-sm rounded-full';
      default:
        return 'bg-gray-100 text-gray-600 px-4 py-1 text-sm rounded-full';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center ${getStatusStyles()}`}
    >
      {status}
      {/* Pencil icon placeholder - using chevron for now */}
      <FaChevronDown className="ml-2" size={12} />
    </button>
  );
};

const CompanyDashboard = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Mock data with more realistic information
  const companiesData = [
    { id: 1, name: 'TechCorp Solutions', country: 'United States', status: 'Active', subscription: 'Premium', email: 'admin@techcorp.com' },
    { id: 2, name: 'Green Energy Ltd', country: 'Canada', status: 'Active', subscription: 'Standard', email: 'contact@greenenergy.ca' },
    { id: 3, name: 'Digital Innovations', country: 'United Kingdom', status: 'Pending', subscription: 'Basic', email: 'hello@digitalinnovations.uk' },
    { id: 4, name: 'Global Manufacturing', country: 'Germany', status: 'Active', subscription: 'Premium', email: 'info@globalmanuf.de' },
    { id: 5, name: 'Startup Hub', country: 'Australia', status: 'Inactive', subscription: 'Basic', email: 'team@startuphub.au' },
    { id: 6, name: 'Creative Agency', country: 'France', status: 'Active', subscription: 'Standard', email: 'bonjour@creativeagency.fr' },
    { id: 7, name: 'Finance Solutions', country: 'Japan', status: 'Active', subscription: 'Premium', email: 'contact@financesol.jp' },
    { id: 8, name: 'Health Tech', country: 'Sweden', status: 'Active', subscription: 'Standard', email: 'info@healthtech.se' },
    { id: 9, name: 'Retail Solutions', country: 'Brazil', status: 'Pending', subscription: 'Basic', email: 'info@retailsol.br' },
    { id: 10, name: 'Manufacturing Co', country: 'India', status: 'Active', subscription: 'Premium', email: 'contact@manufacturing.in' },
    
  ];

  // Filter data based on search query
  const filteredCompanies = companiesData.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(currentCompanies.map(company => company.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  return (
    <div className="h-screen">
      {/* Page Wrapper for max width */}
      <div className="w-full mx-auto h-full">
        {/* Main Content */}
        <main className="w-full p-10 bg-gray-50">
          <header className="flex justify-end mb-6">
            <div className="flex items-center space-x-4">
              {/* Notifications and User Profile */}
              <div className="relative">
                <button className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300">
                  <FaEnvelope className="text-gray-600" />
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
              </div>
              <div className="relative">
                <button className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300">
                  <FaBell className="text-gray-600" />
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
              </div>
              <div className="flex items-center space-x-2 rounded-md border border-gray-300 px-1 py-1">
                <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center border border-gray-300">
                  <span className="text-gray-600 font-medium text-sm">E</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium">Emmanuel</span>
                  <FaChevronDown className="ml-1 text-gray-600 text-xs pl-1" />
                </div>
              </div>
            </div>
          </header>

          {/* Company Search Box */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-md"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <section className="border rounded-lg">
            <div className="flex justify-between items-center bg-[#fbfbfb] pt-5 pb-3">
              <h2 className="text-xl font-bold pl-16">Companies</h2>
            </div>

            <table className="min-w-full bg-white border-b border-gray-300 rounded-t">
              <thead className="bg-[#f6f6f6] border-b border-gray-300">
                <tr className="text-left">
                  <th className="p-3 text-base font-normal">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={selectedRows.length === currentCompanies.length && currentCompanies.length > 0}
                    />
                    Company Name
                  </th>
                  <th className="p-3 text-base font-normal">Country</th>
                  <th className="p-3 text-base font-normal">Email</th>
                  <th className="p-3 text-base font-normal">Subscription</th>
                  <th className="p-3 text-base font-normal">Status</th>
                  <th className="p-3 text-base font-normal">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentCompanies.map((company, index) => (
                  <tr key={`${company.email}-${index}`} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="p-3">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={selectedRows.includes(company.id)}
                        onChange={(e) => handleSelectRow(company.id, e.target.checked)}
                      />
                      {company.name}
                    </td>
                    <td className="p-3">{company.country}</td>
                    <td className="p-3">{company.email}</td>
                    <td className="p-3">{company.subscription}</td>
                    <td className="p-3">
                      <StatusBadge 
                        status={company.status} 
                        onClick={() => console.log('Status clicked')}
                      />
                    </td>
                    <td className="p-3">
                      <button className="flex items-center bg-red-100 text-red-600 px-4 py-1 text-sm rounded-full">
                        Delete <FaTrashAlt className="ml-2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-2 px-4 py-5">
              <button 
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-600 rounded"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <span className="text-[#204c79]">Previous</span>
              </button>

              <div className="flex items-center space-x-3">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${
                        currentPage === pageNumber
                          ? 'bg-gray-300 text-[#204c79]'
                          : 'text-gray-600'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="pt-1">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button 
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-600 rounded"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <span className="text-[#204c79]">Next</span>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboard;