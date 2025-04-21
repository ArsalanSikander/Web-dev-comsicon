// src/app/team-member/dashboard.tsx
'use client'; // Necessary for Next.js App Router client components

import React, { useState, useEffect } from 'react';
import { MessageSquare, FolderKanban, Send, User, Loader2 } from 'lucide-react'; // Icons
import { useSocket } from '@/app/components/socketProvider';

// --- Frontend Data Types (Based on provided Mongoose Schemas/Interfaces) ---

/**
 * Interface for Task data as used in the frontend.
 * IDs (_id, assignedTo, project) are represented as strings,
 * as they are typically serialized from Mongoose ObjectIds.
 * Dates are represented as strings (ISO format) for serialization.
 */
interface ITask {
  _id: string;
  title: string;
  description?: string;
  assignedTo: string[]; // Array of User IDs (strings)
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  project: string; // Project ID (string)
  deadline?: string; // ISO Date string
  createdAt?: string; // ISO Date string
  updatedAt?: string; // ISO Date string
}

/**
 * Interface for Project data as used in the frontend.
 * IDs (_id, createdBy, teamMembers, tasks) are represented as strings.
 * Dates are represented as strings (ISO format).
 * `tasks` can be an array of task IDs (strings) or populated ITask objects.
 */
interface IProject {
  _id: string;
  name: string;
  description?: string;
  createdBy: string; // User ID (string)
  teamMembers: string[]; // Array of User IDs (strings)
  tasks: string[] | ITask[]; // Array of Task IDs (strings) or populated ITask objects
  startDate?: string; // ISO Date string
  endDate?: string; // ISO Date string
  status: 'Not Started' | 'In Progress' | 'Completed';
  createdAt?: string; // ISO Date string
  updatedAt?: string; // ISO Date string
}

// --- Mock Data (Replace with actual API fetching logic) ---

// Mock projects simulating data fetched from an API endpoint
const MOCK_PROJECTS_DATA: IProject[] = [
  {
    _id: 'proj_alpha_1',
    name: 'E-commerce Platform',
    description: 'Build the core platform for online sales.',
    createdBy: 'user_admin_001',
    teamMembers: ['user_dev_101', 'user_dev_102', 'current_user_id'], // 'current_user_id' represents the logged-in user
    tasks: ['task_ecom_1', 'task_ecom_2'],
    status: 'In Progress',
    startDate: new Date('2024-02-01').toISOString(),
    endDate: new Date('2024-09-30').toISOString(),
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-04-20').toISOString(),
  },
  {
    _id: 'proj_beta_2',
    name: 'Internal CRM Update',
    description: 'Upgrade the internal customer relationship management system.',
    createdBy: 'user_manager_002',
    teamMembers: ['user_dev_103', 'current_user_id'], // Logged-in user is part of this project
    tasks: ['task_crm_1', 'task_crm_2', 'task_crm_3'],
    status: 'Not Started',
    startDate: new Date('2024-06-01').toISOString(),
    createdAt: new Date('2024-04-15').toISOString(),
    updatedAt: new Date('2024-04-15').toISOString(),
  },
  {
    _id: 'proj_gamma_3',
    name: 'Data Migration',
    description: 'Migrate legacy data to the new database schema.',
    createdBy: 'user_lead_003',
    teamMembers: ['current_user_id', 'user_dba_104'], // Logged-in user is part of this project
    tasks: [],
    status: 'In Progress',
    startDate: new Date('2024-05-10').toISOString(),
    createdAt: new Date('2024-04-01').toISOString(),
    updatedAt: new Date('2024-04-18').toISOString(),
  },
  {
    _id: 'proj_delta_4',
    name: 'User Documentation',
    description: 'Create comprehensive user guides for the new software.',
    createdBy: 'user_manager_002',
    teamMembers: ['user_writer_105'], // Logged-in user is NOT part of this project
    tasks: [],
    status: 'Completed',
    startDate: new Date('2024-01-15').toISOString(),
    endDate: new Date('2024-04-10').toISOString(),
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-04-10').toISOString(),
  },
];

// --- Team Member Dashboard Component ---

