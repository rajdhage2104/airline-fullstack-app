import axios from 'axios';

const API_URL = 'http://localhost:9000/api/auth';

export const login = async (credentials) => {
  try {
    const response = await axios.post(API_URL + '/login', credentials);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message = error.response?.data || 'An error occurred during login';
    throw new Error(message);
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + '/register', {
      ...userData,
      role: 'USER' // Set default role
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data || 'An error occurred during registration';
    throw new Error(message);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user?.token;
}; 