import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Generic POST
export const createData = async (endpoint, data) => {
    const response = await api.post(endpoint, data);
    return response.data;
};
