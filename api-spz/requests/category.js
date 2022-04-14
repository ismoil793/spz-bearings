import { httpGet } from "../index";

export const API_getCategories = (params = {}) =>
  httpGet({
    url: "/api/get-categories",
    params,
  });