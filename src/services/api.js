import axios from 'axios';

const API_BASE = import.meta.env.VITE_SERVER_URL || 'https://scholar-stream-server-ten.vercel.app';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
