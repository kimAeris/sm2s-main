import { projects } from '..';

export const getProjects = async (params) => {
  try {
    const res = await projects.get('', params);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const saveProjects = async (params) => {
  try {
    const res = await projects.post(`/status/1`, params);

    return res.data;
  } catch (error) {
    throw error;
  }
};
