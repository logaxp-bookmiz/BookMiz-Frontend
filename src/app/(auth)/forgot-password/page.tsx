import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your forgot password logic here
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-500 via-secondary-600 to-secondary-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fadeUp">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={40}
              className="mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white font-montserrat mb-2">
            {isSubmitted ? "Check Your Email" : "Forgot Password?"}
          </h1>
          <p className="text-gray-300 font-dmsans">
            {isSubmitted
              ? "We've sent password reset instructions to your email"
              : "No worries, we'll send you reset instructions"}
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 animate-fadeUp"
          style={{ animationDelay: "0.1s" }}
        >
          {isSubmitted ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircleIcon className="w-12 h-12 text-green-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-secondary-500 font-montserrat">
                  Email Sent!
                </h3>
                <p className="text-gray-600 font-dmsans">
                  We've sent a password reset link to{" "}
                  <span className="font-semibold text-secondary-500">{email}</span>
                </p>
                <p className="text-sm text-gray-500 font-dmsans">
                  Please check your inbox and click the link to reset your password.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-montserrat text-lg relative overflow-hidden group"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  Back to Login
                </Link>
              </div>

              <p className="text-sm text-gray-600 font-dmsans">
                Didn't receive the email?{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Resend
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold text-secondary-500 font-dmsans"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all duration-300 font-dmsans placeholder:text-gray-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-montserrat text-lg relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>

              {/* Back to Login */}
              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary-500 transition-colors font-dmsans"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Login
              </Link>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-300 font-dmsans animate-fadeUp" style={{ animationDelay: "0.2s" }}>
          © 2024 BookMiz. All rights reserved.
        </p>
      </div>
    </div>
  );
}