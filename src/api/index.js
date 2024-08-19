import axios from 'axios';

const create = (baseURL) => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/portal${baseURL}`,
    withCredentials: true
  });

  return instance;
};

export const common = create('/');
