import request from "../bases/request";

export const uploadApi = async data =>
  request({
    url: "/core/upload",
    method: "POST",
    data,
    tokenClient: true
  });

export const confirmApi = async link =>
  request({
    url: `/core/${link}`,
    method: "GET",
    tokenClient: true
  })