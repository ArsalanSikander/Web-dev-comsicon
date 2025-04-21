'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 shadow-md bg-white flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">
        YourBrand
      </div>
      <div className="space-x-4">
        <Link href="/login">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
            Signup
          </button>
        </Link>
      </div>
    </nav>
  );
}
