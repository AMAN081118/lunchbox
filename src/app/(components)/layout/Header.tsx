import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="box-border shadow-orange-200 shadow-sm">
      <div className="p-4 flex justify-between">
        <h1>LunchBox</h1>
        <ul className="flex gap-2">
          <Link href="/auth/login">Log in</Link>
          <Link href="/auth/register">Sign up</Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
