"use client"

import React, { useState } from 'react';
import { Download, Upload, Plus, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: 'Emmanuel',
      lastName: 'Ujah',
      phone: '08169192646',
      email: 'ujahemmanuel72@gmail.com',
      jobTitle: 'Therapist',
      associateService: 'Therapy',
      employeeRate: 300
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '08123456789',
      email: 'sarah.johnson@email.com',
      jobTitle: 'Nurse',
      associateService: 'Healthcare',
      employeeRate: 450
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Chen',
      phone: '08198765432',
      email: 'michael.chen@email.com',
      jobTitle: 'Doctor',
      associateService: 'Medical',
      employeeRate: 800
    },
    {
      id: 4,
      firstName: 'Lisa',
      lastName: 'Davis',
      phone: '08147852963',
      email: 'lisa.davis@email.com',
      jobTitle: 'Receptionist',
      associateService: 'Administration',
      employeeRate: 250
    },
    {
      id: 5,
      firstName: 'James',
      lastName: 'Wilson',
      phone: '08159753864',
      email: 'james.wilson@email.com',
      jobTitle: 'Physiotherapist',
      associateService: 'Therapy',
      employeeRate: 350
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    jobTitle: '',
    associateService: '',
    employeeRate: ''
  });

  const employeesPerPage = 10;
  const totalPages = Math.ceil(employees.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;
  const currentEmployees = employees.slice(startIndex, startIndex + employeesPerPage);

  const handleAddEmployee = () => {
    if (newEmployee.firstName && newEmployee.lastName && newEmployee.email) {
      const employee = {
        ...newEmployee,
        id: employees.length + 1,
        employeeRate: parseFloat(newEmployee.employeeRate) || 0
      };
      setEmployees([...employees, employee]);
      setNewEmployee({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        jobTitle: '',
        associateService: '',
        employeeRate: ''
      });
      setShowAddModal(false);
    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">Manage Employees</h1>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {employees.length} employees
            </span>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={16} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload size={16} />
              Upload Employee
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-950 transition-colors"
            >
              <Plus size={16} />
              Add Employee
            </button>
          </div>
        </div>
        <p className="text-gray-600 mt-1">Create and manage your employees</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">First name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Last name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Phone</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Job title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Associate service</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Employee rate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">More</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{employee.firstName}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{employee.lastName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{employee.phone}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{employee.email}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{employee.jobTitle}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{employee.associateService}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">${employee.employeeRate}</td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === i + 1 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={newEmployee.firstName}
                    onChange={(e) => setNewEmployee({...newEmployee, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={newEmployee.lastName}
                    onChange={(e) => setNewEmployee({...newEmployee, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={newEmployee.jobTitle}
                  onChange={(e) => setNewEmployee({...newEmployee, jobTitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Associate Service</label>
                <input
                  type="text"
                  value={newEmployee.associateService}
                  onChange={(e) => setNewEmployee({...newEmployee, associateService: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Rate ($)</label>
                <input
                  type="number"
                  value={newEmployee.employeeRate}
                  onChange={(e) => setNewEmployee({...newEmployee, employeeRate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEmployee}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;