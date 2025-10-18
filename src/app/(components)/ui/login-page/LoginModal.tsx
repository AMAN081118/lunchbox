// src/app/(components)/ui/login-page/LoginModal.tsx

"use client";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { X, Mail, ChevronDown } from "lucide-react";

// --- PLACEHOLDER TYPES AND DATA ---
interface CountryCode {
  flag: string;
  code: string;
  value: string;
}

const countryCodes: CountryCode[] = [
  { flag: "🇮🇳", code: "+91", value: "IN" },
  { flag: "🇺🇸", code: "+1", value: "US" },
];

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the modal
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  // Hook 1: State for the selected country code
  const [selectedCode, setSelectedCode] = useState<string>("+91");

  // Hooks 2, 3, 4: Memoized handler functions for future logic
  const handlePhoneLogin = useCallback(() => {
    // Logic to send OTP to the phone number
    console.log("Sending OTP to phone...");
  }, []);

  const handleEmailLogin = useCallback(() => {
    // Logic to transition to email login form or redirect
    console.log("Continuing with Email...");
  }, []);

  const handleGoogleLogin = useCallback(() => {
    // Logic for Google OAuth
    console.log("Logging in with Google...");
  }, []);

  // --- Conditional Render: Must be AFTER all hooks ---
  if (!isOpen) return null;

  return (
    // Modal Overlay and Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      {/* Modal Content Container */}
      <div className="w-full max-w-sm bg-white rounded-lg shadow-2xl p-6 sm:p-8 relative">
        {/* Header: Title and Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* --- Phone Input Group --- */}
        <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-4 h-14 focus-within:border-red-500">
          {/* Country Code Dropdown */}
          <div className="flex items-center bg-gray-50 border-r border-gray-300 pl-3 pr-2 relative">
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="appearance-none bg-transparent border-none text-base text-gray-700 font-medium focus:outline-none cursor-pointer pr-5 h-full"
            >
              {countryCodes.map((c) => (
                <option key={c.value} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
            {/* Display Flag next to select */}
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {countryCodes.find((c) => c.code === selectedCode)?.flag}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500 pointer-events-none absolute right-1" />
          </div>

          {/* Phone Input */}
          <input
            type="tel"
            placeholder="Phone"
            className="w-full p-3 sm:p-4 text-gray-700 focus:outline-none text-base border-none"
          />
        </div>

        {/* --- Send OTP Button --- */}
        <button
          onClick={handlePhoneLogin}
          className="w-full py-3 bg-red-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200 mb-4"
        >
          Send One Time Password
        </button>

        {/* --- OR Divider --- */}
        <div className="flex items-center mb-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm font-light uppercase">
            Or
          </span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* --- Continue with Email Button --- */}
        <button
          onClick={handleEmailLogin}
          className="w-full py-3 border border-gray-300 text-gray-700 font-medium text-lg rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center mb-4"
        >
          <Mail className="h-5 w-5 mr-3 text-red-500" />
          Continue with Email
        </button>

        {/* --- Google Login Button --- */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 border border-gray-300 text-gray-700 font-medium text-lg rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center mb-6"
        >
          {/* Placeholder for Google G icon */}
          <span className="mr-3"></span>
          Continue with Google
        </button>

        {/* --- New User Link --- */}
        <div className="text-center text-gray-600 text-sm">
          New to LunchBox?{" "}
          <Link
            href="/auth/register"
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
