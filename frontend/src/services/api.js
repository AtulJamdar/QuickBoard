import axios from 'axios';

const API = axios.create({
    // Uses the Vercel variable if it exists, otherwise defaults to local
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
});

export const createClass = (data) => API.post('/classes', data);
export const getClassDetails = (id) => API.get(`/classes/${id}`);
export const getMessages = (classId) => API.get(`/messages/${classId}`);
export const sendMessage = (data) => API.post('/messages', data);