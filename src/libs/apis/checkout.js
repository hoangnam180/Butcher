import request from '../bases/request';
const prefix = '/api';

export const checkoutPublic = async (data) =>
  request({
    url: `${prefix}/bill`,
    method: 'POST',
    data,
  });
export const historyCheckout = async (params) =>
  request({
    url: `${prefix}/history-bill`,
    method: 'GET',
    params,
  });
export const historyCheckoutById = async (id) =>
  request({
    url: `${prefix}/history-bill/${id}`,
    method: 'GET',
  });
export async function historyCheckoutPrivate() {
  return request({
    url: `${prefix}/auth/lich-su-don-hang`,
    method: 'GET',
    tokenClient: true,
  });
}
