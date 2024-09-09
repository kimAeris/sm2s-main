import { useUser } from '@/stores/useUser';
import axios from 'axios';

const API = import.meta.env.VITE_APP;

const create = (baseURL) => {
  const instance = axios.create({
    baseURL: `${API}/portal${baseURL}`,
    withCredentials: true
  });

  instance.interceptors.request.use(async (req) => {
    try {
      const userStore = useUser();
      const accessToken = userStore.accessToken;

      // 헤더에 토큰 추가
      if (accessToken) {
        req.headers.Authorization = accessToken;
      }
    } catch (error) {
      console.error(error);
    }
    return req;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      // 토큰 만료시 재발급
      if (error.response.status === 401) {
        try {
          const {
            data: {
              body: { Authorization }
            }
          } = await axios.post(`${API}/portal/reissue`, {});

          if (Authorization) {
            const userStore = useUser();
            error.config.headers.Authorization = userStore.accessToken =
              Authorization;
            return await axios.request(error.config);
          }
        } catch (error) {
          if (import.meta.env.DEV) console.error(error);
        }
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
