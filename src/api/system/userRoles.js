import { userRoles } from '..';
import { isFailed } from '@/utils/common';

export const getUserRoles = async (params) => {
  try {
    const res = await userRoles.get('', { params });

    if (isFailed(res)) throw res;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const saveUserRoles = async (params) => {
  try {
    const res = await userRoles.post(`/status/1`, params);

    if (isFailed(res)) throw res;
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserRoles = async (params) => {
  try {
    const res = await userRoles.post(`/status/3`, params);

    if (isFailed(res)) throw res;
    return res.data;
  } catch (error) {
    throw error;
  }
};
