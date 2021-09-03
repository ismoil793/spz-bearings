import { useRouter } from 'next/router';
import Layout from '../components/Layout/layout/layout.component';
import Head from 'next/head';
import Cart from '../components/Cart/cart.component'
import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import SearchList from '../components/Search/Search';
import url from '../components/url';
export default function CartPage() {
    
  const router = useRouter();
  const [cartNumber, setCartNumber] = React.useState(0)
  const [compareNumber, setCompareNumber] = React.useState(0);



	useEffect(() => {
  }, []);
  
  function grandHandler(){
		setCartNumber(cartNumber - 1)
}


  return (
<>
    <Head>
        <title>Поиск</title>
        <link rel="icon" href="/static/assets/template/avtech/images/favicon.png" type="image/x-icon"/>
          
            <link rel="stylesheet" type="text/css" href="/static/assets/template/avtech/styles/cart_responsive.css"/>

     </Head>
     <div className="super_container">
    <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
        {/* <Cart grand={grandHandler} cartNumber={cartNumber} /> */}
        <SearchList searching={router.query.searching} grand={grandHandler} cartNumber={cartNumber} />
    </Layout> 
    </div>
  </>)
}