import { common } from '.';

export const login = async (businessNumber, userId, userPwd) => {
  try {
    const res = await common.post(`/login`, {
      businessNumber,
      userId,
      userPwd
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
