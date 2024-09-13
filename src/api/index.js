import router from '@/router';
import { useFeedback } from '@/stores/useFeedback';
import { useMenu } from '@/stores/useMenu';
import { useUser } from '@/stores/useUser';
import axios from 'axios';

const API = import.meta.env.VITE_APP;

const getFeedback = (type, title, message, cancelText, confirmText) => {
  const { openFeedback } = useFeedback();

  openFeedback(type, title, message, cancelText, confirmText);
};

const kick = () => {
  const menuStore = useMenu();
  const userStore = useUser();

  if (userStore.user.user_id) {
    axios.post(`${API}/logout`, {
      headers: {
        Authorization: userStore.accessToken
      },
      withCredentials: true
    });
  }

  userStore.resetUser();
  menuStore.resetMenu();

  router.push({ name: 'Login' });
};

const create = (baseURL) => {
  const instance = axios.create({
    baseURL: `${API}/portal${baseURL}`,
    withCredentials: true
  });

  instance.interceptors.request.use(
    async (req) => {
      try {
        const userStore = useUser();
        const accessToken = userStore.accessToken;

        // 헤더에 토큰 추가
        if (accessToken) {
          req.headers.Authorization = accessToken;
        }

        return req;
      } catch (error) {
        if (import.meta.env.DEV) console.error(error);
      }
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const userStore = useUser();
      // 토큰 만료시 재발급
      if (error.response.status === 401) {
        try {
          const {
            data: {
              body: { Authorization }
            }
          } = await axios.post(`${API}/portal/reissue`, {
            refreshToken: userStore.refreshToken
          });

          if (Authorization) {
            error.config.headers.Authorization = userStore.accessToken =
              Authorization;
            return await axios.request(error.config);
          } else return Promise.reject(error);
        } catch (error) {
          if (import.meta.env.DEV) console.error(error);

          kick();
          getFeedback('error', 'ERROR', '접근 권한이 없습니다.', '', '확인');
          return Promise.reject(error);
        }
      }

      // 권한 없음
      else if (error.response.status === 403) {
        kick();
        getFeedback('error', 'ERROR', '접근 권한이 없습니다.', '', '확인');
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const common = create('/');

export const adminUser = create('/admin/users');
export const projects = create('/admin/projects');
export const menus = create('/admin/menus');
export const roles = create('/admin/roles');
export const roleMenus = create('/admin/role-menus');
export const userRoles = create('/admin/user-roles');
export const company = create('/admin/companys');
export const companyProjects = create('/admin/company-projects');
export const log = create('/admin/log');
