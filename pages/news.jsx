import {useRouter} from "next/router";
import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";
import Link from "next/link";

import React, {useState, useEffect} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../components/url";
import OverlayComponent from "../components/Layout/overlay/overlay.component";
import NewsText from "../static/locales/news";
import Fade from "../components/Animations/Fade";
import FadeLeft from "../components/Animations/FadeLeft";
import FadeRight from "../components/Animations/FadeRight";

export default function NewsPage(props) {
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
   return (
       <>
          <Head>
             <title>{NewsText[props.locale].pageTitle}</title>
             <link
                 rel="icon"
                 href="/static/assets/img/img/favicon.ico"
                 type="image/x-icon"
             />
             <meta charset="utf-8"/>
             <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

             <meta name="viewport" content="width=device-width, initial-scale=1"/>

             <link
                 rel="stylesheet"
                 type="text/css"
                 href="/static/assets/template/avtech/styles/blog_single_responsive.css"
             />
          </Head>
          <div
              class={`pace ${
                  props.isLoading ? "pace-active" : "pace-inactive"
              }`}
          >
             <div
                 class="pace-progress"
                 data-progress-text="100%"
                 data-progress="99"
                 style={{transform: "translate3d(100%, 0px, 0px)"}}
             >
                <div class="pace-progress-inner"></div>
             </div>
             <div class="pace-activity"></div>
          </div>

          <div className="body_wrapper main_index">
             <div
                 id={`preloader`}
                 className={`preloader ${props.isLoading ? "" : "load_coplate"}`}
             >
                <div
                    class={`product_name ${
                        props.isLoading ? "" : "load_coplate"
                    }`}
                >
                   SPZ Bearings
                </div>
             </div>
          </div>
          <div className="super_container">
             <Layout
                 videoPreloader={props.videoPreloader}
                 isLoading={props.isLoading}
                 compareNumber={compareNumber}
                 cartNumber={cartNumber}
                 title={NewsText[props.locale].breadcrumb.main}
                 pageInfo={[`${NewsText[props.locale].breadcrumb.crumbs[0]}`, `${NewsText[props.locale].breadcrumb.crumbs[1]}`]}
                 locale={props.locale}
             >
                <main id="content" role="main">
                   <OverlayComponent isLoading={props.isLoading} locale={props.locale}/>
                   <section class="blog_list_area pt_200">
                      <div class="container">
                         <div class="blog_list_inner">
                            {NewsText[props.locale].news.map((item, index) => (
                                <div class="row blog_l_item">
                                   <div class="col-lg-6">
                                      <div class="blog_l_img">
                                         <Fade scale={0.5} delay={index === 0 ? 1.8 : 0.2 + index / 10}>
                                            <img
                                                class="img-fluid"
                                                src={`/static/assets/img/img/blog/blog-${index+1}.jpg`}
                                                alt=""
                                            />
                                         </Fade>
                                      </div>
                                   </div>
                                   <div class="col-lg-6">
                                      <FadeRight delay={index === 0 ? 1.8 : 0.2}>
                                         <div class="blog_l_text">
                                            <h6>{item.date}</h6>{" "}
                                            <a href="#">
                                               <h4>{item.title}</h4>
                                            </a>
                                            <p>
                                               {item.description}
                                            </p>{" "}
                                            <a class="more_btn" href="#">
                                               {item.button}<i class="fas fa-arrow-right"></i>
                                            </a>
                                         </div>
                                      </FadeRight>
                                   </div>
                                </div>))}
                         </div>
                         <div class="pagination_area">
                            <nav aria-label="Page navigation example">
                               {/*<ul class="pagination">*/}
                               {/*   <li class="page-item">*/}
                               {/*      <a class="page-link" href="#">*/}
                               {/*         {NewsText[props.locale].pagination[0]}*/}
                               {/*      </a>*/}
                               {/*   </li>*/}
                               {/*   <li class="page-item">*/}
                               {/*      <a class="page-link" href="#">*/}
                               {/*         1*/}
                               {/*      </a>*/}
                               {/*   </li>*/}
                               {/*   <li class="page-item active">*/}
                               {/*      <a class="page-link" href="#">*/}
                               {/*         2*/}
                               {/*      </a>*/}
                               {/*   </li>*/}
                               {/*   <li class="page-item">*/}
                               {/*      <a class="page-link" href="#">*/}
                               {/*         3*/}
                               {/*      </a>*/}
                               {/*   </li>*/}
                               {/*   <li class="page-item">*/}
                               {/*      <a class="page-link" href="#">*/}
                               {/*         4*/}
                               {/*      </a>*/}
                               {/*   </li>*/}
                               {/*   <li class="page-item">*/}
                               {/*      <a class="page-link" href="#">*/}
                               {/*         ...*/}
                               {/*      </a>*/}
                               {/*   </li>*/}
                               {/*   <li class="page-item">*/}
                               {/*      <a class="page-link" href="#">*/}
                               {/*         18*/}
                               {/*      </a>*/}
                               {/*   </li>*/}
                               {/*   <li class="page-item">*/}
                               {/*      <a class="page-link" href="#">*/}
                               {/*         {NewsText[props.locale].pagination[1]}*/}
                               {/*      </a>*/}
                               {/*   </li>*/}
                               {/*</ul>*/}
                            </nav>
                         </div>
                      </div>
                   </section>
                </main>
             </Layout>
          </div>
       </>
   );
}
