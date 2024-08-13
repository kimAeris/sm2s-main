import { createRouter, createWebHistory } from 'vue-router';
const LoginView = () => import('@/views/user/LoginView.vue');
const CommonCodeView = () => import('@/views/system/CommonCodeView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/system/commonCode',
      name: 'CommonCode',
      component: CommonCodeView
    }
  ]
});

export default router;
