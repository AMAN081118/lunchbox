// src/components/Header.tsx (Updated)

"use client"; // Needs to be a client component to use the context hook
import Link from "next/link";
import React from "react";
import { useModal } from "@/context/ModalContext"; // Import the new hook

const Header: React.FC = () => {
  // Use the context hook to get the function to open the modal
  const { openLoginModal } = useModal();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center h-16">
        {/* Logo/Title Section (Unchanged) */}
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl font-extrabold text-black tracking-tighter">
            LunchBox
          </h1>
        </Link>

        {/* Actions Section (Right Side) */}
        <div className="flex items-center space-x-3">
          {/* Use App Button (Unchanged) */}
          <Link
            href="/download"
            className="hidden sm:block px-5 py-2.5 bg-red-600 text-white font-medium text-lg rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200"
          >
            Use App
          </Link>

          {/* User Profile Avatar: NOW TRIGGERS THE MODAL */}
          <button
            onClick={openLoginModal} // <-- This is the key change
            className="h-10 w-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer transition-shadow duration-200 hover:shadow-inner hover:bg-gray-50 p-0"
            aria-label="Open login modal"
          >
            <svg
              className="w-6 h-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
