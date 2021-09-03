import * as axios from "axios";
//axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
import Cookies from "universal-cookie";
const uuidv1 = require("uuid/v1");
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

axios.interceptors.request.use(
  config => {
    // if (!config.headers.Authorization) {
    //   const token = JSON.parse(localStorage.getItem("keyCloak")).token;
    const cookie = new Cookies();
    
    let token =  cookie.get("access_token");
    // let device_token = cookies.get("device_token")
    // let device_type = cookies.get("device_type")
    
    // if(device_token){
    //   config.headers.device_token = `${device_token}` ;
    // }

    // if(device_type){
    //   config.headers.device_type = `${device_type}`;
    // }
  
    
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    // }

    return config;
  },
  error => Promise.reject(error)
);


// Add a response interceptor
axios.interceptors.response.use((response) => {

  const {status, data, statusText} = response;
  


  if (!status) {
      return connectionError('Ошибка соединения!', this);
  }


  return response;

}, ({response}) => {
  const {status, data, statusText} = response;
  const cookies = new Cookies();
  const notyf = new Notyf({
  types: [
    {
      type: 'warning',
      backgroundColor: 'orange',
      icon: false
    }
  ]
});


  if (parseInt(status) === 401 || parseInt(status) === 403) {
    const cookies = new Cookies();
      cookies.remove("access_token", {path: '/'})
      cookies.remove("refresh_token", {path:'/'})
   

      // setTimeout(() =>{
      //   Router.push({
      //      pathname:`/auth/login`
      //   })
      // },100) 
  }

    if (parseInt(status) === 400 && data.code === 11) {
        notyf.info(data.message)
    }
    if (parseInt(status) === 400 && data.code === 10) {
      notyf.error(data.message)
  }

  


  if (parseInt(status) === 429) {
      notyf('Вы делаете слишком много запросов на сервер. Пожалуйста подождите 1 минуту и продолжите.');
  }

  if (parseInt(status) === 500) {
      notyf('Произошла ошибка на сервере');
  }


  

  

  return Promise.reject(response);
});