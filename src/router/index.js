import { createRouter, createWebHashHistory } from 'vue-router';
const LoginView = () => import('@/views/user/LoginView.vue');
const ProjectMgmtView = () => import('@/views/system/ProjectMgmtView.vue');
const UserMgmtView = () => import('@/views/system/UserMgmtView.vue');
const MenuMgmtView = () => import('@/views/system/MenuMgmtView.vue');
const RoleMgmtView = () => import('@/views/system/RoleMgmtView.vue');
const RoleMenuMgmtView = () => import('@/views/system/RoleMenuMgmtView.vue');
const IframeView = () => import('@/views/common/IframeView.vue');

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/system/projects',
      name: 'ProjectMgmt',
      component: ProjectMgmtView
    },
    {
      path: '/system/users',
      name: 'UserMgmt',
      component: UserMgmtView
    },
    {
      path: '/system/menus',
      name: 'MenuMgmt',
      component: MenuMgmtView
    },
    {
      path: '/system/roles',
      name: 'RoleMgmt',
      component: RoleMgmtView
    },
    {
      path: '/system/roleMenus',
      name: 'RoleMenuMgmt',
      component: RoleMenuMgmtView
    },
    {
      path: '/info/:type',
      name: 'ClientMgmt',
      component: IframeView,
      meta: {
        admin: true
      },
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
