import { httpGet } from "../index";

export const API_getProduct = (id, params = {}) =>
  httpGet({
    url: `/api/get-products/${id}`,
    params,
  });