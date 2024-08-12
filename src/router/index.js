import { createRouter, createWebHistory } from 'vue-router';
const LoginView = () => import('@/views/user/LoginView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    }
  ]
});

export default router;
