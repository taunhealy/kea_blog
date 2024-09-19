// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <h1 className="text-xl font-bold">My Blog</h1>
      <div>
        {session ? (
          <Link href="/admin/" className="rounded bg-blue-500 px-4 py-2">
            Admin Panel
          </Link>
        ) : (
          <>
            <Link href="/sign-in" className="rounded bg-blue-500 px-4 py-2">
              Sign In
            </Link>
            <Link href="/sign-up" className="rounded bg-green-500 px-4 py-2">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
