import { useRouter } from "next/router";
import Layout from "../../components/Layout/layout/layout.component";
import { connect } from "react-redux";
import Head from "next/head";
import Filter from "../../components/Filter/Filter";
import axios from "axios";
import BreadCrumb from "../../components/BreadCrumb";
import Cookies from "universal-cookie";
import React, { useState, useEffect } from "react";
import url from "../../components/url";
import Product from "../../components/Products/catalog";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const mapDispatchToProps = dispatch => ({
  setProductCategory: obj => dispatch(actions.setProductCategory(obj))
});

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;

function Post(data) {
  const router = useRouter();
  const [option, setOption] = React.useState({
    max_price: null,
    min_price: null,
    features: [],
    brands: [],
    selectedBrands: [],
    volume: null,
    cartnum: 0,
    value: { min: null, max: null },
    show_filter: false
  });

  const [cartNumber, setCartNumber] = React.useState(0);
  const [compareNumber, setCompareNumber] = React.useState(0);
  const [category_id, setCategoryID] = React.useState(null);
  const [category_image, setCategoryImage] = React.useState("");
  const [category_name, setCategoryName] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    axios
      .get(`${url}/api/categories`, {
        params: {
          slug: router.query.id
        }
      })
      .then(response => {
        setCategoryID(response.data.data.id);
        setCategoryName(response.data.data.name);
        setCategoryImage(
          response.data.data.img
            ? response.data.data.img.url
            : "/static/assets/template/avtech/images/banner_2_background.jpg"
        );
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [router.query.id]);

  // useEffect(() => {
  //   // Обновляем заголовок документа с помощью API браузера
  //   const cookies = new Cookies();

  //   axios
  //     .get(`${url}/api/cart/show`, {
  //       params: {
  //         device_token: cookies.get("device_token"),
  //         device_type: cookies.get("device_type")
  //       }
  //     })
  //     .then(response => {
  //       setCartNumber(response.data.data.items.length);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });

  //   axios
  //     .get(`${url}/api/comparison/features`, {
  //       params: {
  //         device_token: cookies.get("device_token"),
  //         device_type: cookies.get("device_type")
  //       }
  //     })
  //     .then(response => {
  //       setCompareNumber(response.data.data.products.length);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  function onChangeOption(options) {
    setOption(options);
  }

  // function grandHandler() {
  //   setCartNumber(cartNumber + 1);
  // }

  // function handleCompare() {
  //   setCompareNumber(compareNumber + 1);
  // }

  return (
    <>
      <Head>
        {router.query.searching ? (
          <title>Kitmach Premium поиск {router.query.searching} </title>
        ) : (
          <title>{data.data.meta_title ? data.data.meta_title : ""}</title>
        )}

        <meta
          name="google-site-verification"
          content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k"
        />
        <meta name="description" content={data.data.meta_description} />
        <meta name="keywords" content={data.data.meta_keywords} />

        <meta name="author" content="Kitmach Premium" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="super_container">
        <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
          <main id="content" role="main">
            <BreadCrumb />

            <div class="container">
              <div class="row mb-8">
                <Filter 
                  onChange={onChangeOption}
                  option={option}
                  category={category_id}
                />
                <Product
                  option={option}
                  category_id={category_id}
                  category_name={category_name}
                />
              </div>
            </div>
          </main>
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(`${url}/api/categories?slug=${params.id}`);

  const data = await res.data.data;
  // Pass data to the page via props
  return { props: { data } };
}

export default connect(
  null,
  mapDispatchToProps
)(Post);

