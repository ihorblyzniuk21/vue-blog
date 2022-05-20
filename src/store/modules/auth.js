import authApi from '@/api/auth';
import { setItem } from '@/helpers/PersistanceStarage';

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailed: '[auth] registerFailed',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailed: '[auth] loginFailed',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailed: '[auth] getCurrentUserFailed',
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
};

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
};

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailed](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
};

const actions = {
  [actionTypes.register](context, body) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart);
      authApi
        .register(body)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.registerFailed,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.login](context, body) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart);
      authApi
        .login(body)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.registerFailed,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          );
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailed);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
