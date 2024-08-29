import { adminUser } from '.';

export const retrieveUser = async (params) => {
  try {
    const res = await adminUser.get('', { params });

    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (params) => {
  try {
    const res = await adminUser.post('/status/1', params);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (params) => {
  try {
    const res = await adminUser.post('/status/3', params);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (params) => {
  try {
    const res = await adminUser.post(`/password/status/1`, params);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const initPassword = async (params) => {
  try {
    const res = await adminUser.post(`/init/status/1`, params);

    return res.data;
  } catch (error) {
    throw error;
  }
};
