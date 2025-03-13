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
export const getApi = (params = {}) => {
  return beanRemoteAPI
    .get('/', { params })
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        '❌ Error fetching API root:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Users Endpoints ---
export const getUsers = (params = {}) => {
  return beanRemoteAPI
    .get('/users', { params })
    .then((response) => response.data.users)
    .catch((error) => {
      console.error(
        '❌ Error fetching users:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const postUser = (body = {}) => {
  return beanRemoteAPI
    .post('/users', body)
    .then((response) => response.data.user)
    .catch((error) => {
      console.error(
        '❌ Error creating user:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const getUserById = (user_id, params = {}) => {
  return beanRemoteAPI
    .get(`/users/${user_id}`, { params })
    .then((response) => response.data.user)
    .catch((error) => {
      console.error(
        '❌ Error fetching user by ID:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const patchUserById = (user_id, body = {}) => {
  return beanRemoteAPI
    .patch(`/users/${user_id}`, body)
    .then((response) => response.data.user)
    .catch((error) => {
      console.error(
        '❌ Error updating user:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const deleteUserById = (user_id) => {
  return beanRemoteAPI
    .delete(`/users/${user_id}`)
    .then((response) => response.data.msg)
    .catch((error) => {
      console.error(
        '❌ Error deleting user:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const getUserByFirebaseUid = (params = {}) => {
  return beanRemoteAPI
    .get('/users/firebase/data', { params })
    .then((response) => response.data.user)
    .catch((error) => {
      console.error(
        '❌ Error fetching user by Firebase UID:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const getUserAmenities = (user_id, body = {}) => {
  return beanRemoteAPI
    .get(`/users/${user_id}/amenities`, body)
    .then((response) => response.data.userAmenities)
    .catch((error) => {
      console.error(
        '❌ Error fetching user amenities:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const patchUserAmenities = (user_id, body = {}) => {
  return beanRemoteAPI
    .patch(`/users/${user_id}/amenities`, body)
    .then((response) => response.data.userAmenities)
    .catch((error) => {
      console.error(
        '❌ Error updating user amenities:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Favourites ---
export const getUserFavourites = (user_id, params = {}) => {
  return beanRemoteAPI
    .get(`/users/${user_id}/favourites`, { params })
    .then((response) => response.data.favourites)
    .catch((error) => {
      console.error(
        '❌ Error fetching user favourites:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const postUserFavourite = (user_id, body = {}) => {
  return beanRemoteAPI
    .post(`/users/${user_id}/favourites`, body)
    .then((response) => response.data.favourite)
    .catch((error) => {
      console.error(
        '❌ Error adding favourite cafe:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const deleteUserFavourite = (user_id, cafe_id) => {
  return beanRemoteAPI
    .delete(`/users/${user_id}/favourites/${cafe_id}`)
    .then((response) => response.data.msg)
    .catch((error) => {
      console.error(
        '❌ Error removing favourite cafe:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Cafes Endpoints --

// --- Get All Cafés (with optional filtering by amenity) ---
export const getCafes = (params = {}) => {
  return beanRemoteAPI
    .get('/cafes', { params })
    .then((response) => response.data.cafes)
    .catch((error) => {
      console.error(
        '❌ Error fetching cafes:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Get a Single Café by ID ---
export const getCafeById = (cafe_id, params = {}) => {
  return beanRemoteAPI
    .get(`/cafes/${cafe_id}`, { params })
    .then((response) => response.data.cafe)
    .catch((error) => {
      console.error(
        '❌ Error fetching cafe by ID:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Get Cafés by Amenity ---
export const getCafesByAmenity = (amenity) => {
  return beanRemoteAPI
    .get('/cafes', { params: { amenity } })
    .then((response) => response.data.cafes)
    .catch((error) => {
      console.error(
        '❌ Error fetching cafes by amenity:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Get Café Amenities by Café ID ---
export const getAmenitiesByCafeId = (cafe_id) => {
  return beanRemoteAPI
    .get(`/cafes/${cafe_id}/amenities`)
    .then((response) => response.data.amenities)
    .catch((error) => {
      console.error(
        '❌ Error fetching cafe amenities:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Add a New Café (Protected, Requires Authentication) ---
export const postCafe = (cafeData) => {
  return beanRemoteAPI
    .post('/cafes', cafeData)
    .then((response) => response.data.cafe)
    .catch((error) => {
      console.error(
        '❌ Error creating cafe:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Get Cafés in a Visible Map Area ---
export const getCafesByCoordinates = (params = {}) => {
  return beanRemoteAPI
    .get('/cafes/map/visible', { params })
    .then((response) => response.data.cafes)
    .catch((error) => {
      console.error(
        '❌ Error fetching cafes by coordinates:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Get Cafés Within a Specified Radius ---
export const getCafesByRadius = (params = {}) => {
  return beanRemoteAPI
    .get('/cafes/map/radius', { params })
    .then((response) => response.data.cafes)
    .catch((error) => {
      console.error(
        '❌ Error fetching cafes by radius:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Get All Reviews for a Café ---
export const getReviewsByCafeId = (cafe_id, params = {}) => {
  return beanRemoteAPI
    .get(`/cafes/${cafe_id}/reviews`, { params })
    .then((response) => response.data.reviews)
    .catch((error) => {
      console.error(
        '❌ Error fetching reviews for cafe:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Add a Review for a Café (Requires Authentication) ---
export const postReviewForCafe = (cafe_id, reviewData) => {
  return beanRemoteAPI
    .post(`/cafes/${cafe_id}/reviews`, reviewData)
    .then((response) => response.data.review)
    .catch((error) => {
      console.error(
        '❌ Error adding review:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Reviews ---
export const getUserReviews = (user_id, params = {}) => {
  return beanRemoteAPI
    .get(`/users/${user_id}/reviews`, { params })
    .then((response) => response.data.reviews)
    .catch((error) => {
      console.error(
        '❌ Error fetching user reviews:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const deleteUserReview = (user_id, review_id) => {
  return beanRemoteAPI
    .delete(`/users/${user_id}/reviews/${review_id}`)
    .then(() => true) // No content returned (204 status)
    .catch((error) => {
      console.error(
        '❌ Error deleting user review:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const getReviewById = (review_id, params = {}) => {
  return beanRemoteAPI
    .get(`/reviews/${review_id}`, { params })
    .then((response) => response.data.reviews)
    .catch((error) => {
      console.error(
        '❌ Error fetching review by ID:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Votes ---
export const getVoteCount = (review_id, params = {}) => {
  return beanRemoteAPI
    .get(`/reviews/${review_id}/votes`, { params })
    .then((response) => response.data.count)
    .catch((error) => {
      console.error(
        '❌ Error fetching vote count:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Visits ---
export const getVisits = (params = {}) => {
  return beanRemoteAPI
    .get('/visits', { params })
    .then((response) => response.data.visits)
    .catch((error) => {
      console.error(
        '❌ Error fetching visits:',
        error.response?.data || error.message
      );
      throw error;
    });
};

// --- Reports ---
export const getReports = (params = {}) => {
  return beanRemoteAPI
    .get('/reports', { params })
    .then((response) => response.data.reports)
    .catch((error) => {
      console.error(
        '❌ Error fetching reports:',
        error.response?.data || error.message
      );
      throw error;
    });
};

export const deleteReport = (report_id) => {
  return beanRemoteAPI
    .delete(`/reports/${report_id}`)
    .then(() => true)
    .catch((error) => {
      console.error(
        '❌ Error deleting report:',
        error.response?.data || error.message
      );
      throw error;
    });
};
