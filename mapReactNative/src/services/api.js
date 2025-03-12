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

// --- Root API Endpoint ---
export const getApi = async (params = {}) => {
  try {
    const response = await beanRemoteAPI.get('/', { params });
    return response.data;
  } catch (error) {
    console.error(
      '❌ Error fetching API root:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// --- Users Endpoints ---
export const getUsers = async (params = {}) => {
  try {
    const response = await beanRemoteAPI.get('/users', { params });
    return response.data.users; // Array of user objects
  } catch (error) {
    console.error(
      '❌ Error fetching users:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postUser = async (body = {}) => {
  try {
    const response = await beanRemoteAPI.post('/users', body);
    return response.data.user; // Newly created user object
  } catch (error) {
    console.error(
      '❌ Error creating user:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserById = async (user_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/users/${user_id}`, { params });
    return response.data.user; // Single user object
  } catch (error) {
    console.error(
      '❌ Error fetching user by ID:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const patchUserById = async (user_id, body = {}) => {
  try {
    const response = await beanRemoteAPI.post(`/users/${user_id}`, body);
    return response.data.user; // Updated user object
  } catch (error) {
    console.error(
      '❌ Error updating user:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteUserById = async (user_id) => {
  try {
    const response = await beanRemoteAPI.delete(`/users/${user_id}`);
    return response.data.msg; // Success message string
  } catch (error) {
    console.error(
      '❌ Error deleting user:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserByFirebaseUid = async (params = {}) => {
  try {
    const response = await beanRemoteAPI.get('/users/firebase/data', {
      params,
    });
    return response.data.user; // Single user object
  } catch (error) {
    console.error(
      '❌ Error fetching user by Firebase UID:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const patchUserAmenities = async (user_id, body = {}) => {
  try {
    const response = await beanRemoteAPI.patch(
      `/users/${user_id}/amenities`,
      body
    );
    return response.data.userAmenities; // Array of user amenity objects
  } catch (error) {
    console.error(
      '❌ Error updating user amenities:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserFavourites = async (user_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/users/${user_id}/favourites`, {
      params,
    });
    return response.data.favourites; // Array of favourite cafe objects
  } catch (error) {
    console.error(
      '❌ Error fetching user favourites:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postUserFavourite = async (user_id, body = {}) => {
  try {
    const response = await beanRemoteAPI.post(
      `/users/${user_id}/favourites`,
      body
    );
    return response.data.favourite; // Newly added favourite cafe object
  } catch (error) {
    console.error(
      '❌ Error adding favourite cafe:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteUserFavourite = async (user_id, cafe_id) => {
  try {
    const response = await beanRemoteAPI.delete(
      `/users/${user_id}/favourites/${cafe_id}`
    );
    return response.data.msg; // Success message string
  } catch (error) {
    console.error(
      '❌ Error removing favourite cafe:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserReviews = async (user_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/users/${user_id}/reviews`, {
      params,
    });
    return response.data.reviews; // Array of review objects
  } catch (error) {
    console.error(
      '❌ Error fetching user reviews:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserReviewById = async (user_id, review_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(
      `/users/${user_id}/reviews/${review_id}`,
      { params }
    );
    return response.data.review; // Single review object
  } catch (error) {
    console.error(
      '❌ Error fetching user review by ID:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteUserReview = async (user_id, review_id) => {
  try {
    await beanRemoteAPI.delete(`/users/${user_id}/reviews/${review_id}`);
    return true; // No content returned (204 status)
  } catch (error) {
    console.error(
      '❌ Error deleting user review:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// --- Reviews Endpoints ---
export const getReviewById = async (review_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/reviews/${review_id}`, {
      params,
    });
    return response.data.reviews; // Array of review objects (potential typo in controller)
  } catch (error) {
    console.error(
      '❌ Error fetching review by ID:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteReview = async (review_id) => {
  try {
    await beanRemoteAPI.delete(`/reviews/${review_id}`);
    return true; // No content returned (204 status)
  } catch (error) {
    console.error(
      '❌ Error deleting review:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getVoteCount = async (review_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/reviews/${review_id}/votes`, {
      params,
    });
    return response.data.count; // Vote count number
  } catch (error) {
    console.error(
      '❌ Error fetching vote count:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCurrentVote = async (review_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/reviews/${review_id}/vote`, {
      params,
    });
    return response.data.vote_type; // Current vote type ('helpful', 'unhelpful', or null)
  } catch (error) {
    console.error(
      '❌ Error fetching current vote:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const voteOnReview = async (review_id, params = {}, body = {}) => {
  try {
    const response = await beanRemoteAPI.post(
      `/reviews/${review_id}/vote`,
      body,
      { params }
    );
    return response.data; // Object with vote_type and helpful_count
  } catch (error) {
    console.error(
      '❌ Error voting on review:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// --- Cafes Endpoints ---
export const getCafes = async (params = {}) => {
  try {
    const response = await beanRemoteAPI.get('/cafes', { params });
    return response.data.cafes; // Array of cafe objects
  } catch (error) {
    console.error(
      '❌ Error fetching cafes:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postCafe = async (body = {}) => {
  try {
    const response = await beanRemoteAPI.post('/cafes', body);
    return response.data.cafes; // Newly created cafe object (potential typo in controller)
  } catch (error) {
    console.error(
      '❌ Error creating cafe:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCafeById = async (cafe_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/cafes/${cafe_id}`, { params });
    return response.data.cafe; // Single cafe object
  } catch (error) {
    console.error(
      '❌ Error fetching cafe by ID:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCafeAmenities = async (cafe_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/cafes/${cafe_id}/amenities`, {
      params,
    });
    return response.data.amenities; // Array of amenity objects
  } catch (error) {
    console.error(
      '❌ Error fetching cafe amenities:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCafesByCoordinates = async (params = {}) => {
  try {
    const response = await beanRemoteAPI.get('/cafes/map/visible', { params });
    return response.data.cafes; // Array of cafe objects
  } catch (error) {
    console.error(
      '❌ Error fetching cafes by coordinates:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCafesByRadius = async (params = {}) => {
  try {
    const response = await beanRemoteAPI.get('/cafes/map/radius', { params });
    return response.data.cafes; // Array of cafe objects
  } catch (error) {
    console.error(
      '❌ Error fetching cafes by radius:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCafeReviews = async (cafe_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/cafes/${cafe_id}/reviews`, {
      params,
    });
    return response.data.reviews; // Array of review objects
  } catch (error) {
    console.error(
      '❌ Error fetching cafe reviews:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postCafeReview = async (cafe_id, body = {}) => {
  try {
    const response = await beanRemoteAPI.post(
      `/cafes/${cafe_id}/reviews`,
      body
    );
    return response.data.review; // Newly created review object
  } catch (error) {
    console.error(
      '❌ Error adding cafe review:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// --- Visits Endpoints ---
export const getVisits = async (params = {}) => {
  try {
    const response = await beanRemoteAPI.get('/visits', { params });
    return response.data.visits; // Array of visit objects
  } catch (error) {
    console.error(
      '❌ Error fetching visits:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postVisit = async (body = {}) => {
  try {
    const response = await beanRemoteAPI.post('/visits', body);
    return response.data.visit; // Newly created visit object
  } catch (error) {
    console.error(
      '❌ Error adding visit:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// --- Amenities Endpoints ---
export const getAmenities = async (params = {}) => {
  try {
    const response = await beanRemoteAPI.get('/amenities', { params });
    return response.data.amenities; // Array of amenity objects
  } catch (error) {
    console.error(
      '❌ Error fetching amenities:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postAmenity = async (body = {}) => {
  try {
    const response = await beanRemoteAPI.post('/amenities', body);
    return response.data.amenity; // Newly created amenity object
  } catch (error) {
    console.error(
      '❌ Error creating amenity:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAmenityById = async (amenity_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/amenities/${amenity_id}`, {
      params,
    });
    return response.data.amenity; // Single amenity object
  } catch (error) {
    console.error(
      '❌ Error fetching amenity by ID:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const patchAmenity = async (amenity_id, body = {}) => {
  try {
    const response = await beanRemoteAPI.patch(
      `/amenities/${amenity_id}`,
      body
    );
    return response.data.amenity; // Updated amenity object
  } catch (error) {
    console.error(
      '❌ Error updating amenity:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteAmenity = async (amenity_id) => {
  try {
    await beanRemoteAPI.delete(`/amenities/${amenity_id}`);
    return true; // No content returned (204 status)
  } catch (error) {
    console.error(
      '❌ Error deleting amenity:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// --- Reports Endpoints ---
export const getReports = async (params = {}) => {
  try {
    const response = await beanRemoteAPI.get('/reports', { params });
    return response.data.reports; // Array of report objects
  } catch (error) {
    console.error(
      '❌ Error fetching reports:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postReport = async (body = {}) => {
  try {
    const response = await beanRemoteAPI.post('/reports', body);
    return response.data.report; // Newly created report object
  } catch (error) {
    console.error(
      '❌ Error creating report:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getReportById = async (report_id, params = {}) => {
  try {
    const response = await beanRemoteAPI.get(`/reports/${report_id}`, {
      params,
    });
    return response.data.report; // Single report object
  } catch (error) {
    console.error(
      '❌ Error fetching report by ID:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const patchReport = async (report_id, body = {}) => {
  try {
    const response = await beanRemoteAPI.patch(`/reports/${report_id}`, body);
    return response.data.report; // Updated report object
  } catch (error) {
    console.error(
      '❌ Error updating report:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteReport = async (report_id) => {
  try {
    await beanRemoteAPI.delete(`/reports/${report_id}`);
    return true; // No content returned (204 status)
  } catch (error) {
    console.error(
      '❌ Error deleting report:',
      error.response?.data || error.message
    );
    throw error;
  }
};
