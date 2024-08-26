import { useUser } from '@/stores/useUser';
import axios from 'axios';

const create = (baseURL) => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_APP}/portal${baseURL}`,
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

  return instance;
};

export const common = create('/');
export const adminUser = create('/admin/users');
export const projects = create('/admin/projects');
export const menus = create('/admin/menus');
