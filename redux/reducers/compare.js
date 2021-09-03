import * as actions from '../actionTypes';

const initialState = {
    compare: ''
};

const compare = (state = { ...initialState }, action) => {
    switch (action.type) {
        case actions.FETCH_COMPARE:
            return { ...state, compare: action.payload };

        case actions.COMPARE_TOGGLE:
            return { ...state, compare: action.payload };

        default:
            return state;
    }
};

export default compare;