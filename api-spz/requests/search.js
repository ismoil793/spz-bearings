import { httpGet } from "../index";

export const API_searchProducts = (params = {}) =>
    httpGet({
       url: `/api/get-products`,
       params,
    });