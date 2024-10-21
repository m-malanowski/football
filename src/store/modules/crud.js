import api from '@/api/index.js';

const state = () => ({
  users: [],
  totalUsers: 0,
  perPage: 6,
  currentPage: 1,
  loading: false,
  error: null,
  user: null,
});

const mutations = {
  SET_USERS(state, payload) {
    state.users = payload;
  },
  SET_TOTAL_USERS(state, payload) {
    state.totalUsers = payload;
  },
  SET_CURRENT_PAGE(state, payload) {
    state.currentPage = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  // ADD_USER(state, user) {
  //   state.users.push(user);
  // },
  // REMOVE_USER(state, userId) {
  //   state.users = state.users.filter(user => user.id !== userId);
  // },
};

const actions = {
  async fetchUsers({ commit }, page = 1) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const response = await api.getUsers(page);
      commit('SET_USERS', response.data.data);
      commit('SET_TOTAL_USERS', response.data.total);
      commit('SET_CURRENT_PAGE', response.data.page);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch users.');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchUser({ commit }, id) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const response = await api.getUser(id);
      commit('SET_USER', response.data.data);
      return response.data.data;
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch user.');
      console.error(error);
      return null;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async createUser({ commit, dispatch }, userData) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const response = await api.createUser(userData);
      console.log('User created:', response.data);
      dispatch('fetchUsers', 1);
    } catch (error) {
      commit('SET_ERROR', 'Failed to create user.');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async updateUser({ commit, dispatch, state }, { id, userData }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const response = await api.updateUser(id, userData);
      console.log('User updated:', response.data);
      dispatch('fetchUsers', state.currentPage);
    } catch (error) {
      commit('SET_ERROR', 'Failed to update user.');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async deleteUser({ commit, dispatch, state }, id) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      await api.deleteUser(id);
      console.log('User deleted:', id);
      dispatch('fetchUsers', state.currentPage);
    } catch (error) {
      commit('SET_ERROR', 'Failed to delete user.');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

const getters = {
  allUsers: (state) => state.users,
  totalUsers: (state) => state.totalUsers,
  usersPerPage: (state) => state.perPage,
  currentPage: (state) => state.currentPage,
  isLoading: (state) => state.loading,
  errorMessage: (state) => state.error,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
