import {
  API_getSubCategory,
} from "../../api-spz/requests/subcategory";
import * as action from "../types/actionTypes";
import logRequestError from "./errorHandler";

export const fetchSubCategory = (categoryID) => async (dispatch) => {
  await API_getSubCategory(categoryID)
    .then((res) => {
      dispatch({
        type: action.FETCH_SUB_CATEGORIES,
        payload: res.data.data,
      });
    })
    .catch((e) => logRequestError(e));
};
