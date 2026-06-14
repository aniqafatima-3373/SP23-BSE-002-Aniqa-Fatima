import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Aapka backend URL
});

// ✨ HAR REQUEST KE SATH AUTOMATIC TOKEN BHEJNE KA CODE
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Check karein localstorage mein key ka naam 'token' hi hai na
  if (token) {
    // Backend dono headers accept karega ab:
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['x-auth-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;