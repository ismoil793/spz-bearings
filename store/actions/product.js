import {
  API_getProduct,
} from "../../api-spz/requests/product";
import * as action from "../types/actionTypes";
import logRequestError from "./errorHandler";

export const fetchProducts = (subCategoryID) => async (dispatch) => {
  await API_getProduct(subCategoryID)
    .then((res) => {
      dispatch({
        type: action.FETCH_PRODUCTS,
        payload: res.data.data,
      });
    })
    .catch((e) => logRequestError(e));
};