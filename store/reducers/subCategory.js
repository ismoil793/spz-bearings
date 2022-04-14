import * as actions from "../types/actionTypes";

const initialState = {
  subCategories: [],
};

const subCategoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.FETCH_SUB_CATEGORIES:
      return { ...state, subCategories: action.payload };

    default:
      return state;
  }
};

export default subCategoryReducer;
