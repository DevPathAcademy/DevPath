import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update if deploying elsewhere
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add auth token to requests if needed later
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('devpath_token');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default API;
