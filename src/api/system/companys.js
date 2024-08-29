import { company } from '..';
import { isFailed } from '@/utils/common';

export const retrieveCompanys = async (params) => {
  try {
    const res = await company.get('', { params });

    if (isFailed(res)) throw res.data.header.message;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};

export const updateCompanys = async (params) => {
  try {
    const res = await company.post(`/status/1`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCompanys = async (params) => {
  try {
    const res = await company.post(`/status/3`, params);

    if (isFailed(res)) throw res.data.header.message;
    return res.data;
  } catch (error) {
    throw error;
  }
};
