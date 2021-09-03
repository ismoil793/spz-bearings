import { useRouter } from "next/router";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";
import BreadCrumb from "../../components/BreadCrumb";

import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import ProductCard from "../../components/ProductCard/productCardcomponents";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../../components/url";

const mapDispatchToProps = dispatch => ({
  setProductCategory: (obj) => dispatch(actions.setProductCategory(obj))
});

function PostProduct({ data, setProductCategory }) {
  const router = useRouter();
  const [cartNumber, setCartNumber] = React.useState(0);
  const [compareNumber, setCompareNumber] = React.useState(0);

  // var id = parseInt(router.asPath.split("=").pop())
  let slug = router.asPath.split("/").pop();
  console.log(data)

  useEffect(() => {
    setProductCategory(data.categories[0]);
    const cookies = new Cookies();
    axios
      .get(`${url}/api/cart/show`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type")
        }
      })
      .then(response => {
        setCartNumber(response.data.data.items.length);
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

  function handleCompareGrand() {
    setCompareNumber(compareNumber + 1);
  }



  return (
    <>
      <Head>
        <title>{data.meta_title ? data.meta_title : 'Продукт'}</title>
        <meta charset="UTF-8" />
        <meta name="description" content={data.meta_description} />
        <meta name="keywords" content={data.meta_keywords} />
{/* 
        <meta property="og:title" content={data.meta_title}/>
        <meta property="og:description" content={data.meta_description}/>
        <meta property="og:image" content={data.images ? data.images[0].url : null}/>
        <meta property="og:url" content={data.web_url}/> */}
        
        <meta
          name="google-site-verification"
          content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="/static/assets/template/avtech/images/favicon.png"
          type="image/x-icon"
        />
      
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/product_responsive.css"
        />
      </Head>
      <div className="super_container">
        <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
        <main id="content" role="main">
          <BreadCrumb/>
         
            <ProductCard
              compare={handleCompareGrand}
              compareNumber={compareNumber}
              grand={grandHandler}
              cartNumber={cartNumber}
              data={data}
              slug={slug}
            />
         </main>
        </Layout>
      </div>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await axios.get(`${url}/api/products?slug=${params.product}`);
  const data = await res.data.data;
  // Pass data to the page via props
  return { props: { data } }; 
}

export default connect(null, mapDispatchToProps)(PostProduct);
