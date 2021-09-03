import * as actions from '../actionTypes';

const initialState = {
    user: {}
}

const userInfo = (state = {...initialState}, action) => {
    switch (action.type) {
        case actions.FETCH_SET_USER_INFO:
          return {
            ...state, 
            user: action.payload
          };
        case actions.REMOVE_USER_INFO:
          return {
            ...state,
            user: initialState.user
          }
        default:
            return {...state};
    }
};

export default userInfo;