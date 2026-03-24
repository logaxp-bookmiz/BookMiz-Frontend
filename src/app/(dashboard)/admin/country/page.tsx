'use client'

import React, { FC } from "react";
import Image from 'next/image';

import {
  FaTrashAlt,
} from 'react-icons/fa';

// Interface for Country data
interface Country {
  code: string;
  name: string;
  currency: string;
  states: number;
}

const Countries: FC = () => {
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

          {/* Countries Section */}
          <section className="border rounded-lg">
            <div className="flex justify-between p-5">
              <div className="flex items-center space-x-2 border border-gray-300 p-2 rounded-md bg-[#f9fafb]">
                <i className="fas fa-search text-gray-500"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-80 focus:outline-none bg-[#f9fafb]"
                />
              </div>

              <div className="flex space-x-4 items-center">
                <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md flex items-center space-x-2">
                  <span className="border border-gray-400 rounded-full w-6 h-6 flex items-center justify-center">+</span>
                  <span>Import Country</span>
                </button>
                <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md flex items-center space-x-2">
                  <span className="border border-gray-400 rounded-full w-6 h-6 flex items-center justify-center">+</span>
                  <span>New Country</span>
                </button>
              </div>
            </div>

            <table className="min-w-full bg-white border-b border-gray-300 rounded-t">
              <thead className="bg-[#f6f6f6] border-b border-gray-300">
                <tr className="text-left">
                  <th className="p-3 text-base font-normal flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Code
                  </th>
                  <th className="p-3 text-base font-normal">Name</th>
                  <th className="p-3 text-base font-normal">Currency</th>
                  <th className="p-3 text-base font-normal">States</th>
                  <th className="p-3 text-base font-normal">Details</th>
                  <th className="p-3 text-base font-normal">Edit</th>
                  <th className="p-3 text-base font-normal">Delete</th>
                </tr>
              </thead>

              <tbody>
                {countryData.map((country, index) => (
                  <tr key={`${country.code}-${index}`} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="p-3 flex items-center">
                      <input type="checkbox" className="mr-2" />
                      {country.code}
                    </td>
                    <td className="p-3">{country.name}</td>
                    <td className="p-3">{country.currency}</td>
                    <td className="p-3">{country.states}</td>
                    <td className="p-3">
                      <button className="flex items-center bg-[#e6e8eb] text-black-600 px-4 py-1 text-sm rounded-full">
                        View
                      </button>
                    </td>
                    <td className="p-3">
                      <button className="flex items-center bg-[#fcfbdc] text-b-600 px-4 py-1 text-sm rounded-full">
                        Edit <FaTrashAlt className="ml-2" />
                      </button>
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
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-600 rounded">
                <Image src="/arrwl.png" alt="Previous Arrow" width={16} height={16} className="mr-2" />
                <span className="text-[#204c79]">Previous</span>
              </button>

              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-300 text-[#204c79]">1</button>
                <button className="w-10 h-10 flex items-center justify-center text-gray-600">2</button>
                <button className="w-10 h-10 flex items-center justify-center text-gray-600">3</button>
                <span className="pt-1">...</span>
                <button className="w-10 h-10 flex items-center justify-center text-gray-600">8</button>
                <button className="w-10 h-10 flex items-center justify-center text-gray-600">10</button>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-600 rounded">
                <span className="text-[#204c79]">Next</span>
                <Image src="/arrwr.png" alt="Next Arrow" width={16} height={16} className="ml-2" />
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

// Mock country data
const countryData: Country[] = [
  { code: 'NG', name: 'Nigeria', currency: 'Naira', states: 36 },
  { code: 'US', name: 'United States', currency: 'Dollar', states: 50 },
  { code: 'CA', name: 'Canada', currency: 'Canadian Dollar', states: 13 },
  { code: 'UK', name: 'United Kingdom', currency: 'Pound Sterling', states: 4 },
  { code: 'FR', name: 'France', currency: 'Euro', states: 18 },
  { code: 'DE', name: 'Germany', currency: 'Euro', states: 16 },
  { code: 'JP', name: 'Japan', currency: 'Yen', states: 47 },
  { code: 'AU', name: 'Australia', currency: 'Australian Dollar', states: 6 },
  { code: 'BR', name: 'Brazil', currency: 'Real', states: 26 },
  { code: 'IN', name: 'India', currency: 'Rupee', states: 28 },
];

export default Countries;