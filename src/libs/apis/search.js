import request from '../bases/request';
const prefix = '/api';
export const getSearch = async (params) => {
  return request({
    url: `${prefix}/search/keyword`,
    method: 'GET',
    params,
  });
};
