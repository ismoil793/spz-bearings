import {httpGet, httpPost, httpDelete} from "./index";
import Cookies from "universal-cookie";
import axios from "axios";
import url from '../components/url';


const cookies = new Cookies();

export const fetchFavoritesApi = () => 
axios
.get(`${url}/api/user/favorites`)

// export const addDeleteToggleFavoritesApi = (product_id) => httpPost({
//    url: '/api/user/favorites/toggle',
//    data: {
//       product_id
//    }
// });
