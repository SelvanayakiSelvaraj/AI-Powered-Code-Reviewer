import axios from 'axios';

// Use the environment variable, or fallback to relative URL for docker/proxy
const API_URL = (import.meta.env.VITE_API_URL || '') + '/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to add auth token
apiClient.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const submitCodeReview = async (language, code) => {
  const response = await apiClient.post('/review', { language, code });
  return response.data;
};

export const getReviewHistory = async (page = 1, limit = 6, search = '') => {
  const response = await apiClient.get(`/history?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};

export const getReviewById = async (id) => {
  const response = await apiClient.get(`/review/${id}`);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await apiClient.delete(`/history/${id}`);
  return response.data;
};

export const getAnalytics = async () => {
  const response = await apiClient.get('/analytics');
  return response.data;
};
