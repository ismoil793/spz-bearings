import {httpGet, httpPost, httpDelete} from "./index";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const fetchCompareApi = (moreParams) => httpGet({
   url: '/api/comparison/features',
   params: {
      device_token: cookies.get("device_token"),
      device_type: cookies.get("device_type"),
      ...moreParams
   }
});

export const addDeleteToggleCompareApi = (id, quantity) => httpPost({
   url: '/api/comparison/toggle',
   data: {
      device_token: cookies.get("device_token"),
      device_type: cookies.get("device_type"),
      // product_id
   }
});
