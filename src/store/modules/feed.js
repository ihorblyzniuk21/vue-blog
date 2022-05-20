import feedApi from '@/api/feed';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getFeedStart: '[feed] GetFeedStart',
  getFeedSuccess: '[feed] GetFeedSuccess',
  getFeedError: '[feed] GetFeedError',
};

export const actionTypes = {
  getFeed: '[feed] getFeed',
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
    state.error = null;
  },
  [mutationTypes.getFeedError](state) {
    state.isLoading = false;
    state.data = null;
  },
};

const actions = {
  [actionTypes.getFeed](context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getFeedStart);
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          context.commit(mutationTypes.getFeedSuccess, response.data);
          resolve(response.data);
        })
        .catch(() => {
          context.commit(mutationTypes.getFeedError);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
