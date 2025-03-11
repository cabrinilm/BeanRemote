import axios from 'axios';
import { getIdToken } from './auth';

const baseURL = 'https://be-bean-remote.onrender.com/api';

const beanRemoteAPI = axios.create({ baseURL });

// Automatically attach Firebase token to every request
beanRemoteAPI.interceptors.request.use(
  async (config) => {
    const idToken = await getIdToken(); // Get token dynamically
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch all users (Example Request)
export const getUsers = async (params = {}) => {
  try {
    const response = await beanRemoteAPI.get('/users', params);
    console.log('✅ Users Fetched:', response.data.users);
    return response.data.users;
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    throw error;
  }
};

// Fetch cafes (No authentication required)
export const getCafes = async () => {
  try {
    const response = await beanRemoteAPI.get('/cafes');
    console.log('✅ Cafes Fetched:', response.data.cafes);
    return response.data.cafes;
  } catch (error) {
    console.error(
      '❌ Error fetching cafes:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
