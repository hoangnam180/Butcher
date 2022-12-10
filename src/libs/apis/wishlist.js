import request from '../bases/request';
const prefix = '/api';
export const addWishListApi = async (data) =>
  request({
    url: `${prefix}/auth/yeu-thich`,
    method: 'POST',
    data,
    tokenClient: true,
  });
// get
export const getWishlistApi = async () =>
  request({
    url: `${prefix}/auth/yeu-thich`,
    method: 'GET',
    tokenClient: true,
  });
export const deleteWithList = async (id) =>
  request({
    url: `${prefix}/auth/yeu-thich/${id}`,
    method: 'DELETE',
    tokenClient: true,
  });
