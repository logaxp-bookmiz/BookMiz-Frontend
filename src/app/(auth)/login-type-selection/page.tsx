"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, User, Building2, Home } from "lucide-react";

const LoginTypeSelectionPage: React.FC = () => {
  const router = useRouter();

  const handleUserTypeSelection = (
    userType: "customer" | "service-provider"
  ) => {
    // Store the selected user type in sessionStorage for later use
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedUserType", userType);
    }

    // Route to login page
    router.push("/login");
  };

  const userTypes = [
    {
      id: "customer",
      title: "Customer",
      subtitle: "Book services and manage appointments",
      description:
        "Find and book services from local businesses, manage your appointments, and track your booking history.",
      icon: User,
      color: "bg-primary-500",
      hoverColor: "hover:bg-primary-600",
      bgColor: "bg-primary-50",
      borderColor: "border-primary-200",
      textColor: "text-primary-600",
      iconBg: "bg-primary-100",
    },
    {
      id: "service-provider",
      title: "Service Provider",
      subtitle: "Manage your business and services",
      description:
        "Create and manage your business profile, offer services, handle bookings, and grow your customer base.",
      icon: Building2,
      color: "bg-secondary-500",
      hoverColor: "hover:bg-secondary-600",
      bgColor: "bg-secondary-50",
      borderColor: "border-secondary-200",
      textColor: "text-secondary-600",
      iconBg: "bg-secondary-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6"></div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-500 mb-3 sm:mb-4 px-4">
            Welcome to BookMiz
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Choose how you'd like to use our platform. You can always change
            this later in your account settings.
          </p>
        </div>

        {/* User Type Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {userTypes.map((userType) => {
            const IconComponent = userType.icon;
            return (
              <div
                key={userType.id}
                className={`${userType.bgColor} ${userType.borderColor} border-2 rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 group relative overflow-hidden backdrop-blur-sm`}
                onClick={() =>
                  handleUserTypeSelection(
                    userType.id as "customer" | "service-provider"
                  )
                }
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className={`${userType.iconBg} p-2.5 sm:p-3 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${userType.textColor}`}
                    />
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                    {userType.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base font-semibold ${userType.textColor} mb-2 sm:mb-3`}
                  >
                    {userType.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                    {userType.description}
                  </p>

                  {/* Action Button */}
                  <button
                    className={`w-full px-4 py-2.5 sm:px-6 sm:py-3 ${userType.color} text-white rounded-xl font-bold ${userType.hoverColor} transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base`}
                  >
                    Continue as {userType.title}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center px-4 space-y-3">
          <p className="text-gray-600 text-sm sm:text-base">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/auth/register-type-selection")}
              className="text-primary-500 hover:text-primary-600 font-bold underline hover:no-underline transition-all duration-300"
            >
              Create account
            </button>
          </p>
          <div>
            <button
              onClick={() => router.push("/")}
              className="text-gray-500 hover:text-gray-700 font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTypeSelectionPage;
