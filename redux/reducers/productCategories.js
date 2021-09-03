import * as actions from '../actionTypes';

const initialState = {
  rawProductCategories: [],
  flattenedCategories: []
}

const productCategories = (state = {...initialState}, action) => {
    switch (action.type) {
        case actions.FETCH_SET_PRODUCT_CATEGORIES:
          return {
            ...state, 
            rawProductCategories: action.productCatogories,
            flattenedCategories: action.flattenedCategories
          };
        case actions.RESET_PRODUCT_CATEGORIES:
            return {...initialState};
        default:
            return {...state};
    }
};

export default productCategories;