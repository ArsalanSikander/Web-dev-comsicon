// src/app/unauthorized/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unauthorized | Project Management',
  description: 'You do not have permission to access this page',
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
          <p className="text-gray-600 mb-6">
            You do not have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          <div className="flex flex-col space-y-3">
            <Link 
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
            >
              Go to Home
            </Link>
            <Link
              href="/login"
              className="text-blue-500 hover:underline"
            >
              Log in with a different account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}