import { useRouter } from "next/router";
import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";
import axios from "axios";
import Cookies from "universal-cookie";
import React, { useState, useEffect } from "react";
import url from "../components/url";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Breadcrumb from "../components/BreadCrumb";
import GridProducts from "../components/Grid/grid";
const mapDispatchToProps = dispatch => ({
  setProductCategory: (obj) => dispatch(actions.setProductCategory(obj))
});

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;


 export default function Grid() {
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
    // Обновляем заголовок документа с помощью API браузера
    const cookies = new Cookies();

    axios
      .get(`${url}/api/cart/show`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type")
        }
      })
      .then(response => {
        setCartNumber(response.data.data.items.length)
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${url}/api/comparison/features`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type")
        }
      })
      .then(response => {
        setCompareNumber(response.data.data.products.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  function grandHandler() {
    setCartNumber(cartNumber + 1);
  }

  function handleCompare() {
    setCompareNumber(compareNumber + 1);
  }


  return (
    <>
      <Head>
      
          <title>Kitmach Premium - Горячие предложения</title>
       

        <meta
          name="google-site-verification"
          content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k"
        />
        <meta
          name="description"
          content=""
        />
        <meta
          name="keywords"
          content=""
        />
      
        <meta name="author" content="Kitmach Premium" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="icon"
          href="/static/assets/template/avtech/images/favicon.png"
          type="image/x-icon"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/shop_responsive.css"
        />
      </Head>
      <div className="super_container">
        <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
      
          <div className="home">
            <div className="home_overlay">
              {" "}
              <img
                src=""
                alt=""
              />
            </div>
            <div className="home_content d-flex flex-column align-items-left justify-content-center">
                <h2 className="home_title">Горячие предложения </h2>
           </div>
          </div>

        <Breadcrumb />
          <div className="shop">
            <div className="container">
              <div className="row">
               

                <div className="col-lg-12">
                 

                <GridProducts 
                compare={handleCompare}
                compareNumber={compareNumber}
                grand={grandHandler}
                cartNumber={cartNumber}
               discount={router.query.discount}
               category_id={router.query.category_id}
                />
                
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}

// export async function getServerSideProps({ params }) {

// const res = await axios.get(`${url}/api/products?slug=${params.id}`);

// const data = await res.data.data;
//   // Pass data to the page via props
//   return { props: { data } }; 
// }

// export default connect(null, mapDispatchToProps)(Grid);

