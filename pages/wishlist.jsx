import { useRouter } from "next/router";
import Layout from "../components/Layout/layout/layout.component";
import BreadCrumb from "../components/BreadCrumb";
import Head from "next/head";
import Favourite from "../components/Favourites/favourites.components";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../components/url";

export default function FavouritePage() {
  const router = useRouter();
  const [cartNumber, setCartNumber] = React.useState(0);
  const [compareNumber, setCompareNumber] = React.useState(0);

  useEffect(() => {
    const cookies = new Cookies();
    axios
      .get(`${url}/api/cart/show`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type"),
        },
      })
      .then((response) => {
        setCartNumber(response.data.data.items.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Head>
        <title>Избранные</title>
        <link
          rel="icon"
          href="/static/assets/img/img/favicon.ico"
          type="image/x-icon"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/cart_responsive.css"
        />
      </Head>
      <div className="super_container">
        <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
          <BreadCrumb />
          <Favourite />
        </Layout>
      </div>
    </>
  );
}
