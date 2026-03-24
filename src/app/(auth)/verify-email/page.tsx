"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, Mail, RefreshCw, ShieldCheck, Check } from "lucide-react";
import { useRouter } from "next/navigation";

const OTP_LENGTH = 6;
const RESEND_TIMEOUT = 120; 

const VerifyOtpPage: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Get email from query params
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setEmail(params.get("email") || "your email");
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    // Allow only digits
    const digit = value.replace(/\D/g, "").slice(-1);
    setError(null);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const next = [...otp];
        next[index] = "";
        setOtp(next);
      } else if (index > 0) {
        focusInput(index - 1);
        const next = [...otp];
        next[index - 1] = "";
        setOtp(next);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setOtp(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    focusInput(focusIdx);
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter all 6 digits.");
      return;
    }
    setIsVerifying(true);
    setError(null);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setIsVerifying(false);
    setVerified(true);
    setTimeout(() => router.push("/dashboard"), 1500);
  };

  const handleResend = async () => {
    if (!canResend) return;
    setIsResending(true);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError(null);
    focusInput(0);
    // Simulate resend API
    await new Promise((res) => setTimeout(res, 1000));
    setIsResending(false);
    setCanResend(false);
    setSecondsLeft(RESEND_TIMEOUT);
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left decorative panel */}
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
          <div className="mb-8">
            {/* Animated shield icon */}
            <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary-500/40">
              <ShieldCheck className="w-12 h-12 text-primary-500" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-white drop-shadow-lg tracking-tight">
              Verify Your Email
            </h1>
            <p className="text-white/90 text-lg font-light leading-relaxed">
              We take security seriously. Your verification code ensures only
              you can access your account.
            </p>
          </div>

          <div className="space-y-4 w-full">
            {[
              "6-digit secure verification",
              "Code expires after 10 minutes",
              "Request a new code anytime",
            ].map((text, i) => (
              <div key={i} className="flex items-center space-x-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-5 h-5 text-white font-bold" />
                </div>
                <span className="text-white text-base font-medium group-hover:text-primary-300 transition-colors duration-300">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — OTP form */}
      <div className="w-full lg:w-1/2 px-6 py-10 sm:p-6 lg:p-12 bg-gray-50 flex items-center justify-center min-h-screen lg:min-h-0">
        <div className="w-full max-w-md">
          {/* Back */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Mail className="w-8 h-8 text-primary-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Enter OTP
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-gray-800 break-all">
                {email}
              </span>
            </p>
          </div>

          {/* OTP Inputs */}
          <div
            className="flex justify-center gap-2 sm:gap-3 mb-3"
            onPaste={handlePaste}
          >
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputsRef.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onFocus={(e) => e.target.select()}
                disabled={verified}
                className={`
                  w-11 h-14 sm:w-13 sm:h-16 text-center text-xl font-bold rounded-xl border-2 bg-white shadow-sm
                  transition-all duration-200 outline-none
                  ${
                    digit
                      ? "border-primary-500 text-primary-600 bg-primary-50"
                      : "border-gray-200 text-gray-800"
                  }
                  ${error ? "border-red-400 shake" : ""}
                  focus:border-primary-500 focus:ring-2 focus:ring-primary-200
                  disabled:opacity-60 disabled:cursor-not-allowed
                `}
                style={{ width: "3rem", height: "3.75rem" }}
              />
            ))}
          </div>

          {/* Error message */}
          {error && (
            <p className="text-center text-xs text-red-500 mb-3 font-medium">
              {error}
            </p>
          )}

          {/* Success state */}
          {verified && (
            <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold">
                Verified! Redirecting…
              </span>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isComplete || isVerifying || verified}
            className="w-full bg-primary-500 text-white py-3 rounded-xl font-bold text-base hover:bg-primary-600 focus:ring-2 focus:ring-primary-200 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 transform mt-2"
          >
            {isVerifying ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : verified ? (
              <>
                <Check className="w-5 h-5" />
                <span>Verified</span>
              </>
            ) : (
              <span>Verify Code</span>
            )}
          </button>

          {/* Resend section */}
          <div className="mt-6 text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold text-sm transition-colors duration-300 disabled:opacity-60"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isResending ? "animate-spin" : ""}`}
                />
                {isResending ? "Sending…" : "Resend Code"}
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                Resend code in{" "}
                <span className="font-bold text-gray-800 tabular-nums">
                  {formatTime(secondsLeft)}
                </span>
              </p>
            )}
          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Didn't receive the email? Check your spam folder.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
};

export default VerifyOtpPage;