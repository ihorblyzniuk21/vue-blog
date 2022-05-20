import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/views/RegisterView';
import LoginView from '@/views/LoginView';
import GlobalFeedView from '@/views/GlobalFeedView';

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeedView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
