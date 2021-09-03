import * as actions from "../actionTypes";
import {fetchCartApi, addToCartApi, deleteFromCartApi} from '../../api/cart';

export function fetchCart(params = {}) {
    return async dispatch => {
        fetchCartApi().then(response => {
            const cart = response.data.data;
            dispatch({
                type: actions.FETCH_CART,
                payload: cart
            })
        }).catch(e => console.log(e))
    }
}


export function addToCart(id, quantity) {
    return async dispatch => {
        const request = await addToCartApi(id, quantity)
            .then(response => response.data.data)
            .catch(e => console.log(e));
        dispatch({
            type: actions.ADD_TO_CART,
            payload: request
        })
    }
}


export function deleteFromCart(id) {
    return async dispatch => {
        const request = await deleteFromCartApi(id)
            .then(response => response.data.data)
            .catch(e => console.log(e));
        dispatch({
            type: actions.DELETE_FROM_CART,
            payload: request
        })
    }
}