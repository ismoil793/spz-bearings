import * as actions from "../actionTypes";
import {addDeleteToggleCompareApi, fetchCompareApi} from '../../api/compare';

export function fetchCompare(params = {}) {
    return async dispatch => {
        fetchCompareApi().then(response => {
            const compare = response.data.data.products;
            dispatch({
                type: actions.FETCH_COMPARE,
                payload: compare
            })
        }).catch(e => console.log(e))
    }
}


export function addDeleteToggleCompare(id, quantity) {
    return async dispatch => {
        const request = await addDeleteToggleCompareApi(id, quantity)
            .then(response => response.data.data)
            .catch(e => console.log(e));
        dispatch({
            type: actions.COMPARE_TOGGLE,
            payload: request
        })
    }
}

