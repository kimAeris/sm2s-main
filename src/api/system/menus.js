import { menus } from '..';

export const getMenus = async (params) => {
  try {
    const res = await menus.get('', { params });

    if (res.data.header.code !== 200) throw res;

    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};
