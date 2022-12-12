import request from '../bases/request';
const prefix = '/api';

export const checkoutPublic = async (data) =>
  request({
    url: `${prefix}/bill`,
    method: 'POST',
    data,
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
