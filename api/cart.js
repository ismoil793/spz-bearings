import {httpGet, httpPost, httpDelete} from "./index";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const fetchCartApi = (moreParams) => httpGet({
   url: '/api/cart/show',
   params: {
      device_token: cookies.get("device_token"),
      device_type: cookies.get("device_type"),
      ...moreParams
   }
});

export const addToCartApi = (id, quantity) => httpPost({
   url: '/api/cart/add',
   data: {
      device_token: cookies.get("device_token"),
      device_type: cookies.get("device_type"),
      quantity,
      item_shop_id: id
   }
});

export const deleteFromCartApi = (id) => httpDelete({
   url: '/api/cart/delete',
   data: {
      device_token: cookies.get("device_token"),
      device_type: cookies.get("device_type"),
      item_shop_id: id
   }
});