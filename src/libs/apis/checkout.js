import request from '../bases/request';
const prefix = '/api';

export const checkoutPublic = async (data) =>
  request({
    url: `${prefix}/don-hang/create`,
    method: 'POST',
    data,
  });
export const checkoutPrivate = async (data) =>
  request({
    url: `${prefix}/auth/don-hang`,
    method: 'POST',
    data,
    tokenClient: true,
  });
export const historyCheckout = async () =>
  request({
    url: `${prefix}/don-hang/lich-su-don-hang`,
    method: 'GET',
    tokenClient: true,
    emailClient: true,
  });
export async function historyCheckoutPrivate() {
  return request({
    url: `${prefix}/auth/lich-su-don-hang`,
    method: 'GET',
    tokenClient: true,
  });
}
