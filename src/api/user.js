import { adminUser } from '.';

export const passwordChange = async (params) => {
  try {
    const res = await adminUser.post(`/password/status/1`, params);

    return res.data;
  } catch (error) {
    throw error;
  }
};
