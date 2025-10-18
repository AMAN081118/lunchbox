import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-svh">
      <h1>Login</h1>
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <select>
            <option>+91</option>
          </select>
          <input placeholder="Phone" />
        </div>
        <input placeholder="Institute Email" />
        <button>Log in</button>
        <div className="flex gap-2">
          <h1>
            New to lunchBox<span className="text-red-500">?</span>
          </h1>
          <Link href="/auth/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
