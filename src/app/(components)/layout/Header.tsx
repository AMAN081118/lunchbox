// src/components/Header.tsx
"use client";

import Link from "next/link";
import React from "react";
import { useModal } from "@/context/ModalContext";
import { useUserStore } from "@/store/useUserStore";
import { supabase } from "@/lib/supabaseClient";

const Header: React.FC = () => {
  const { openLoginModal } = useModal();
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfile(null); // clear Zustand state
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl font-extrabold text-black tracking-tighter">
            LunchBox
          </h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Use App Button */}
          <Link
            href="/download"
            className="hidden sm:block px-5 py-2.5 bg-red-600 text-white font-medium text-lg rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200"
          >
            Use App
          </Link>

          {/* User Avatar or Login */}
          {profile ? (
            <div className="flex items-center space-x-2">
              <span className="hidden sm:block font-medium text-gray-700">
                {profile.full_name}
              </span>
              <button
                onClick={handleLogout}
                className="h-10 w-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer transition-shadow duration-200 hover:shadow-inner hover:bg-gray-50 p-0"
                aria-label="Logout"
              >
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M13.293 7.293a1 1 0 011.414 0L18 10.586a1 1 0 010 1.414l-3.293 3.293a1 1 0 01-1.414-1.414L15.586 12H9a1 1 0 110-2h6.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
