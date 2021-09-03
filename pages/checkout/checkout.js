import Layout from '../../components/Layout/layout/layout.component';
import Head from 'next/head';
import CartCheckout from '../../components/Checkout/CartCheckout';
import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import url from '../../components/url';
export default function checkPage() {
    
//   const router = useRouter();
const [cartNumber, setCartNumber] = React.useState(0)
const [compareNumber, setCompareNumber] = React.useState(0);


useEffect(() => {
  const cookies = new Cookies();
    axios
    .get(`${url}/api/cart/show`, {
      params: {
        device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type"),
      }
    })
    .then(response => {
       setCartNumber( response.data.data.items.length)
    })
    .catch(error => {
      console.log(error);
    });

    axios
    .get(`${url}/api/comparison/features`, {
      params: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
       
      }
    })
    .then(response => {
    setCompareNumber(response.data.data.products.length)
    })
    .catch(error => {
      console.log(error);
    })
}, []);
  return (
<>
    <Head>
        <title>Оформление заказа - Продукты</title>
        <link rel="icon" href="/static/assets/template/avtech/images/favicon.png" type="image/x-icon"/>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
     
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="google-site-verification" content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k" />
      
        <link rel="stylesheet" type="text/css" href="/static/assets/template/avtech/styles/cart_styles.css"/>
        <link rel="stylesheet" type="text/css" href="/static/assets/template/avtech/styles/cart_responsive.css"/>
        <link rel="stylesheet" href="/static/assets/template/avtech/assets/css/bulma.css"/>
        {/* <link rel="stylesheet" href="/static/assets/template/avtech/assets/css/core.css"/> */}
        <link rel="stylesheet" type="text/css" href="http://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css"/>
  
        <link href="http://fonts.googleapis.com/css?family=Alegreya+Sans+SC:100,400" rel="stylesheet"/>
        <link href="http://fonts.googleapis.com/css?family=Raleway:300,400,500" rel="stylesheet"/>
        
 
        <link rel="stylesheet" href="/static/assets/template/avtech/assets/js/slick/slick.css"/>
        <link rel="stylesheet" href="/static/assets/template/avtech/assets/js/slick/slick-theme.css"/>
        <link rel="stylesheet" href="/static/assets/template/avtech/assets/js/webuipopover/jquery.webui-popover.min.css"/>
        <link rel="stylesheet" href="/static/assets/template/avtech/assets/js/izitoast/css/iziToast.min.css"/>
        <link rel="stylesheet" href="/static/assets/template/avtech/assets/js/zoom/zoom.css"/>
        <link rel="stylesheet" href="/static/assets/template/avtech/assets/js/jpcard/card.css"/>
        <link rel="stylesheet" href="/static/assets/template/avtech/assets/css/chosen/chosen.css"/>
        <link rel="stylesheet" href="/static/assets/template/avtech/assets/css/icons.min.css"/>

        
 <script src="/static/assets/template/avtech/assets/js/app.js"></script>

 <script src="/static/assets/template/avtech/assets/js/nephos.js"></script> 
      </Head>
      <div className="super_container"> 
    <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
        <CartCheckout />
    </Layout>
    </div>
  </>)
}