import axios from 'axios';

const API_URL = 'http://localhost:3001/api/members';

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log('API response received:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    console.error('Error response data:', error.response?.data);
    return Promise.reject(error);
  }
);

export const getMembers = () => {
  console.log('getMembers called, making request to:', API_URL);
  return axios.get(API_URL);
};
export const addMember = (data) => axios.post(API_URL, data);
export const updateMember = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteMember = (id) => axios.delete(`${API_URL}/${id}`);
