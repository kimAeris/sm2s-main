import { log } from '..';
import { isFailed } from '@/utils/common';

export const getLoginLog = async (params) => {
  try {
    const res = await log.get('/login', { params });

    if (isFailed(res)) throw res.data.header.message;
    return res.data.body.list;
  } catch (error) {
    throw error;
  }
};
