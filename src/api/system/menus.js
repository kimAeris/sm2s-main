import { menus } from '..';
import { isFailed } from '@/utils/common';

export const getMenus = async (params) => {
  try {
    const res = await menus.get('', { params });

    if (isFailed(res)) throw res;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const saveMenus = async (params) => {
  try {
    const res = await menus.post(`/status/1`, params);

    if (isFailed(res)) throw res;
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMenus = async (params) => {
  try {
    const res = await menus.post(`/status/3`, params);

    if (isFailed(res)) throw res;
    return res.data;
  } catch (error) {
    throw error;
  }
};
