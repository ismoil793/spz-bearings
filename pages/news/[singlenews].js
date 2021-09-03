import { useRouter } from "next/router";
import { connect } from "react-redux";

import * as actions from "../../redux/actions/";
import BreadCrumb from "../../components/BreadCrumb";
import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../../components/url";
import Link from "next/link";

const mapDispatchToProps = dispatch => ({
  setProductCategory: obj => dispatch(actions.setProductCategory(obj))
});

function PostNews({ data, setProductCategory }) {
  const router = useRouter();
  const [cartNumber, setCartNumber] = React.useState(0);
  const [compareNumber, setCompareNumber] = React.useState(0);
  const [news, setNews] = React.useState([]);
  // var id = parseInt(router.asPath.split("=").pop())

  useEffect(() => {
    axios
      .get(`${url}/api/posts`)
      .then(response => {
        setNews(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });

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
        <title>{data.meta_title}</title>
        <meta charset="UTF-8" />
        <meta name="description" content={data.meta_description} />
        <meta name="keywords" content={data.meta_keywords} />
          
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
          <>
            <BreadCrumb />

            <div className="single_post">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="single_post_title">{data.title}</div>
                    <div className="single_post_text">
                      <div
                        className="single_post_data"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      ></div>
                      <p>{data.created_at}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="blog">
              <div className="container">
                <div className="brand_title_container">
                  <h3 className="brand_title">Читайте также:</h3>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="blog_posts d-flex flex-row align-items-start justify-content-between">
                      {news
                        ? news.slice(0,3).map(news => (
                            <div key={news.id} className="blog_post">
                              <div className="blog_image">
                                <img src={news.image ? news.image.url : null} />
                              </div>
                              <div className="blog_time">{news.created_at}</div>
                              <div className="blog_text">{news.title}</div>
                              <div className="blog_description">
                                {news.description_short}
                              </div>

                              <div className="blog_button">
                                <Link
                                  href={{
                                    pathname: "/news/[singlenews]"
                                  }}
                                  as={`/news/${news.slug}`}
                                >
                                  <a>Прочитать</a>
                                </Link>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Layout>
      </div>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await axios.get(`${url}/api/posts?slug=${params.singlenews}`);
  const data = await res.data.data;
  // Pass data to the page via props
  return { props: { data } };
}

export default connect(
  null,
  mapDispatchToProps
)(PostNews);
