import { httpGet } from "../index";

export const API_getSubCategory = (id, params = {}) =>
  httpGet({
    url: `/api/get-sub-categories/${id}`,
    params,
  });