import { projects } from '..';
import { isFailed } from '@/utils/common';

export const retrieveProjects = async (params) => {
  try {
    const res = await projects.get('', { params });

    if (isFailed(res)) throw res.data.header.message;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const updateProjects = async (params) => {
  try {
    const res = await projects.post(`/status/1`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProjects = async (params) => {
  try {
    const res = await projects.post(`/status/3`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};