const TeamMemberDashboard: React.FC = () => {
  // State for storing the projects assigned to the current user
  const [assignedProjects, setAssignedProjects] = useState<IProject[]>([]);
  // State for the project currently selected for chat
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  // State to track loading status during data fetch
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to store any error messages during data fetch
  const [error, setError] = useState<string | null>(null);
  // State for the message being typed in the chat input
  const [chatInput, setChatInput] = useState<string>('');

  const socket = useSocket();


  // --- Fetch Assigned Projects ---
  useEffect(() => {
    // This function simulates fetching projects for the logged-in team member.
    // In a real application, replace this with an actual API call.

    const fetchUserProjects = async () => {
      setIsLoading(true);
      setError(null);
      setAssignedProjects([]); // Clear previous projects

      try {
        // --- Start: Replace with actual API call ---
        console.log("Fetching projects for team member...");
        // Example API call structure:
        // const response = await fetch('/api/my-projects'); // Endpoint needs authentication context
        // if (!response.ok) {
        //   throw new Error(`Failed to fetch projects: ${response.statusText}`);
        // }
        // const data = await response.json();
        // const projects: IProject[] = data.projects;

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Filter the mock data to get projects for 'current_user_id'
        // const userProjects = MOCK_PROJECTS_DATA.filter(project =>
        //   project.teamMembers.includes('current_user_id')
        // );

        const userProjects = await fetch('/api/get-team-mem-projects');

        // setAssignedProjects(userProjects);
        
        
        console.log("Projects fetched successfully:", userProjects);
        // --- End: Replace with actual API call ---

      } catch (err) {
        console.error("Error fetching projects:", err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while fetching projects.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProjects();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // --- Event Handlers ---

  /**
   * Handles selecting a project from the sidebar.
   * Updates the selected project state and clears the chat input.
   * @param project The project object that was clicked.
   */
  const handleProjectSelect = (project: IProject) => {
    setSelectedProject(project);
    socket?.emit('disconnect');
    socket?.emit('joinProjectRoom', (project._id));
    setChatInput(''); // Reset chat input when switching projects
    console.log(`Project selected for chat: ${project.name} (ID: ${project._id})`);
    // Future enhancement: Fetch chat history for the selected project here.
  };

  /**
   * Handles submitting the chat message form.
   * Prevents default form submission and logs the message (placeholder).
   * @param e The form event.
   */
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedProject) {
      console.log("Cannot send empty message or no project selected.");
      return; // Do nothing if message is empty or no project is selected
    }

    console.log(`Sending message to project "${selectedProject.name}": ${chatInput}`);
    // --- Start: Replace with actual message sending logic ---
    // Example: sendMessageToProject(selectedProject._id, chatInput);
    // This would typically involve an API call or WebSocket emission.
    // After successful sending, you might want to update the chat display.
    // --- End: Replace with actual message sending logic ---

    setChatInput(''); // Clear the input field after "sending"
  };

  // --- Render Component ---

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased text-gray-900">
      {/* Sidebar: Project List */}
      <aside className="w-64 md:w-72 flex-shrink-0 bg-white p-4 border-r border-gray-200 flex flex-col shadow-md">
        {/* Sidebar Header */}
        <div className="flex items-center mb-5 px-1">
          <FolderKanban className="h-6 w-6 mr-2 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-800">My Projects</h2>
        </div>

        {/* Project List Area */}
        <div className="flex-grow overflow-y-auto -mr-2 pr-2"> {/* Handle scrollbar */}
          {isLoading && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              <span>Loading...</span>
            </div>
          )}
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}
          {!isLoading && !error && assignedProjects.length === 0 && (
            <p className="text-center text-gray-500 px-2 py-4 text-sm">No projects assigned.</p>
          )}
          {!isLoading && !error && assignedProjects.length > 0 && (
            <ul className="space-y-1">
              {assignedProjects.map((project) => (
                <li key={project._id}>
                  <button
                    type="button"
                    onClick={() => handleProjectSelect(project)}
                    className={`w-full flex justify-between items-center text-left px-3 py-2.5 rounded-md text-sm transition-all duration-150 ease-in-out group focus:outline-none focus:ring-2 focus:ring-indigo-300 ${selectedProject?._id === project._id
                      ? 'bg-indigo-100 text-indigo-800 font-semibold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                  >
                    <span className="truncate mr-2">{project.name}</span>
                    <MessageSquare
                      className={`h-4 w-4 flex-shrink-0 transition-colors duration-150 ${selectedProject?._id === project._id
                        ? 'text-indigo-600'
                        : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">Team Dashboard</p>
        </div>
      </aside>

      {/* Main Content: Chat Area */}
      <main className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 min-w-0"> {/* min-w-0 prevents overflow issues */}
        {selectedProject ? (
          // Display chat interface if a project is selected
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <header className="p-4 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {selectedProject.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {selectedProject.description || 'Project Chat'}
              </p>
            </header>

            {/* Chat Message Display Area */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
              {/* Placeholder: Messages would be rendered here */}
              <div className="text-center text-sm text-gray-400 my-4 italic">
                --- Chat messages for {selectedProject.name} will appear here ---
              </div>
              {/* Example message rendering (static for demo) */}
              <div className="flex items-start space-x-3 max-w-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center font-semibold text-sm"><User size={16} /></span>
                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-100">
                  <p className="text-sm font-medium text-purple-600">Dev Team Bot</p>
                  <p className="text-sm text-gray-700">Welcome to the chat for project: "{selectedProject.name}".</p>
                  <p className="text-xs text-gray-400 mt-1 text-right">Just now</p>
                </div>
              </div>
              {/* Add more example messages or integrate real-time chat rendering */}
            </div>

            {/* Chat Input Area */}
            <footer className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  aria-label="Chat message input"
                />
                <button
                  type="submit"
                  className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!chatInput.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </footer>
          </div>
        ) : (
          // Display placeholder if no project is selected
          <div className="flex-1 flex items-center justify-center text-center text-gray-500">
            <div className="p-6">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-lg font-medium">Select a project</p>
              <p className="text-sm">Choose a project from the list on the left to start chatting.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamMemberDashboard; // Export the component for use in Next.js
