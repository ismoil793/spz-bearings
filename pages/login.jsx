import { useRouter } from "next/router";
import Layout from "../components/Layout/layout/layout.component";
import BreadCrumb from "../components/BreadCrumb";
import Head from "next/head";
import Login from "../components/Auth/Login";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../components/url";
export default function LoginPage() {
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

    axios
      .get(`${url}/api/comparison/features`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type"),
        },
      })
      .then((response) => {
        setCompareNumber(response.data.data.products.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //   const router = useRouter();

  return (
    <>
      <Head>
        <title>Авторизация</title>
        <link
          rel="icon"
          href="/static/assets/img/img/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/contact_responsive.css"
        />
      </Head>
      <div className="super_container">
        <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
          <BreadCrumb />
          <Login />
        </Layout>
      </div>
    </>
  );
}
