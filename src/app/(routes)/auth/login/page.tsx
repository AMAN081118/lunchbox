// src/app/(routes)/auth/login/page.tsx (Cleaned Up)

"use client";
import React from "react";

const LoginPage: React.FC = () => {
  // The login modal is rendered globally via the layout/context.
  // This page can now display static content, a marketing message, or nothing.

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h2 className="text-3xl text-gray-800 mb-4">Welcome to LunchBox</h2>
      <p className="text-gray-600">
        Click the avatar icon in the header to log in.
      </p>
      {/* The rest of the page content goes here */}
    </div>
  );
};

export default LoginPage;
