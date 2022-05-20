import axios from '@/api/axios';

const register = (body) => {
  return axios.post('/users', { user: body });
};

const login = (body) => {
  return axios.post('/users/login', { user: body });
};

const getCurrentUser = () => {
  return axios.get('/user');
};

export default {
  register,
  login,
  getCurrentUser,
};
