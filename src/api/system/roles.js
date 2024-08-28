import { roles } from '..';
import { isFailed } from '@/utils/common';

export const getRoles = async (params) => {
  try {
    const res = await roles.get('', { params });

    if (isFailed(res)) throw res.data.header.message;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const saveRoles = async (params) => {
  try {
    const res = await roles.post(`/status/1`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRoles = async (params) => {
  try {
    const res = await roles.post(`/status/3`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};
