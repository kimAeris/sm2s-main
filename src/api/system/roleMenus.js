import { roleMenus } from '..';
import { isFailed } from '@/utils/common';

export const getRoleMenus = async (params) => {
  try {
    const res = await roleMenus.get('', { params });

    if (isFailed(res)) throw res;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const saveRoleMenus = async (params) => {
  try {
    const res = await roleMenus.post(`/status/1`, params);

    if (isFailed(res)) throw res;
    return res.data;
  } catch (error) {
    throw error;
  }
};
