import * as actions from '../actionTypes';

const initialState = {
    cart: {}
};

const productCategories = (state = { ...initialState }, action) => {
    switch (action.type) {
        case actions.FETCH_CART:
            return { ...state, cart: action.payload };

        case actions.ADD_TO_CART:
            return { ...state, cart: action.payload };

        case actions.DELETE_FROM_CART:
            return { ...state, cart: action.payload };

        default:
            return state;
    }
};

export default productCategories;