// src/app/page.tsx
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white px-6 py-20 flex flex-col items-center justify-start">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            CollabSphere – Smart Team Collaboration Platform
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            In today’s fast-paced digital work environments, seamless collaboration, task management, and performance tracking are essential. 
            Tools like Slack, Asana, and Trello have set benchmarks, but many small-to-medium-sized teams still struggle with fragmented communication 
            and unclear task ownership.
          </p>
          <p className="text-md text-gray-600">
            <strong>Your Challenge:</strong> Design and develop a web-based collaboration platform that enables project managers to create and assign tasks, 
            allows team members to communicate efficiently, and includes performance evaluation metrics to keep everyone accountable.
          </p>
        </div>
      </main>
    </>
  );
}
