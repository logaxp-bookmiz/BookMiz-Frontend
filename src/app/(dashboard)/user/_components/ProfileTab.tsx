"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProfileTabProps {
  onUpdateStatus?: (status: { loading: boolean; success: boolean; error: string | null }) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ onUpdateStatus }) => {
  // Profile state
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("");

  // Update status
  const [updateStatus, setUpdateStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handlePhotoRemove = () => {
    setProfilePhoto(null);
  };

  const handleSubmit = () => {
    const newStatus = { loading: true, success: false, error: null };
    setUpdateStatus(newStatus);
    onUpdateStatus?.(newStatus);

    // Simulate API call
    setTimeout(() => {
      console.log("Profile updated:", {
        firstName,
        lastName,
        email,
        phone,
        profilePhoto,
      });
      
      const successStatus = { loading: false, success: true, error: null };
      setUpdateStatus(successStatus);
      onUpdateStatus?.(successStatus);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">Profile</h3>
        <p className="text-gray-600 leading-relaxed">
          Update your profile information and personal details
        </p>
      </div>

      {updateStatus.loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800">Updating profile...</p>
        </div>
      )}

      {updateStatus.success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-green-800">Profile updated successfully!</p>
        </div>
      )}

      {updateStatus.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800">Error: {updateStatus.error}</p>
        </div>
      )}

      <div className="flex items-center gap-6">
        <div className="w-16 h-16 border-2 border-yellow-400 rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden">
          {profilePhoto ? (
            <Image
              src={URL.createObjectURL(profilePhoto)}
              alt="Profile"
              className="w-full h-full object-cover"
              width={64}
              height={64}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">No Photo</span>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handlePhotoRemove}
            className="text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Remove
          </button>
          <label
            htmlFor="profilePhoto"
            className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer transition-colors"
          >
            Update Photo
          </label>
        </div>
        <input
          type="file"
          id="profilePhoto"
          className="hidden"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email address"
          value={email}
          readOnly
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 cursor-not-allowed"
          disabled
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Phone Number
        </label>
        <div className="flex gap-3">
          <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium">
            +234
          </div>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={updateStatus.loading || !firstName || !lastName}
        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {updateStatus.loading ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
};

export default ProfileTab;