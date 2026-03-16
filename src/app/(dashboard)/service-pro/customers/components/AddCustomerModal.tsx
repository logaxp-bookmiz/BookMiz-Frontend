"use client";

import React, { useState } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customerData: CustomerData) => void;
}

interface CustomerData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  state: string;
  address: string;
  city: string;
  zipcode: string;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CustomerData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    state: "",
    address: "",
    city: "",
    zipcode: "",
  });

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  // Sample data for dropdowns
  const countries = [
    "Nigeria",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
  ];
  const states = ["Lagos", "Abuja", "Kano", "Rivers", "Kaduna"];

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName.trim()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        state: "",
        address: "",
        city: "",
        zipcode: "",
      });
      onClose();
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      state: "",
      address: "",
      city: "",
      zipcode: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6">
          <div className="w-6"></div> {/* Spacer for balance */}
          <h2 className="text-xl font-bold text-gray-900">Add customer</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3">
          {/* Full Name */}
          <div className="flex items-center">
            <label className="w-24 text-sm font-medium text-gray-700">
              Full name*
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center">
            <label className="w-24 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <label className="w-24 text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="flex flex-1">
              <div className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-600">
                +234
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Company */}
          <div className="flex items-center">
            <label className="w-24 text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Enter company name"
            />
          </div>

          {/* Country */}
          <div className="flex items-center relative">
            <label className="w-24 text-sm font-medium text-gray-700">
              Country
            </label>
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="flex-1 flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-white"
            >
              <span
                className={formData.country ? "text-gray-900" : "text-gray-500"}
              >
                {formData.country || "Select country"}
              </span>
              <FiChevronDown size={16} className="text-gray-400" />
            </button>

            {showCountryDropdown && (
              <div className="absolute top-full left-24 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => {
                      handleInputChange("country", country);
                      setShowCountryDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* State */}
          <div className="flex items-center relative">
            <label className="w-24 text-sm font-medium text-gray-700">
              State
            </label>
            <button
              type="button"
              onClick={() => setShowStateDropdown(!showStateDropdown)}
              className="flex-1 flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-white"
            >
              <span
                className={formData.state ? "text-gray-900" : "text-gray-500"}
              >
                {formData.state || "Select state"}
              </span>
              <FiChevronDown size={16} className="text-gray-400" />
            </button>

            {showStateDropdown && (
              <div className="absolute top-full left-24 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                {states.map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => {
                      handleInputChange("state", state);
                      setShowStateDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Address */}
          <div className="flex items-center">
            <label className="w-24 text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Enter address"
            />
          </div>

          {/* City */}
          <div className="flex items-center">
            <label className="w-24 text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Enter city"
            />
          </div>

          {/* Zipcode */}
          <div className="flex items-center">
            <label className="w-24 text-sm font-medium text-gray-700">
              Zipcode
            </label>
            <input
              type="text"
              value={formData.zipcode}
              onChange={(e) => handleInputChange("zipcode", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Enter zipcode"
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-6  ">
          <button
            onClick={handleSubmit}
            disabled={!formData.fullName.trim()}
            className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
