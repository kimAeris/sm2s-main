import { userRoles } from '..';
import { isFailed } from '@/utils/common';

export const retrieveUserRoles = async (params) => {
  try {
    const res = await userRoles.get('', { params });

    if (isFailed(res)) throw res.data.header.message;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const updateUserRoles = async (params) => {
  try {
    const res = await userRoles.post(`/status/1`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};
