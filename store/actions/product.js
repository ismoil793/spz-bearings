import {
   API_getProduct,
} from "../../api-spz/requests/product";
import * as action from "../types/actionTypes";
import logRequestError from "./errorHandler";

export const fetchProducts = (subCategoryID) => async (dispatch) => {
   let products = [];

   await API_getProduct(subCategoryID, {per_page: 1000})
       .then(async (res) => {
          const {current_page, last_page, data} = res.data || {};
          products = Array.isArray(data) ? [...data] : products;

          if (current_page < last_page) {
             await API_getProduct(subCategoryID, {page: current_page + 1}).then(
                 (res) => {
                    const {data} = res.data || {};
                    products = Array.isArray(data) ? [...products, ...data] : products;
                    dispatch({
                       type: action.FETCH_PRODUCTS,
                       payload: products,
                    });
                 }
             );
          } else {
              dispatch({
                type: action.FETCH_PRODUCTS,
                payload: products,
              });
            }
       })
       .catch((e) => logRequestError(e));
};
