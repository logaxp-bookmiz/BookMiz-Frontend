"use client";

import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Check,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userType = sessionStorage.getItem("selectedUserType");
      setSelectedUserType(userType);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);

    const errors: string[] = [];

    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.password.trim()) errors.push("Password is required");
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.push("Invalid email address");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Navigate based on user type
    if (selectedUserType === "service-provider") {
      router.push("/service-pro");
    } else {
      router.push("/user"); // default for customer
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const benefits = [
    "Access your dashboard anytime",
    "Manage your appointments",
    "View booking history",
    "Update your profile settings",
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side - Benefits - Hidden on Mobile */}
      <div className="hidden lg:block lg:w-1/2 relative p-8 lg:p-12 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1200&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/90 to-secondary-500/95" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg tracking-tight">
              Welcome Back
            </h1>
            <p className="text-white/90 text-xl font-light leading-relaxed">
              Sign in to access your BookMiz account and continue your journey
            </p>
          </div>

          <div className="space-y-4 mb-8 w-full">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-5 h-5 text-white font-bold" />
                </div>
                <span className="text-white text-lg font-medium group-hover:text-primary-500 transition-colors duration-300">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl w-full">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-500/20 rounded-full">
                <Shield className="w-8 h-8 text-primary-500" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white mb-1">
                  Secure Access
                </h3>
                <p className="text-primary-500 text-base font-medium">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 px-6 py-4 sm:p-6 lg:p-12 bg-gray-50 flex items-center justify-center min-h-screen lg:min-h-0">
        <div className="w-full max-w-md">

          {/* Back Button */}
          <div className="mb-4 sm:mb-6">
            <button
              onClick={() => router.push("/login-type-selection")}
              className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Selection</span>
            </button>
          </div>

          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">
              Sign In
            </h2>
            {selectedUserType && (
              <div className="mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {selectedUserType === "customer"
                    ? "Customer"
                    : "Service Provider"}
                </span>
              </div>
            )}
            <p className="text-gray-600 text-base sm:text-lg font-light">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm shadow-sm">
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-gray-300 text-xs sm:text-sm bg-white shadow-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-gray-300 text-xs sm:text-sm bg-white shadow-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                  ) : (
                    <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 space-y-2 sm:space-y-0">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 sm:h-5 w-4 sm:w-5 text-primary-500 focus:ring-primary-500 border-gray-300 rounded-md"
                />
                <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 font-medium">
                  Remember me
                </span>
              </label>
              
              <Link
                href="/auth/forgot-password"
                className="text-xs sm:text-sm text-primary-500 hover:text-primary-600 transition-colors duration-300 font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:bg-primary-600 focus:ring-2 focus:ring-primary-200 transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl hover:scale-105 transform mt-6 sm:mt-8"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4 sm:pt-6">
              <p className="text-xs sm:text-sm text-gray-600">
                Don't have an account?{" "}
                
                <Link
                  href="/auth/register"
                  className="text-primary-500 hover:text-primary-600 font-semibold transition-colors duration-300"
                >
                  Create Account
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;