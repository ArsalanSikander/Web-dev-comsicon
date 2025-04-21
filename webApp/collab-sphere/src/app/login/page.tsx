// src/app/login/page.tsx
import { Metadata } from 'next';
import LoginForm from '../components/auth/LoginForm';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Log In | Project Management',
  description: 'Log in to your account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
