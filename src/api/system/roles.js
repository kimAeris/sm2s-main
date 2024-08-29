import { roles } from '..';
import { isFailed } from '@/utils/common';

export const retrieveRoles = async (params) => {
  try {
    const res = await roles.get('', { params });

    if (isFailed(res)) throw res.data.header.message;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const updateRoles = async (params) => {
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
