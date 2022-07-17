import { httpGet } from "../index";

export const API_searchProducts = (params = {}, rest) =>
    httpGet({
       url: `/api/get-products`,
       params,
       ...rest
    });