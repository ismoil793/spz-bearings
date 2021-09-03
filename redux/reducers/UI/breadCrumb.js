import * as actions from '../../actionTypes';

const initialState = {
  productCategory: {
    id: null,
  }
}

const breadCrumb = (state = {...initialState}, action) => {
    switch (action.type) {
        case actions.SET_PRODUCT_CATEGORY:
            return {...state, productCategory: action.productCategory};
        case actions.RESET_BREADCRUMB_DATA:
            return {...initialState};
        default:
            return {...state};
    }
};

export default breadCrumb;