"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FiCamera, FiSave, FiUser } from "react-icons/fi";

// ─── Static Default Data ───────────────────────────────────────────────────

const DEFAULT_PROFILE = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  phone: "+234 812 345 6789",
  address: "14 Wuse Zone 5, Abuja, FCT",
  avatarUrl:
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
};

// ─── Input Field ───────────────────────────────────────────────────────────

const ProfileInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800 font-medium transition-all duration-200 outline-none
        ${
          disabled
            ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
            : "border-gray-200 bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
        }`}
    />
  </div>
);

// ─── UserProfilePage ────────────────────────────────────────────────────────

const UserProfilePage = () => {
  const [image, setImage] = useState(DEFAULT_PROFILE.avatarUrl);
  const [firstname, setFirstname] = useState(DEFAULT_PROFILE.firstname);
  const [lastname, setLastname] = useState(DEFAULT_PROFILE.lastname);
  const [phone, setPhone] = useState(DEFAULT_PROFILE.phone);
  const [address, setAddress] = useState(DEFAULT_PROFILE.address);
  const [saved, setSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "firstname") setFirstname(value);
    else if (name === "lastname") setLastname(value);
    else if (name === "phone") setPhone(value);
    else if (name === "address") setAddress(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImage(url);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary-50 rounded-xl">
            <FiUser className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-sm text-gray-500">Manage your personal information</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Avatar Section */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-10 flex flex-col items-center">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={image}
                  alt="Profile avatar"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary-50 transition-colors border border-gray-200"
                aria-label="Change profile photo"
              >
                <FiCamera className="w-4 h-4 text-primary-600" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">
              {firstname} {lastname}
            </h2>
            <p className="text-primary-100 text-sm">{DEFAULT_PROFILE.email}</p>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProfileInput
                label="First Name"
                name="firstname"
                value={firstname}
                onChange={handleFieldChange}
              />
              <ProfileInput
                label="Last Name"
                name="lastname"
                value={lastname}
                onChange={handleFieldChange}
              />
            </div>

            <ProfileInput
              label="Email Address"
              name="email"
              value={DEFAULT_PROFILE.email}
              type="email"
              disabled
            />

            <ProfileInput
              label="Phone Number"
              name="phone"
              value={phone}
              onChange={handleFieldChange}
              type="tel"
            />

            <ProfileInput
              label="Address"
              name="address"
              value={address}
              onChange={handleFieldChange}
            />

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSave}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all duration-300 shadow-lg
                  ${
                    saved
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-primary-500 hover:bg-primary-600 hover:shadow-xl hover:scale-[1.01]"
                  }`}
              >
                <FiSave className="w-5 h-5" />
                {saved ? "Changes Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;