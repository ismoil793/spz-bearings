import * as actions from "../types/actionTypes";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.FETCH_PRODUCTS:
      return { ...state, products: action.payload };

    default:
      return state;
  }
};

export default productReducer;
