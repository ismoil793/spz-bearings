import * as actions from "../types/actionTypes";

const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.FETCH_CATEGORIES:
      return { ...state, categories: action.payload };

    default:
      return state;
  }
};

export default categoryReducer;
