"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, MapPin, DollarSign } from "lucide-react";

// Static user data
const STATIC_USER = {
  id: "user123",
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  isAuthenticated: true,
};

// Define types for your business data
interface CreateBusinessData {
  name: string;
  about: string;
  address: string;
  city: string;
  state: string;
  country: string;
  currencyCode: string;
}

const CreateBusinessPage: React.FC = () => {
  const router = useRouter();
  
  // Static user data
  const user = STATIC_USER;
  
  // Local state for form
  const [formData, setFormData] = useState<CreateBusinessData>({
    name: "",
    about: "",
    address: "",
    city: "",
    state: "",
    country: "",
    currencyCode: "NGN",
  });

  const [errors, setErrors] = useState<Partial<CreateBusinessData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof CreateBusinessData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateBusinessData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Business name is required";
    }

    if (!formData.about.trim()) {
      newErrors.about = "Business description is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.currencyCode.trim()) {
      newErrors.currencyCode = "Currency is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Business created:", {
        ...formData,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
      
      setSubmitSuccess(true);
      
      // Show success message
      alert("Business created successfully!");
      
      // Redirect after successful creation
      setTimeout(() => {
        router.push("/service-pro");
      }, 500);
    } catch (error) {
      console.error("Error creating business:", error);
      alert("Failed to create business. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currencies = [
    { code: "NGN", name: "Nigerian Naira" },
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "ZAR", name: "South African Rand" },
  ];

  const countries = [
    "Nigeria",
    "Ghana",
    "Kenya",
    "South Africa",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
  ];

  // Success state
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Business Created Successfully!
            </h2>
            <p className="text-gray-600 mb-8">
              Your business profile has been created. You can now start adding services and managing appointments.
            </p>
            <button
              onClick={() => router.push("/service-pro")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mt-13">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Create Your Business
              </h1>
              <p className="text-gray-600 mt-1">
                Set up your business profile to start offering services
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Business Information */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Business Information
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Basic details about your business
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.name
                        ? "border-red-300"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your business name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="currencyCode"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Currency *
                  </label>
                  <select
                    id="currencyCode"
                    name="currencyCode"
                    value={formData.currencyCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.currencyCode
                        ? "border-red-300"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name} ({currency.code})
                      </option>
                    ))}
                  </select>
                  {errors.currencyCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currencyCode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Business Description *
                </label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.about
                      ? "border-red-300"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Describe your business, services, and what makes you unique"
                />
                {errors.about && (
                  <p className="text-red-500 text-sm mt-1">{errors.about}</p>
                )}
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Location Information
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Where your business is located
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.address
                        ? "border-red-300"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your business address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.city
                        ? "border-red-300"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.state
                        ? "border-red-300"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your state"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.country
                        ? "border-red-300"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Business"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBusinessPage;