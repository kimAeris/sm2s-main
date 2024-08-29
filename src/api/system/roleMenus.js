import { roleMenus } from '..';
import { isFailed } from '@/utils/common';

export const retrieveRoleMenus = async (params) => {
  try {
    const res = await roleMenus.get('', { params });

    if (isFailed(res)) throw res.data.header.message;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const updateRoleMenus = async (params) => {
  try {
    const res = await roleMenus.post(`/status/1`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};
