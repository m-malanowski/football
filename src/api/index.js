import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

const api = {
  /**
   * Fetches a list of users with pagination.
   *
   * @param {number} [page=1] - The page number to fetch.
   * @returns {Promise<Object>} - A promise that resolves with the list of users.
   */
  getUsers(page = 1) {
    return apiClient.get(`/users?page=${page}`);
  },

  /**
   * Fetches details of a single user by ID.
   *
   * @param {number|string} id - The ID of the user to fetch.
   * @returns {Promise<Object>} - A promise that resolves with the user's details.
   */
  getUser(id) {
    return apiClient.get(`/users/${id}`);
  },

  /**
   * Creates a new user.
   *
   * @param {Object} userData - The data for the new user.
   * @param {string} userData.first_name - The user's first name.
   * @param {string} userData.last_name - The user's last name.
   * @param {string} [userData.avatar] - The user's avatar URL.
   * @returns {Promise<Object>} - A promise that resolves with the created user's details.
   */
  createUser(userData) {
    return apiClient.post('/users', userData);
  },

  /**
   * Updates an existing user.
   *
   * @param {number|string} id - The ID of the user to update.
   * @param {Object} userData - The updated data for the user.
   * @param {string} userData.first_name - The user's first name.
   * @param {string} userData.last_name - The user's last name.
   * @param {string} [userData.avatar] - The user's avatar URL.
   * @returns {Promise<Object>} - A promise that resolves with the updated user's details.
   */
  updateUser(id, userData) {
    return apiClient.put(`/users/${id}`, userData);
  },

  /**
   * Deletes a user by ID.
   *
   * @param {number|string} id - The ID of the user to delete.
   * @returns {Promise<void>} - A promise that resolves when the user is deleted.
   */
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`);
  },
};

export default api;
