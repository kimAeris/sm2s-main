import { adminUser } from '.';

export const getUserList = async (params) => {
  try {
    const res = await adminUser.get('', { params });

    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const saveUser = async (params) => {
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

export const passwordChange = async (params) => {
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
