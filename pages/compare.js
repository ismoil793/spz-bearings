import { useRouter } from 'next/router';
import Layout from '../components/Layout/layout/layout.component';
import BreadCrumb from "../components/BreadCrumb";
import Head from 'next/head';
import Compare from '../components/Compare/Compare';
import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import url from '../components/url';
export default function ComparePage() {
    
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
        <title>Сравнение товаров</title>
				<link rel="icon" href="/static/assets/template/avtech/images/favicon.png" type="image/x-icon"/>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
       
  
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      
        <link rel="stylesheet" type="text/css" href="/static/assets/template/avtech/styles/contact_responsive.css"/>
        <link rel="stylesheet" href="/static/assets/template/avtech/styles/styles_compare.css"/>
      
     </Head>
     <div className="super_container">
    <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
    	<BreadCrumb/>
      <Compare />
    </Layout>
    </div>
  </>)
}