import * as actions from "../actionTypes";
import {fetchFavoritesApi} from '../../api/favorites';

export function fetchFavorites(params = {}) {
    return async dispatch => {
        fetchFavoritesApi().then(response => {
            const favourites = response.data.data;
            dispatch({
                type: actions.FETCH_FAVOURITES,
                payload: favourites
            })
        }).catch(e => console.log(e))
    }
}


// export function addDeleteToggleFavourites(id, quantity) {
//     return async dispatch => {
//         const request = await addDeleteToggleFavouritesApi(id, quantity)
//             .then(response => response.data.data)
//             .catch(e => console.log(e));
//         dispatch({
//             type: actions.FAVOURITES_TOGGLE,
//             payload: request
//         })
//     }
// }

