import { useRouter } from 'next/router';
import Layout from '../components/Layout/layout/layout.component';
import Head from 'next/head';
import ChangePassword from '../components/Auth/Change_Password';
import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import url from '../components/url';

export default function ChangePasswordPage() {
    
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
        <title>Поменять пароль</title>
        <link rel="icon" href="/static/assets/template/avtech/images/favicon.png" type="image/x-icon"/>
    
        <meta name="google-site-verification" content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k" />
     
        <link rel="stylesheet" type="text/css" href="/static/assets/template/avtech/styles/contact_responsive.css"/>
      
     </Head>
     <div className="super_container">
    <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
        <ChangePassword /> 
   </Layout>
   </div>
  </>
  )
}