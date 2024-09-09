import { companyProjects } from '..';
import { isFailed } from '@/utils/common';

export const retrieveCompanyProjects = async (params) => {
  try {
    const res = await companyProjects.get('', { params });

    if (isFailed(res)) throw res.data.header.message;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const updateCompanyProjects = async (params) => {
  try {
    const res = await companyProjects.post(`/status/1`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};
