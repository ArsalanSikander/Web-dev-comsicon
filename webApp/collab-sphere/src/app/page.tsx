import Navbar from './components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">CollabSphere</span>
                <span className="block text-3xl sm:text-4xl mt-2">Smart Team Collaboration Platform</span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-700">
                Seamlessly connect your team, manage projects, and boost productivity with our all-in-one collaboration solution.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <span className="inline-flex w-full sm:w-auto justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                    Get Started Free
                  </span>
                </Link>
                <Link href="/demo">
                  <span className="inline-flex w-full sm:w-auto justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Watch Demo
                  </span>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center text-gray-500 text-sm">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required · Free 14-day trial
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="bg-gray-100 p-1">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="aspect-w-16 aspect-h-9 w-full">
                    <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
                      <p className="text-gray-500">Dashboard Preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="max-w-7xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Teams Choose CollabSphere</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Streamlined Communication</h3>
              <p className="text-gray-600">Keep all project discussions organized in one place with real-time messaging and file sharing.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Intuitive Task Management</h3>
              <p className="text-gray-600">Create, assign, and track tasks with clear deadlines and ownership to boost team accountability.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Analytics</h3>
              <p className="text-gray-600">Gain insights into team productivity with customizable dashboards and performance metrics.</p>
            </div>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="max-w-7xl mx-auto mt-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Trusted by teams at</p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex justify-center items-center">
              <div className="h-8 text-gray-400">COMPANY LOGO</div>
            </div>
            <div className="flex justify-center items-center">
              <div className="h-8 text-gray-400">COMPANY LOGO</div>
            </div>
            <div className="flex justify-center items-center">
              <div className="h-8 text-gray-400">COMPANY LOGO</div>
            </div>
            <div className="flex justify-center items-center">
              <div className="h-8 text-gray-400">COMPANY LOGO</div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-24 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 sm:py-16 text-center sm:text-left">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Ready to transform your team's collaboration?
                </h2>
                <p className="mt-2 text-white text-opacity-80 max-w-xl">
                  Start your free 14-day trial today. No credit card required.
                </p>
              </div>
              <div className="mt-6 sm:mt-0 sm:ml-8">
                <Link href="/signup">
                  <span className="block w-full sm:w-auto px-6 py-3 bg-white font-medium text-blue-600 rounded-md shadow hover:bg-gray-50 transition-colors">
                    Get Started Now
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">CollabSphere</span>
            </div>
            <div className="mt-6 md:mt-0">
              <ul className="flex space-x-8">
                <li><Link href="/about"><span className="text-gray-500 hover:text-gray-700">About</span></Link></li>
                <li><Link href="/features"><span className="text-gray-500 hover:text-gray-700">Features</span></Link></li>
                <li><Link href="/pricing"><span className="text-gray-500 hover:text-gray-700">Pricing</span></Link></li>
                <li><Link href="/contact"><span className="text-gray-500 hover:text-gray-700">Contact</span></Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} CollabSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}