import Layout from '../components/Layout/layout/layout.component';
import Head from 'next/head';
import CartCheckout from '../components/Checkout/CartCheckout';
import Checkout from '../components/Checkout/Checkout';
import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import url from '../components/url';
export default function checkPage() {
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
  
  
//   const router = useRouter();

  return (
<>
    <Head>
        <title>Оформление заказа - Продукты</title>
        <link rel="icon" href="/static/assets/template/avtech/images/favicon.png" type="image/x-icon"/>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
     
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="google-site-verification" content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k" />

      </Head>
      <div className="super_container">
    <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
        <Checkout />
    </Layout>
    </div>
  </>)
}