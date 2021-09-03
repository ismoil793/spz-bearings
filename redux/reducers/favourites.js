import * as actions from '../actionTypes';

const initialState = {
    favourites: {}
};

const favourites = (state = { ...initialState }, action) => {
    switch (action.type) {
        case actions.FETCH_FAVOURITES:
            return { ...state, favourites: action.payload };

        default:
            return state;
    }
};

export default favourites;