import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    // withCredentials: true, // Include credentials for CORS requests
});

// generate json
export const createData = async (endpoint, data) => {
    const response = await api.post(endpoint, data);
    return response.data;
};

export const createContact = async (contactData) => {
    const response = await api.post('/auth/contacts', contactData);
    return response.data;
};

// create project
export const createProject = async (projectData) => {
    const response = await api.post('/projects/create', projectData);
    return response.data;
};

// update created project
export const updateProject = async (projectData) => {
    const response = await api.post('/projects/update', projectData);
    return response.data;
};

// delete created project
export const deleteProject = async (projectId) => {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
};

// Google Authentication
export const googleAuthApi = async (code) => {
    const response = await api.get(`/auth/google?code=${code}`);
    return response.data;
};


export const getProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
}