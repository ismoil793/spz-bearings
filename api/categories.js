import { httpGet } from "./index";

export const fetchProductCategories = (params) => httpGet({
  url: '/api/categories', params
});

