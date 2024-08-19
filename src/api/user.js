import { adminUser } from '.';

export const passwordChange = async (params) => {
  try {
    const res = await adminUser.post(`/login`, params);

    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
