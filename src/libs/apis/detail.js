import request from '../bases/request';
const prefix = '/api';

export const getProductDetail = async (id) =>
  request({
    url: `${prefix}/detail/product/${id}`,
    method: 'GET',
  });

export const RateProductPublic = async (id, data) =>
  request({
    url: `${prefix}/detail/danh-gia/${id}`,
    method: 'POST',
    data,
  });
export const ListRate = async (id, data) =>
  request({
    url: `${prefix}/detail/danh-gia/data/${id}`,
    method: 'GET',
    data,
  });
export const RateProductAuth = async (id, data) =>
  request({
    url: `${prefix}/auth/danh-gia/${id}`,
    method: 'POST',
    data,
    tokenClient: true,
  });
