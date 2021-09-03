import * as actions from '../actionTypes';

const initialState = {
  features: []
}

const assemblyFeatures = (state = {...initialState}, action) => {
    switch (action.type) {
        case actions.FETCH_SET_ASSEMBLY_FEATURES:
          return {
            ...state, 
            features: action.assemblyFeatures,
          };
        case actions.RESET_ASSEMBLY_FEATURES:
            return {...initialState};
        default:
            return {...state};
    }
};

export default assemblyFeatures;