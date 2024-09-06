import { createRouter, createWebHashHistory } from 'vue-router';
import LoginView from '@/views/user/LoginView.vue';
import ProjectMgmtView from '@/views/system/ProjectMgmtView.vue';
import UserMgmtView from '@/views/system/UserMgmtView.vue';
import MenuMgmtView from '@/views/system/MenuMgmtView.vue';
import RoleMgmtView from '@/views/system/RoleMgmtView.vue';
import RoleMenuMgmtView from '@/views/system/RoleMenuMgmtView.vue';
import UserRolesMgmtView from '@/views/system/UserRolesMgmtView.vue';
import CompanyMgmtView from '@/views/system/CompanyMgmtView.vue';
import LogMgmtView from '@/views/system/LogMgmtView.vue';
import IframeView from '@/views/common/IframeView.vue';
import DevelopingView from '@/views/common/DevelopingView.vue';

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
      path: '/system/userRoles',
      name: 'UserRolesMgmt',
      component: UserRolesMgmtView
    },
    {
      path: '/system/log',
      name: 'LogMgmt',
      component: LogMgmtView
    },
    {
      path: '/system/companys',
      name: 'CompanyMgmt',
      component: CompanyMgmtView
    },
    {
      path: '/view',
      name: 'IframeView',
      component: IframeView,
      props: ({ query }) => ({
        scrId: query.scrId
      })
    },
    {
      path: '/developing',
      component: DevelopingView
    }
  ]
});

export default router;
