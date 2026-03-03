"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Check,
  Shield,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CountrySelector from "@/components/ui/CountrySelector";
import { Country, defaultCountry } from "@/utils/countries";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<Error | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Get selected user type from sessionStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const userType = sessionStorage.getItem("selectedUserType");
      setSelectedUserType(userType);
    }
  }, []);

  // Redirect authenticated users to dashboard (standard practice)
  React.useEffect(() => {
    if (isAuthenticated && user) {
      router.replace("/profile/dashboard");
    }
  }, [isAuthenticated, user, router]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  // Add password validation states
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "medium" | "strong" | null
  >(null);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  // Stepper for service providers
  const isServiceProvider = selectedUserType === "service-provider";
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const isStep2 = isServiceProvider && currentStep === 2;
  const [businessData, setBusinessData] = useState({
    name: "",
    about: "",
    address: "",
    city: "",
    state: "",
    country: "",
    currencyCode: "",
  });

  React.useEffect(() => {
    if (typeof window !== "undefined" && isServiceProvider) {
      const draft = sessionStorage.getItem("registrationBusinessDraft");
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setBusinessData((prev) => ({ ...prev, ...parsed }));
        } catch (_) {}
      }
    }
  }, [isServiceProvider]);

  const handleBusinessChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBusinessData((prev) => {
      const next = { ...prev, [name]: value };
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "registrationBusinessDraft",
          JSON.stringify(next)
        );
      }
      return next;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For phone number, normalize by removing leading zeros for storage
    let normalizedValue = value;
    if (name === "phoneNumber" && value.startsWith("0")) {
      normalizedValue = value.substring(1);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: normalizedValue,
    }));

    // Check password strength when password changes
    if (name === "password") {
      const strength = checkPasswordStrength(normalizedValue);
      setPasswordStrength(strength);
    }

    // Check if passwords match when either password field changes
    if (name === "password" || name === "confirmPassword") {
      const currentPassword =
        name === "password" ? normalizedValue : formData.password;
      const currentConfirmPassword =
        name === "confirmPassword" ? normalizedValue : formData.confirmPassword;

      if (currentPassword && currentConfirmPassword) {
        setPasswordsMatch(currentPassword === currentConfirmPassword);
      } else {
        setPasswordsMatch(null);
      }
    }
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const getFullPhoneNumber = () => {
    // Ensure we don't show leading zeros in the preview
    const normalizedPhone = formData.phoneNumber.startsWith("0")
      ? formData.phoneNumber.substring(1)
      : formData.phoneNumber;
    return selectedCountry.dialCode + normalizedPhone;
  };

  const checkPasswordStrength = (
    password: string
  ): "weak" | "medium" | "strong" | null => {
    if (!password) return null;
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      alert("Please fill in both password fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (passwordStrength === "weak") {
      alert("Password is too weak. Please choose a stronger password.");
      return;
    }

    if (isServiceProvider && currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    if (isServiceProvider && currentStep === 2) {
      if (!businessData.name) {
        alert("Please enter your business name");
        return;
      }
    }

    try {
      setIsRegistering(true);
      setRegisterError(null);
      
      const { confirmPassword, phoneNumber, ...dataForBackend } = formData;
      // Add the full phone number with country code
      let payload: any = {
        ...dataForBackend,
        phoneNumber: getFullPhoneNumber(),
      };

      // If service provider, include business payload
      if (isServiceProvider) {
        const business = {
          name: businessData.name || "",
          about: businessData.about || "",
          address: businessData.address || "",
          city: businessData.city || "",
          state: businessData.state || "",
          country: businessData.country || "",
          currencyCode: businessData.currencyCode || "",
        };
        if (business.name) {
          payload = { ...payload, business: [business] };
        }
      }

      // Simulate successful registration
      console.log("Registration payload:", payload);
      
      // Mock successful registration
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser({ email: formData.email, firstname: formData.firstname });
        router.push("/auth/login");
      }, 1000);
      
    } catch (error) {
      setRegisterError(error as Error);
      setIsRegistering(false);
    }
  };

  const benefits = [
    "Book appointments 24/7",
    "Instant confirmation",
    "Manage your bookings",
    "Exclusive member discounts",
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side - Benefits - Hidden on Mobile */}
      {!isStep2 && (
        <div className="hidden lg:block lg:w-1/2 relative p-6 lg:p-8 text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1200&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/90 to-secondary-500/95" />

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-md mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-white drop-shadow-lg tracking-tight">
                Join BookMiz
              </h1>
              <p className="text-white/90 text-lg font-light leading-relaxed">
                Your gateway to premium services and seamless booking
                experiences
              </p>
            </div>

            <div className="space-y-3 mb-6 w-full">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-5 h-5 text-white font-bold" />
                  </div>
                  <span className="text-white text-base font-medium group-hover:text-primary-500 transition-colors duration-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl w-full">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-500/20 rounded-full">
                  <Shield className="w-8 h-8 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">
                    Start Booking Today
                  </h3>
                  <p className="text-primary-500 text-sm font-medium">
                    Over 1000+ services available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Side - Sign Up Form */}
      <div
        className={`w-full ${
          isStep2 ? "lg:w-full" : "lg:w-1/2"
        } px-6 py-4 sm:p-6 lg:p-12 bg-gray-50 flex items-center justify-center min-h-screen lg:min-h-0`}
      >
        <div className={`w-full ${isStep2 ? "max-w-3xl" : "max-w-2xl"}`}>
          {/* Back Button and User Type Display */}
          <div className="mb-4 sm:mb-6">
            <button
              onClick={() => router.push("/auth/login-type-selection")}
              className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Selection</span>
            </button>
          </div>

          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">
              Create Account
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
              Fill in your details to get started with BookMiz
            </p>
            {isServiceProvider && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <div
                  className={`h-1.5 w-20 rounded-full ${
                    currentStep === 1 ? "bg-primary-500" : "bg-primary-200"
                  }`}
                ></div>
                <div
                  className={`h-1.5 w-20 rounded-full ${
                    currentStep === 2 ? "bg-primary-500" : "bg-primary-200"
                  }`}
                ></div>
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Error Display */}
            {registerError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm shadow-sm">
                {registerError.message}
              </div>
            )}

            {/* Step 1: Personal Info */}
            {(!isServiceProvider || currentStep === 1) && (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-gray-300 text-xs sm:text-sm bg-white shadow-sm"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-gray-300 text-xs sm:text-sm bg-white shadow-sm"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-gray-300 text-xs sm:text-sm bg-white shadow-sm"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3"
                    >
                      Phone
                    </label>
                    <div className="flex space-x-2 sm:space-x-3">
                      <div className="w-24 sm:w-32">
                        <CountrySelector
                          selectedCountry={selectedCountry}
                          onCountryChange={handleCountryChange}
                        />
                      </div>
                      <div className="flex-1 relative">
                        <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-gray-300 text-xs sm:text-sm bg-white shadow-sm"
                          placeholder="8094848473"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-1 sm:mt-2 text-xs text-gray-500">
                      Full number: {getFullPhoneNumber()}
                    </div>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-gray-300 text-xs sm:text-sm bg-white shadow-sm"
                        placeholder="••••••••"
                        required
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
                    {/* Compact Password Strength */}
                    {formData.password && (
                      <div className="mt-1 flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Strength:</span>
                        <div className="flex space-x-1">
                          <div
                            className={`h-1.5 w-6 rounded-full ${
                              passwordStrength === "weak"
                                ? "bg-red-400"
                                : passwordStrength === "medium"
                                ? "bg-yellow-400"
                                : passwordStrength === "strong"
                                ? "bg-green-400"
                                : "bg-gray-200"
                            }`}
                          ></div>
                          <div
                            className={`h-1.5 w-6 rounded-full ${
                              passwordStrength === "medium"
                                ? "bg-yellow-400"
                                : passwordStrength === "strong"
                                ? "bg-green-400"
                                : "bg-gray-200"
                            }`}
                          ></div>
                          <div
                            className={`h-1.5 w-6 rounded-full ${
                              passwordStrength === "strong"
                                ? "bg-green-400"
                                : "bg-gray-200"
                            }`}
                          ></div>
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            passwordStrength === "weak"
                              ? "text-red-600"
                              : passwordStrength === "medium"
                              ? "text-yellow-600"
                              : passwordStrength === "strong"
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {passwordStrength}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3"
                    >
                      Confirm
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-gray-300 text-xs sm:text-sm bg-white shadow-sm"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                        ) : (
                          <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                        )}
                      </button>
                    </div>
                    {/* Compact Password Match */}
                    {formData.confirmPassword && (
                      <div className="mt-2">
                        {passwordsMatch === true ? (
                          <div className="flex items-center space-x-2 text-green-600">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs font-medium">Match</span>
                          </div>
                        ) : passwordsMatch === false ? (
                          <div className="flex items-center space-x-2 text-red-600">
                            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                ×
                              </span>
                            </div>
                            <span className="text-xs font-medium">
                              No match
                            </span>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Business Details (service providers) */}
            {isServiceProvider && currentStep === 2 && (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      Business Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={businessData.name}
                      onChange={handleBusinessChange}
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white shadow-sm text-xs sm:text-sm"
                      placeholder="e.g. Prime Cuts Barbers"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      About
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      value={businessData.about}
                      onChange={handleBusinessChange}
                      rows={4}
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white shadow-sm text-xs sm:text-sm"
                      placeholder="Brief description of your business"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-semibold text-gray-800 mb-2"
                      >
                        Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        value={businessData.address}
                        onChange={handleBusinessChange}
                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white shadow-sm text-xs sm:text-sm"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-800 mb-2"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        value={businessData.city}
                        onChange={handleBusinessChange}
                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white shadow-sm text-xs sm:text-sm"
                        placeholder="Lagos"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-semibold text-gray-800 mb-2"
                      >
                        State
                      </label>
                      <input
                        id="state"
                        name="state"
                        value={businessData.state}
                        onChange={handleBusinessChange}
                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white shadow-sm text-xs sm:text-sm"
                        placeholder="Lagos"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-semibold text-gray-800 mb-2"
                      >
                        Country
                      </label>
                      <input
                        id="country"
                        name="country"
                        value={businessData.country}
                        onChange={handleBusinessChange}
                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white shadow-sm text-xs sm:text-sm"
                        placeholder="Nigeria"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="currencyCode"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      Currency Code
                    </label>
                    <input
                      id="currencyCode"
                      name="currencyCode"
                      value={businessData.currencyCode}
                      onChange={handleBusinessChange}
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white shadow-sm text-xs sm:text-sm"
                      placeholder="NGN, USD..."
                    />
                  </div>
                </div>
              </>
            )}

            {/* Terms and Submit */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 w-4 sm:w-5 h-4 sm:h-5 text-primary-500 border-gray-300 rounded-md focus:ring-primary-500"
                />
                <label
                  htmlFor="terms"
                  className="text-xs sm:text-sm text-gray-700 leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-primary-500 hover:text-primary-600 underline font-semibold transition-colors duration-300"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-primary-500 hover:text-primary-600 underline font-semibold transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="flex gap-3 mt-6 sm:mt-8">
                {isServiceProvider && currentStep === 2 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-1/2 bg-white text-gray-700 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={
                    isRegistering ||
                    !agreeToTerms ||
                    !formData.password ||
                    !formData.confirmPassword ||
                    passwordsMatch === false ||
                    passwordStrength === "weak"
                  }
                  className="flex-1 bg-primary-500 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:bg-primary-600 focus:ring-2 focus:ring-primary-200 transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  {isRegistering ? (
                    <div className="w-5 sm:w-6 h-5 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>
                        {isServiceProvider && currentStep === 1
                          ? "Continue"
                          : "Create Account"}
                      </span>
                      <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2 sm:pt-3">
                <p className="text-xs sm:text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/auth/login"
                    className="text-primary-500 hover:text-primary-600 font-semibold transition-colors duration-300"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
