import { createRouter, createWebHistory } from 'vue-router';
const LoginView = () => import('@/views/user/LoginView.vue');
const CommonCodeView = () => import('@/views/system/CommonCodeView.vue');
const IframeView = () => import('@/views/common/IframeView.vue');

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
    },
    {
      path: '/info/client',
      name: 'ClientMgmt',
      component: IframeView,
      props: {
        url: `http://221.151.122.208:11005/?Pro=%EA%B3%B5%EB%B0%A9#BI_001`
      }
    },
    {
      path: '/info/product',
      name: 'ProductMgmt',
      component: IframeView,
      props: {
        url: `http://221.151.122.208:11005/?Pro=%EA%B3%B5%EB%B0%A9#BI_002`
      }
    }
  ]
});

export default router;
