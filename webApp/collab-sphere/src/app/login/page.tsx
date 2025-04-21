import { Metadata } from 'next';
import LoginForm from '../components/auth/LoginForm';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Log In | Project Management',
  description: 'Log in to your account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-6">
            Log in to your account
          </h2>

          <LoginForm />

          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-700 transition duration-200"
            >
              Forgot Password?
            </a>
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-700 transition duration-200"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
