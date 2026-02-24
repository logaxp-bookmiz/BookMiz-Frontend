"use client";

import React, { useState } from "react";

interface CityTabProps {
  onUpdateStatus?: (status: { loading: boolean; success: boolean; error: string | null }) => void;
}

// Static location data
const STATIC_COUNTRIES = [
  { id: "1", name: "Nigeria" },
  { id: "2", name: "Ghana" },
  { id: "3", name: "Kenya" },
  { id: "4", name: "South Africa" },
];

const STATIC_STATES: Record<string, { id: string; name: string }[]> = {
  "1": [
    { id: "1-1", name: "Lagos" },
    { id: "1-2", name: "Abuja" },
    { id: "1-3", name: "Rivers" },
    { id: "1-4", name: "Kano" },
  ],
  "2": [
    { id: "2-1", name: "Greater Accra" },
    { id: "2-2", name: "Ashanti" },
    { id: "2-3", name: "Western" },
  ],
  "3": [
    { id: "3-1", name: "Nairobi" },
    { id: "3-2", name: "Mombasa" },
    { id: "3-3", name: "Kisumu" },
  ],
  "4": [
    { id: "4-1", name: "Gauteng" },
    { id: "4-2", name: "Western Cape" },
    { id: "4-3", name: "KwaZulu-Natal" },
  ],
};

const STATIC_CITIES: Record<string, { id: string; name: string }[]> = {
  "1-1": [
    { id: "1-1-1", name: "Ikeja" },
    { id: "1-1-2", name: "Victoria Island" },
    { id: "1-1-3", name: "Lekki" },
  ],
  "1-2": [
    { id: "1-2-1", name: "Wuse" },
    { id: "1-2-2", name: "Maitama" },
    { id: "1-2-3", name: "Garki" },
  ],
  "1-3": [
    { id: "1-3-1", name: "Port Harcourt" },
    { id: "1-3-2", name: "Obio-Akpor" },
  ],
  "1-4": [
    { id: "1-4-1", name: "Kano Municipal" },
    { id: "1-4-2", name: "Nassarawa" },
  ],
  "2-1": [
    { id: "2-1-1", name: "Accra Central" },
    { id: "2-1-2", name: "Osu" },
  ],
  "2-2": [
    { id: "2-2-1", name: "Kumasi" },
    { id: "2-2-2", name: "Oforikrom" },
  ],
  "2-3": [
    { id: "2-3-1", name: "Sekondi-Takoradi" },
  ],
  "3-1": [
    { id: "3-1-1", name: "Nairobi Central" },
    { id: "3-1-2", name: "Westlands" },
  ],
  "3-2": [
    { id: "3-2-1", name: "Mombasa Island" },
  ],
  "3-3": [
    { id: "3-3-1", name: "Kisumu Central" },
  ],
  "4-1": [
    { id: "4-1-1", name: "Johannesburg" },
    { id: "4-1-2", name: "Pretoria" },
  ],
  "4-2": [
    { id: "4-2-1", name: "Cape Town" },
  ],
  "4-3": [
    { id: "4-3-1", name: "Durban" },
  ],
};

const CityTab: React.FC<CityTabProps> = ({ onUpdateStatus }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [updateStatus, setUpdateStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setSelectedState("");
    setSelectedCity("");
    setUpdateStatus({ loading: false, success: false, error: null });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedCity("");
    setUpdateStatus({ loading: false, success: false, error: null });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setUpdateStatus({ loading: false, success: false, error: null });
  };

  const handleSubmit = () => {
    const newStatus = { loading: true, success: false, error: null };
    setUpdateStatus(newStatus);
    onUpdateStatus?.(newStatus);

    // Simulate API call
    setTimeout(() => {
      // Find the actual names from the selected IDs
      const countryName =
        STATIC_COUNTRIES.find((c) => c.id === selectedCountry)?.name || selectedCountry;
      const stateName =
        (STATIC_STATES[selectedCountry]?.find(
          (s) => s.id === selectedState
        )?.name) || selectedState;
      const cityName =
        (STATIC_CITIES[selectedState]?.find(
          (c) => c.id === selectedCity
        )?.name) || selectedCity;

      console.log("Location updated:", {
        country: countryName,
        state: stateName,
        city: cityName,
      });

      const successStatus = { loading: false, success: true, error: null };
      setUpdateStatus(successStatus);
      onUpdateStatus?.(successStatus);
    }, 1000);
  };

  const getStates = () => {
    if (!selectedCountry) return [];
    return STATIC_STATES[selectedCountry] || [];
  };

  const getCities = () => {
    if (!selectedState) return [];
    return STATIC_CITIES[selectedState] || [];
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">My City</h3>
        <p className="text-gray-600 leading-relaxed">
          Select your location to get personalized content and services in your
          area
        </p>
      </div>

      {/* Status Messages */}
      {updateStatus.loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800">Updating location...</p>
        </div>
      )}

      {updateStatus.success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-green-800">Location updated successfully!</p>
        </div>
      )}

      {updateStatus.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800">Error: {updateStatus.error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Country Select */}
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Country
          </label>
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select a country</option>
            {STATIC_COUNTRIES.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State Select */}
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            State/Province
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">
              {!selectedCountry
                ? "Select a country first"
                : "Select a state/province"}
            </option>
            {getStates().map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* City Select */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">
              {!selectedState
                ? "Select a state first"
                : "Select a city"}
            </option>
            {getCities().map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Location Preview */}
        {selectedCountry && selectedState && selectedCity && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              Selected Location:
            </h4>
            <p className="text-blue-800">
              {getCities().find((c) => c.id === selectedCity)?.name},{" "}
              {getStates().find((s) => s.id === selectedState)?.name},{" "}
              {STATIC_COUNTRIES.find((c) => c.id === selectedCountry)?.name}
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={
          !selectedCountry ||
          !selectedState ||
          !selectedCity ||
          updateStatus.loading
        }
        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {updateStatus.loading ? "Updating..." : "Update Location"}
      </button>
    </div>
  );
};

export default CityTab;