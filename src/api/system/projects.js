import { projects } from '..';
import { isFailed } from '@/utils/common';

export const getProjects = async (params) => {
  try {
    const res = await projects.get('', { params });

    if (isFailed(res)) throw res;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const saveProjects = async (params) => {
  try {
    const res = await projects.post(`/status/1`, params);

    if (isFailed(res)) throw res;
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProjects = async (params) => {
  try {
    const res = await projects.post(`/status/3`, params);

    if (isFailed(res)) throw res;
    return res.data;
  } catch (error) {
    throw error;
  }
};
