import * as acions from "../../actionTypes";

export const setProductCategory = (catogory) => ({
  type: acions.SET_PRODUCT_CATEGORY,
  productCategory: catogory 
});

export const resetBreadCrumb = () => ({
  type: acions.RESET_BREADCRUMB_DATA
});