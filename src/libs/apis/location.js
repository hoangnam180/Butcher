import request2 from '../bases/request2';
const prefix = 'https://provinces.open-api.vn/api';
export const getProvinces = () => {
  return request2({
    url: `${prefix}/`,
    method: 'GET',
  });
};
export const getProvinceDetail = (id) => {
  return request2({
    url: `${prefix}/p/${id}`,
    method: 'GET',
  });
};
export const getDistricts = async (provinceId) => {
  return request2({
    url: `${prefix}/p/${provinceId}?depth=2`,
    method: 'GET',
  });
};
export const getDistrictDetail = async (districtId) => {
  return request2({
    url: `${prefix}/d/${districtId}`,
    method: 'GET',
  });
};
export const getWards = async (districtId) => {
  return request2({
    url: `${prefix}/d/${districtId}?depth=2`,
    method: 'GET',
  });
};
export const getWardDetail = async (wardId) => {
  return request2({
    url: `${prefix}/w/${wardId}`,
    method: 'GET',
  });
};
export const getSearch = async (params) =>
  request2({
    url: `${prefix}/d/search/?q=${params}`,
    method: 'GET',
  });
