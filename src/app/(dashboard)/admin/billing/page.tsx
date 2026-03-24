import React from "react";
import Image from 'next/image';

import {
  FaTrashAlt,
  FaEdit,
} from 'react-icons/fa';

const Subscription2 = () => {
  return (
    <div className="w-full p-10 bg-gray-50">{/* Main Content */}
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
                  className="w-7 h-7 rounded-full border border-gray-300" 
                />
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium">Emmanuel</span>
                  <i className="fas fa-chevron-down ml-1 text-gray-600 text-xs pl-1"></i>
                </div>
              </div>
            </div>
          </header>

          <section className='border rounded-lg'>
            <div className="flex justify-between items-center bg-[#fbfbfb] pt-5 pb-3">
              <h2 className="text-xl font-bold pl-16">Subscription Plan</h2>
            </div>

            <table className="min-w-full bg-white border-b border-gray-300 rounded-t">
              <thead>
                {/* First header row with main categories */}
                <tr>
                  <th className="p-3 text-base font-normal bg-[#89E101] text-white">Plans</th>
                  <th className="p-3 text-base font-normal bg-[#e6e6e6]">Prices</th>
                  <th className="p-3 text-base font-normal bg-[#596579]" colSpan={3}></th>
                </tr>
                {/* Second header row with detailed headings */}
                <tr className="text-left bg-[#f6f6f6] border-b border-gray-300">
                  <th className="p-3 text-base font-normal flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Name
                  </th>
                  <th className="p-3 text-base font-normal">Description</th>
                  <th className="p-3 text-base font-normal">Free period</th>
                  <th className="p-3 text-base font-normal">Edit</th>
                  <th className="p-3 text-base font-normal">Delete</th>
                </tr>
              </thead>

              <tbody>
                {/* Table rows with data */}
                {subscriptionData.map((plan, index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="p-3 flex items-center">
                      <input type="checkbox" className="mr-2" />
                      {plan.name}
                    </td>
                    <td className="p-3">{plan.description}</td>
                    <td className="p-3">{plan.freePeriod}</td>
                    <td className="p-3">
                      <button className="bg-yellow-100 text-yellow-700 py-1 px-2 rounded inline-flex items-center">
                        Edit <FaEdit className="ml-1" />
                      </button>
                    </td>
                    <td className="p-3">
                      <button className="bg-red-100 text-red-700 py-1 px-2 rounded inline-flex items-center">
                        Delete <FaTrashAlt className="ml-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </section>
    </div>
  );
};

// Mock subscription data
const subscriptionData = [
  { name: 'Starter Plan', description: 'Basic features for individuals', freePeriod: '7 days' },
  { name: 'Standard Plan', description: 'Enhanced features for small teams', freePeriod: '14 days' },
  { name: 'Premium Plan', description: 'Advanced features for growing businesses', freePeriod: '30 days' },
  { name: 'Enterprise Plan', description: 'Full-featured solution for large organizations', freePeriod: '30 days' },
  { name: 'Student Plan', description: 'Discounted plan for students and educators', freePeriod: '60 days' },
  { name: 'Non-Profit Plan', description: 'Special pricing for non-profit organizations', freePeriod: '30 days' },
];

export default Subscription2;