import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createProject, deleteProject, updateProject } from "../services/database.services";
import { useAuth } from "../context/context";
import { toast } from "react-hot-toast";
import ModalProject from "./Modal.Project";
import Loader from "../common/Loader.common";

const ProjectTab = () => {

    const { user: auth, projects: allProjects, setProjects: setAllProjects } = useAuth();
    const [projects, setProjects] = useState(allProjects);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showSelectedProjectModal, setShowSelectedProjectModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null); // ✅ Track which project is deleting

    const [formData, setFormData] = useState({
        projectId: "",
        projectName: "",
        projectPassword: "",
        originIp: "",
        projectType: "custom",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddProject = async () => {
        if (!formData.projectName.trim() || !formData.projectPassword.trim() || !formData.originIp.trim() || !formData.projectType) {
            toast.error("Please fill in all fields");
            return;
        }

        const project = {
            id: Date.now(),
            ...formData,
            date: new Date().toLocaleDateString(),
        };

        try {
            setLoading(true);
            const data = await createProject(project);
            setProjects([data.project, ...projects]);
            setAllProjects([data.project, ...allProjects]);
        } catch (error) {
            console.error("Error creating project:", error);
            toast.error("Failed to create project");
        } finally {
            setLoading(false);
            setShowModal(false);
            setFormData({
                projectName: "",
                projectPassword: "",
                originIp: "",
                projectType: "custom",
            });
        }
    };

    const handleDelete = async (id) => {
        const deletedProject = projects.find((p) => p.projectId === id);
        if (!deletedProject) return;
        setDeletingId(id); // ✅ Show loader for this project
        try {
            await deleteProject(id);
            const filteredProjects = projects.filter((p) => p.projectId !== id);
            setProjects(filteredProjects);
            setAllProjects(filteredProjects);
            toast.success("Project deleted successfully");
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project");
        } finally {
            setDeletingId(null); // ✅ Hide loader
        }
    };

    const handleEdit = async (id) => {
        const projectToEdit = projects.find((p) => p.projectId === id);
        if (!projectToEdit) return;
        setFormData({
            projectId: projectToEdit.projectId,
            projectName: projectToEdit.projectName,
            projectPassword: projectToEdit.projectPassword,
            originIp: projectToEdit.originIp,
            projectType: projectToEdit.projectType,
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleUpdateProject = async () => {
        if (!formData.projectId) return;
        try {
            setLoading(true);
            const response = await updateProject(formData);
            if (response.project) {
                const updatedProjects = projects.map((p) =>
                    p.projectId === formData.projectId ? response.project : p
                );
                setProjects(updatedProjects);
                setAllProjects(updatedProjects);
                toast.success("Project updated successfully");
            }
        } catch (error) {
            console.error("Error updating project:", error);
            toast.error("Failed to update project");
        } finally {
            setLoading(false);
            setShowModal(false);
            setFormData({
                projectName: "",
                projectPassword: "",
                originIp: "",
                projectType: "custom",
            });
        }
    };

    return (
        <div className="ml-1 md:ml-10 mt-12 flex flex-col gap-6 text-white">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <h2 className="text-2xl font-bold">Projects</h2>
                <button
                    onClick={() => {
                        setFormData({
                            projectName: "",
                            projectPassword: "",
                            originIp: "",
                            projectType: "custom",
                        });
                        setIsEditing(false);
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 bg-gray-400/20 border border-gray-300 px-4 py-1 rounded-lg font-semibold"
                >
                    <span className="text-lg font-bold">+</span> Create New Project
                </button>
            </motion.div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700 p-4 rounded-lg shadow-md overflow-x-auto"
            >
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="p-2">Project Name</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Origin/IP</th>
                            <th className="p-2">Created Date</th>
                            <th className="p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-400">
                                    No projects yet.
                                </td>
                            </tr>
                        ) : (
                            projects.map((project, idx) => (
                                <motion.tr
                                    key={project.projectId || idx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="border-b border-gray-600 hover:bg-gray-600/50"
                                >
                                    <td className="p-2">
                                        <button
                                            onClick={() => { setSelectedProject(project); setShowSelectedProjectModal(true); }}
                                            className="hover:underline cursor-pointer"
                                        >
                                            {project.projectName}
                                        </button>
                                    </td>
                                    <td className="p-2">{project.projectType === "aicustom" ? "smart-mode" : "basic-mode"}</td>
                                    <td className="p-2">{project.originIp}</td>
                                    <td className="p-2">{new Date(project.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2 flex justify-center gap-4">
                                        <button
                                            onClick={() => handleEdit(project.projectId)}
                                            className="text-green-400 hover:text-green-500"
                                        >
                                            <i className="fi fi-rr-edit"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.projectId)}
                                            className="text-red-400 hover:text-red-500 flex items-center gap-1"
                                        >
                                            {deletingId === project.projectId ? (
                                                <svg
                                                    className="animate-spin h-4 w-4 text-red-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <i className="fi fi-rr-trash"></i>
                                            )}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
                        >
                            <h3 className="text-xl font-semibold mb-4">New Project</h3>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    placeholder="Project Name"
                                    className="px-3 py-2 rounded bg-gray-700 border border-gray-600"
                                />
                                <input
                                    type="password"
                                    name="projectPassword"
                                    value={formData.projectPassword}
                                    onChange={handleChange}
                                    placeholder="Project Password"
                                    className="px-3 py-2 rounded bg-gray-700 border border-gray-600"
                                />
                                <input
                                    type="text"
                                    name="originIp"
                                    value={formData.originIp}
                                    onChange={handleChange}
                                    placeholder="Origin / IP"
                                    className="px-3 py-2 rounded bg-gray-700 border border-gray-600"
                                />
                                <select
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="px-3 py-2 rounded bg-gray-700 border border-gray-600"
                                >
                                    <option value={'custom'}>Basic Mode</option>
                                    <option value={'aicustom'}>Smart Mode</option>
                                </select>
                            </div>
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-1 border-[1px] hover:scale-105 cursor-pointer border-gray-200 bg-gray-300/20 rounded-lg "
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (isEditing) {
                                            handleUpdateProject();
                                        } else {
                                            handleAddProject();
                                        }
                                    }}
                                    disabled={loading}
                                    className={`px-4 py-1 border-[1px] hover:scale-105 cursor-pointer border-gray-200 bg-gray-300/20 rounded-lg flex items-center justify-center gap-2 ${loading ? "opacity-60 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="animate-spin h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                ></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showSelectedProjectModal && (
                <ModalProject
                    isOpen={showSelectedProjectModal}
                    onClose={() => setShowSelectedProjectModal(false)}
                    projectData={selectedProject}
                />
            )}
        </div>
    );
};

export default ProjectTab;
