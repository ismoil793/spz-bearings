import axios from 'axios';
import url from '../components/url';


const httpClient = axios.create({
	baseURL: url,
	// withCredentials: true
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
)

httpClient.interceptors.request.use((config) => {
  return config
});

export const httpGet = (params) => httpClient.request({
	method: 'get',
	...params
});

export const httpPost = (params) => httpClient.request({
  method: 'post',
  ...params
})

export const httpDelete = (params) => httpClient({
  method: 'delete',
  ...params
});