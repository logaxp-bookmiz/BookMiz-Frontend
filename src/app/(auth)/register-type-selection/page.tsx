"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  User,
  Building2,
  Home,
  Star,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";

const RegisterTypeSelectionPage: React.FC = () => {
  const router = useRouter();

  const handleUserTypeSelection = (
    userType: "customer" | "service-provider"
  ) => {
    // Store the selected user type in sessionStorage for later use
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedUserType", userType);
    }

    // Route to registration page
    router.push("/register");
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
      features: [
        { icon: Calendar, text: "Easy booking system" },
        { icon: Star, text: "Rate and review services" },
        { icon: Users, text: "Connect with local businesses" },
      ],
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
      features: [
        { icon: TrendingUp, text: "Grow your business" },
        { icon: Calendar, text: "Manage bookings easily" },
        { icon: Users, text: "Build customer relationships" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6"></div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-500 mb-3 sm:mb-4 px-4">
            Get Started with BookMiz
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Join thousands of users who are already using BookMiz to connect and
            grow. Choose your account type to get started.
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
                {/* Popular Badge for Service Provider */}
                {userType.id === "service-provider" && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

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

                  {/* Features */}
                  <div className="mb-3 sm:mb-4 space-y-1 sm:space-y-1.5">
                    {userType.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center gap-1.5 text-xs text-gray-600"
                        >
                          <FeatureIcon className="w-3 h-3" />
                          <span>{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full px-4 py-2.5 sm:px-6 sm:py-3 ${userType.color} text-white rounded-xl font-bold ${userType.hoverColor} transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base`}
                  >
                    Create {userType.title} Account
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
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login-type-selection")}
              className="text-primary-500 hover:text-primary-600 font-bold underline hover:no-underline transition-all duration-300"
            >
              Sign in instead
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

export default RegisterTypeSelectionPage;
