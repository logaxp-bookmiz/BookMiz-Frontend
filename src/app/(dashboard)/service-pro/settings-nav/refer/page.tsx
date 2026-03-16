 
"use client";

import React from "react";

const ReferFriend: React.FC = () => {
  const referralLink = "https://yourapp.com/referral?code=ABC123";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  const sendEmail = () => {
    window.location.href = `mailto:?subject=Join me on BookMiz&body=Sign up using my referral link: ${referralLink}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white mt-24">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        {/* Heading */}
        <h2 className="text-lg font-semibold text-gray-900">Refer a friend</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Refer a friend, so they can create their own account
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={copyToClipboard}
            className="bg-[#041E42] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#062a5e] transition"
          >
            Copy link
          </button>

          <button
            onClick={sendEmail}
            className="bg-[#f5f6fb] text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-[#e6e8f2] transition"
          >
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferFriend;
