// src/app/signup/page.tsx
import { Metadata } from 'next';
import SignupForm from '../components/auth/SignupForm';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Sign Up | Project Management',
  description: 'Create a new account',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
