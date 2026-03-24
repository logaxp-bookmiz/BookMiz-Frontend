'use client'

import React, { FC } from "react";
import Image from 'next/image';

import {
  FaTrashAlt,
} from 'react-icons/fa';

// Interface for Admin data
interface Admin {
  firstname: string;
  lastname: string;
  email: string;
}

const Admins: FC = () => {
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
                  <i className="fas fa-envelope text-gray-600"></i>
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
              </div>
              <div className="relative">
                <button className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300">
                  <i className="fas fa-bell text-gray-600"></i>
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
              </div>
              <div className="flex items-center space-x-2 rounded-md border border-gray-300 px-1 py-1">
                <Image 
                  src="/avatar.jpg" 
                  alt="avatar" 
                  width={28} 
                  height={28} 
                  className="rounded-full border border-gray-300" 
                />
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium">Emmanuel</span>
                  <i className="fas fa-chevron-down ml-1 text-gray-600 text-xs pl-1"></i>
                </div>
              </div>
            </div>
          </header>

          <section className="border rounded-lg">
            <div className="flex justify-between items-center bg-[#fbfbfb] pt-5 pb-3">
              <h2 className="text-xl font-bold pl-16">Admins</h2>
              <button className="mr-5 bg-gray-100 py-1 px-4 rounded-full border border-gray-300 text-sm hover:bg-gray-200 transition-colors">
                + New Admin
              </button>
            </div>

            <table className="min-w-full bg-white border-b border-gray-300 rounded-t">
              <thead className="bg-[#f6f6f6] border-b border-gray-300">
                <tr className="text-left">
                  <th className="pl-3 pr-1 text-base font-normal">
                    <input type="checkbox" />
                  </th>
                  <th className="p-3 text-base font-normal">First Name</th>
                  <th className="p-3 text-base font-normal">Last Name</th>
                  <th className="p-3 text-base font-normal">Email</th>
                  <th className="p-3 text-base font-normal">Actions</th>
                </tr>
              </thead>

              <tbody>
                {adminData.map((admin, index) => (
                  <tr key={`${admin.email}-${index}`} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="pl-3 pr-1">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3">{admin.firstname}</td>
                    <td className="p-3">{admin.lastname}</td>
                    <td className="p-3">{admin.email}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button className="bg-gray-100 px-4 py-1 text-sm rounded-full flex items-center space-x-2 text-[#011c39] font-medium hover:bg-gray-200 transition-colors">
                          <span>Suspend</span> 
                          <FaTrashAlt className="text-xs" />
                        </button>
                        <button className="bg-red-100 text-red-600 px-4 py-1 text-sm rounded-full flex items-center space-x-2 font-medium hover:bg-red-200 transition-colors">
                          <span>Delete</span>
                          <FaTrashAlt className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

// Mock admin data
const adminData: Admin[] = [
  { firstname: 'Emmanuel', lastname: 'Ujah', email: 'ujahemmanuel72@gmail.com' },
  { firstname: 'Sarah', lastname: 'Johnson', email: 'sarah.johnson@admin.com' },
  { firstname: 'Michael', lastname: 'Chen', email: 'michael.chen@admin.com' },
  { firstname: 'Lisa', lastname: 'Rodriguez', email: 'lisa.rodriguez@admin.com' },
  { firstname: 'David', lastname: 'Thompson', email: 'david.thompson@admin.com' },
  { firstname: 'Emily', lastname: 'Wilson', email: 'emily.wilson@admin.com' },
  { firstname: 'James', lastname: 'Anderson', email: 'james.anderson@admin.com' },
  { firstname: 'Maria', lastname: 'Garcia', email: 'maria.garcia@admin.com' },
  { firstname: 'Robert', lastname: 'Taylor', email: 'robert.taylor@admin.com' },
  { firstname: 'Jennifer', lastname: 'Brown', email: 'jennifer.brown@admin.com' },
];

export default Admins;