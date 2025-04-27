import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: false, // Using token-based auth, not cookies
});

// Request interceptor to add authorization header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  register: (email: string, password: string) => 
    api.post('/auth/register', { email, password }),
  
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  logout: () => 
    api.post('/auth/logout'),
};

// Chat services
export const chatService = {
  sendMessage: (message: string) => 
    api.post('/chat/chat', { message }),
};

// Search services
export const searchService = {
  search: (query: string) => 
    api.get(`/search?q=${encodeURIComponent(query)}`),
};

export default api;