import { projects } from '..';

export const getProjects = async (params) => {
  try {
    const res = await projects.get('', params);

    return res.data;
  } catch (error) {
    throw error;
  }
};
