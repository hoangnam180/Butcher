import request from "../bases/request";
const prefix = "/v1";

export const createProductCustomizeApi = async (context, data) =>
  request({
    url: `${prefix}/customize`,
    method: "POST",
    data,
    context: context
  });

export const getListProductCustomizeApi = async (context, params) =>
  request({
    url: `${prefix}/custom-product`,
    method: "GET",
    params,
    context: context
  });

export const getListProductCustomizeClinetApi = async params =>
  request({
    url: `${prefix}/custom-product`,
    method: "GET",
    params,
    tokenClient: true
  });
