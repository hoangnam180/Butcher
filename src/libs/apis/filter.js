import request from '../bases/request';
const prefix = '/api';

export const getDataFilter = async () =>
  request({
    url: `${prefix}/filter/data`,
    method: 'GET',
  });
export const searchFilter = async (params) =>
  request({
    url: `${prefix}/filter/san-pham`,
    method: 'GET',
    params,
  });
