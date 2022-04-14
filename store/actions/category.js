import {
  API_getCategories,
} from "../../api-spz/requests/category";
import * as action from "../types/actionTypes";
import logRequestError from "./errorHandler";

export const fetchAllCategories = () => async (dispatch) => {
  await API_getCategories()
    .then((res) => {
      dispatch({
        type: action.FETCH_CATEGORIES,
        payload: res.data.data,
      });
    })
    .catch((e) => logRequestError(e));
};