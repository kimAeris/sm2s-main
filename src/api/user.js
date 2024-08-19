import { adminUser } from '.';

export const passwordChanged = async (params) => {
  try {
    const res = await adminUser.post(`/password/status/1`, params);

    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
