"use client"; // Required for hooks and event handlers

import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { Types } from 'mongoose';

interface Member {
    id: string,
    name: string,
}

interface IUser extends Document {
    id: string,
    name: string;
    email: string;
    password: string;
    role: 'Manager' | 'TeamMember';
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Task {
    id: number; // Temporary client-side ID
    title: string;
    taskDeadline: string;
    priority: 'Low' | 'Medium' | 'High';
    assignedMemberIds: string[];
}

interface projectInterface {
    name: string,
    description: string
}

interface NewProjectData {
    name: string;
    description: string;
    deadline: string;
    initialTasks: Omit<Task, 'id'>[];
}

const MOCK_TEAM_MEMBERS: Member[] = [
    { id: 'mem-1', name: 'Alice Wonderland' },
    { id: 'mem-2', name: 'Bob The Builder' },
    { id: 'mem-3', name: 'Charlie Chaplin' },
    { id: 'mem-4', name: 'Diana Prince' },
];

const ProjectManagementPage: React.FC = () => {
    // --- State for Tab Navigation ---
    const [activeTab, setActiveTab] = useState<'view' | 'create'>('view'); // Default to 'view'

    const [projects, setProjects] = useState<projectInterface[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProjectData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/get-projects');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            setProjects(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const [teamMembers, setTeamMembers] = useState<IUser[]>([])

    const getTeamMembers = async () => {
        try {
            const response = await fetch('/api/get-team-members')
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setAvailableMembers(result);
            setTeamMembers(result);
        }
        catch (err: any) {

        }
    }

    // --- State for Create Project Form ---
    const [projectName, setProjectName] = useState<string>('');
    const [projectDescription, setProjectDescription] = useState<string>('');
    const [projectDeadline, setProjectDeadline] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [newTaskDeadline, setNewTaskDeadline] = useState<string>('');
    const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [newTaskAssignedMembers, setNewTaskAssignedMembers] = useState<string[]>([]);
    const [availableMembers, setAvailableMembers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // --- Fetch or Set Mock Members ---
    useEffect(() => {
        fetchProjectData();
        getTeamMembers();
        setAvailableMembers(teamMembers);
    }, []);

    // --- Reset form state when switching tabs ---
    useEffect(() => {
        // Clear errors/success messages and potentially form fields when tab changes
        setError(null);
        setSuccessMessage(null);
        // Optional: Reset form fields if desired when switching away from 'create' tab
        // if (activeTab !== 'create') {
        //   resetCreateForm();
        // }
    }, [activeTab]);

    // --- Helper to reset the create form ---
    const resetCreateForm = () => {
        setProjectName('');
        setProjectDescription('');
        setProjectDeadline('');
        setTasks([]);
        setNewTaskTitle('');
        setNewTaskDeadline('');
        setNewTaskPriority('Medium');
        setNewTaskAssignedMembers([]);
    }

    // --- Task Management Handlers (Identical to previous version) ---
    const handleAddTask = () => {
        if (!newTaskTitle.trim()) {
            setError("Task title cannot be empty.");
            return;
        }
        if (!newTaskDeadline) {
            setError("Task deadline is required.");
            return;
        }
        const newTask: Task = {
            id: Date.now(), title: newTaskTitle, taskDeadline: newTaskDeadline,
            priority: newTaskPriority, assignedMemberIds: newTaskAssignedMembers,
        };
        setTasks([...tasks, newTask]);
        // Reset Add Task form part
        setNewTaskTitle(''); setNewTaskDeadline(''); setNewTaskPriority('Medium'); setNewTaskAssignedMembers([]);
        setError(null); // Clear task-specific error
    };

    const handleRemoveTask = (idToRemove: number) => {
        setTasks(tasks.filter(task => task.id !== idToRemove));
    };

    const handleMemberSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setNewTaskAssignedMembers(selectedOptions);
    };

    // --- Main Form Submission Handler (Identical to previous version) ---
    const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true); setError(null); setSuccessMessage(null);

        if (!projectName.trim() || !projectDeadline) {
            setError("Project name and deadline are required."); setIsLoading(false); return;
        }

        const initialTasksForApi = tasks.map(({ id, ...rest }) => rest);
        const newProject: NewProjectData = {
            name: projectName, description: projectDescription, deadline: projectDeadline, initialTasks: initialTasksForApi,
        };

        console.log("Submitting Project Data:", newProject);

        try {
            const response = await fetch('/api/projects', { // Your API endpoint
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProject),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Failed to create project.' }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Project created:', result);
            setSuccessMessage(`Project "${projectName}" created successfully!`);
            resetCreateForm(); // Reset form on success
            // Optionally switch back to view tab: setActiveTab('view');
        } catch (err: any) {
            console.error("Error creating project:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to get member names from IDs
    const getMemberNames = (ids: string[]): string => {
        return ids.map(id => availableMembers.find(mem => mem.id === id)?.name || 'Unknown').join(', ');
    };

    const handleSubmitProject = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        // Validation
        if (!projectName.trim()) {
            setError("Project name is required");
            setIsLoading(false);
            return;
        }

        if (!projectDeadline) {
            setError("Project deadline is required");
            setIsLoading(false);
            return;
        }

        try {
            // Prepare project data according to schema
            const projectData = {
                name: projectName,
                description: projectDescription,
                endDate: new Date(projectDeadline),
                startDate: new Date(), // Default to current date
                status: 'Not Started',
                createdBy: new Types.ObjectId(),
                // Note: createdBy will be set on the server based on authenticated user
                initialTasks: tasks.map(task => ({
                    title: task.title,
                    deadline: new Date(task.taskDeadline),
                    priority: task.priority,
                    assignedMembers: task.assignedMemberIds
                }))
            };

            // Send POST request to your API endpoint
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Failed to create project' }));
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Project created successfully:', result);

            // Show success message
            setSuccessMessage(`Project "${projectName}" has been created successfully!`);

            // Reset form
            resetCreateForm();

            // Optional: Switch back to view tab to see the newly created project
            setActiveTab('view');
            fetchProjectData();
        } catch (err: any) {
            console.error('Error creating project:', err);
            setError(err.message || 'An unexpected error occurred while creating the project');
        } finally {
            setIsLoading(false);
        }
    };

    // --- Render Logic ---
    return (
        // Main container below the assumed layout header
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-5 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* --- Tab Navigation --- */}
                <div className="mb-6 border-b border-blue-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {/* View Projects Tab */}
                        <button
                            onClick={() => setActiveTab('view')}
                            className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm rounded-t-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400
                                ${activeTab === 'view'
                                    ? 'border-blue-500 text-blue-600 bg-white shadow-sm'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-blue-50/50'
                                }`}
                        >
                            View Projects
                        </button>

                        {/* Create Project Tab */}
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm rounded-t-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400
                                ${activeTab === 'create'
                                    ? 'border-blue-500 text-blue-600 bg-white shadow-sm'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-blue-50/50'
                                }`}
                        >
                            Create Project
                        </button>
                    </nav>
                </div>

                {/* --- Tab Content --- */}
                <div className="mt-5">
                    {/* View Projects Content */}
                    {activeTab === 'view' && (
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-fade-in">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Existing Projects</h2>
                            {
                                projects.map((item: projectInterface, id: number) => {
                                    return (
                                        <div key={id} className='border border-gray-300 rounded-2xl p-[1vw] flex flex-col justify-center items-start text-gray-700'>
                                            <p className='font-bold'>{item.name}</p>
                                            <p>{item.description}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}

                    {/* Create Project Content */}
                    {activeTab === 'create' && (
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-fade-in">
                            <h2 className="text-2xl font-semibold mb-5 text-gray-700">Create New Project</h2>

                            {/* General Status Messages */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-600 rounded text-sm">
                                    Error: {error}
                                </div>
                            )}
                            {successMessage && (
                                <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded text-sm">
                                    {successMessage}
                                </div>
                            )}

                            {/* Create Project Form */}
                            <form onSubmit={handleCreateProject} className="space-y-5">
                                {/* Project Name */}
                                <div>
                                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Project Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 bg-white"
                                        required disabled={isLoading}
                                    />
                                </div>

                                {/* Project Description */}
                                <div>
                                    <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        id="projectDescription" rows={3} value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 resize-vertical bg-white"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Project Deadline */}
                                <div>
                                    <label htmlFor="projectDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                                        Project Deadline <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date" id="projectDeadline" value={projectDeadline} onChange={(e) => setProjectDeadline(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 bg-white"
                                        required disabled={isLoading}
                                    />
                                </div>

                                {/* --- Initial Tasks Section --- */}
                                <div className="pt-5 border-t border-blue-100">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Initial Tasks</h3>
                                    {/* List of Added Tasks */}
                                    <div className="space-y-3 mb-5">
                                        {tasks.length === 0 && <p className="text-sm text-gray-500 italic">No tasks added yet.</p>}
                                        {tasks.map((task) => (
                                            <div key={task.id} className="flex items-start justify-between p-3 bg-blue-50/60 rounded border border-blue-200 text-sm">
                                                <div>
                                                    <p className="font-medium text-gray-800">{task.title}</p>
                                                    <p className="text-gray-600">Deadline: {task.taskDeadline}</p>
                                                    <p className="text-gray-600">Priority: {task.priority}</p>
                                                    <p className="text-gray-600">Assigned: {getMemberNames(task.assignedMemberIds) || 'None'}</p>
                                                </div>
                                                <button type="button" onClick={() => handleRemoveTask(task.id)}
                                                    className="text-red-500 hover:text-red-700 text-xs font-medium ml-4 self-center transition-colors"
                                                    disabled={isLoading}> Remove </button>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Add Task Form */}
                                    <div className="p-4 bg-blue-50/40 rounded border border-blue-200 space-y-3 mt-4">
                                        <h4 className="text-lg font-medium text-gray-700 mb-2">Add a Task</h4>
                                        {/* Task Title */}
                                        <div>
                                            <label htmlFor="newTaskTitle" className="block text-xs font-medium text-gray-600 mb-1">Task Title</label>
                                            <input type="text" id="newTaskTitle" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 bg-white"
                                                disabled={isLoading} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {/* Task Deadline */}
                                            <div>
                                                <label htmlFor="newTaskDeadline" className="block text-xs font-medium text-gray-600 mb-1">Task Deadline</label>
                                                <input type="date" id="newTaskDeadline" value={newTaskDeadline} onChange={(e) => setNewTaskDeadline(e.target.value)}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 bg-white"
                                                    disabled={isLoading} />
                                            </div>
                                            {/* Task Priority */}
                                            <div>
                                                <label htmlFor="newTaskPriority" className="block text-xs font-medium text-gray-600 mb-1">Priority</label>
                                                <select id="newTaskPriority" value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 bg-white"
                                                    disabled={isLoading}>
                                                    <option>Low</option><option>Medium</option><option>High</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* Assign Members */}
                                        <div>
                                            <label htmlFor="assignMembers" className="block text-xs font-medium text-gray-600 mb-1">Assign Members</label>
                                            <select multiple id="assignMembers" value={newTaskAssignedMembers} onChange={handleMemberSelectionChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 h-24 bg-white"
                                                disabled={isLoading || availableMembers.length === 0}>
                                                {availableMembers.length === 0 && <option disabled>Loading members...</option>}
                                                {availableMembers.map((member, id) => (<option key={id} value={member.id}>{member.name}</option>))}
                                            </select>
                                            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple.</p>
                                        </div>
                                        {/* Add Task Button */}
                                        <button type="button" onClick={handleAddTask}
                                            className="px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-60 transition-colors"
                                            disabled={isLoading}> Add Task to List </button>
                                    </div>
                                </div>

                                {/* Submit Button for the whole Project */}
                                <div className="pt-5 text-right">
                                    <button type="submit"
                                        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 transition-colors"
                                        onClick={(e) => { handleSubmitProject(e) }}
                                        disabled={isLoading}>
                                        {isLoading ? 'Creating...' : 'Create Project'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* Simple CSS for fade-in animation */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ProjectManagementPage;

