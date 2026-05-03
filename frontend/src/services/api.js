import axios from 'axios';

//The Base URL points to you Node.js server
const API = axios.create({
    baseURL: 'quickboard-production-f0ef.up.railway.app',
});

export const createClass = (data) => API.post('/classes', data);
export const getClassDetails = (id) => API.get(`/classes/${id}`);
export const getMessages = (classId) => API.get(`/messages/${classId}`);
export const sendMessage = (data) => API.post('/messages', data);