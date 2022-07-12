import Axios from "axios";
import {
   API_getProduct,
} from "../../api-spz/requests/product";
import * as action from "../types/actionTypes";
import logRequestError from "./errorHandler";

export const fetchProducts = (subCategoryID) => async (dispatch) => {
   let products = [];

   await API_getProduct(subCategoryID, { per_page: 1000 })
       .then((res) => {
          const { current_page, last_page, data } = res.data || {};
          products = Array.isArray(data) ? [...data] : products;
          let currentPage = current_page;

          dispatch({
             type: action.FETCH_PRODUCTS,
             payload: products,
          });

          if (current_page < last_page) {
             const requests = [];
             while (currentPage < last_page) {
                currentPage += 1;

                requests.push(API_getProduct(subCategoryID, { page: currentPage }));
             }

             Axios.all(requests)
                 .then((responses) => {
                    responses.forEach((res) => {
                       products = [...products, ...res.data.data];
                    });
                 })
                 .then(() => {
                    dispatch({
                       type: action.FETCH_PRODUCTS,
                       payload: products,
                    });
                 });
          }
       })
       .catch((e) => logRequestError(e));
};
