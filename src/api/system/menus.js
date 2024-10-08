import { menus } from '..';
import { isFailed } from '@/utils/common';

export const retrieveMenus = async (params) => {
  try {
    const res = await menus.get('', { params });

    if (isFailed(res)) throw res.data.header.message;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const updateMenus = async (params) => {
  try {
    const res = await menus.post(`/status/1`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMenus = async (params) => {
  try {
    const res = await menus.post(`/status/3`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};
