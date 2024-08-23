import { menus } from '..';

export const getMenus = async (params) => {
  try {
    const res = await menus.get('', { params });

    return res.data;
  } catch (error) {
    throw error;
  }
};
