import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React, {useEffect} from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";
import ServiceDetailedText from "../../static/locales/services_details";
import Link from "next/link"

function PostService({data, setProductCategory, isLoading, locale, videoPreloader}) {
   return (
       <>
          <Head>
             <title>{`${ServiceDetailedText[locale].pageTitle}`}</title>
             <meta charset="UTF-8"/>
             <meta name="description" content={"Технический центр"}/>
             <meta name="keywords" content={"Технический центр"}/>
             <meta
                 name="google-site-verification"
                 content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k"
             />
             <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
             <link
                 rel="icon"
                 href="/static/assets/img/img/favicon.ico"
                 type="image/x-icon"
             />
             <link
                 rel="stylesheet"
                 type="text/css"
                 href="/static/assets/template/avtech/styles/product_responsive.css"
             />
          </Head>
          <div
              className={`pace ${
                  isLoading ? "pace-active" : "pace-inactive"
              }`}
          >
             <div
                 className="pace-progress"
                 data-progress-text="100%"
                 data-progress="99"
                 style={{transform: "translate3d(100%, 0px, 0px)"}}
             >
                <div className="pace-progress-inner"></div>
             </div>
             <div className="pace-activity"></div>
          </div>

          <div className="body_wrapper main_index">
             <div
                 id={`preloader`}
                 className={`preloader ${isLoading ? "" : "load_coplate"}`}
             >
                <div
                    className={`product_name ${
                        isLoading ? "" : "load_coplate"
                    }`}
                >
                   SPZ Bearings
                </div>
             </div>
          </div>
          <div className="super_container">
             <OverlayComponent isLoading={isLoading} locale={locale}/>
             <Layout
                 videoPreloader={videoPreloader}
                 isLoading={isLoading}
                 title={`${ServiceDetailedText[locale].title}`}
                 pageInfo={["Главная", "Сервисы", "Технический Центр"]}
                 locale={locale}
             >
                <>
                   <section className="service_details_area pt_200">
                      <div className="container">
                         <div className="row service_details_img">
                            <div className="col-lg-12">
                               <img
                                   className="img-fluid"
                                   src="/static/assets/img/img/about/zavod.jpg"
                                   alt=""
                               />
                            </div>
                            <div className="col-md-4 col-sm-6">
                               <img
                                   className="img-fluid"
                                   src="/static/assets/img/img/about/service-11.jpg"
                                   alt=""
                               />
                            </div>
                            <div className="col-md-4 col-sm-6">
                               <img
                                   className="img-fluid"
                                   src="/static/assets/img/img/about/service-10.jpg"
                                   alt=""
                               />
                            </div>
                            <div className="col-md-4 col-sm-6">
                               <img
                                   className="img-fluid"
                                   src="/static/assets/img/img/about/service-9.jpg"
                                   alt=""
                               />
                            </div>
                         </div>
                         <div className="service_details_text">
                            <div className="row">
                               <div className="col-lg-7 col-md-7">
                                  <div className="left">
                                     <h3>{ServiceDetailedText[locale].title}</h3>
                                     <p>
                                        {ServiceDetailedText[locale].paragraphs[0]}
                                     </p>
                                     <p>
                                        {ServiceDetailedText[locale].paragraphs[1]}
                                     </p>
                                     <p>
                                        {ServiceDetailedText[locale].paragraphs[2]}
                                     </p>
                                     <p>
                                        {ServiceDetailedText[locale].paragraphs[3]}
                                     </p>
                                     <Link href="/contacts">
                                        <a className="theme_btn theme_btn_three hover_style1">
                                           {ServiceDetailedText[locale].button_main}
                                        </a>
                                     </Link>
                                  </div>
                               </div>
                               <div className="col-lg-5 col-md-5">
                                  <div className="right_brochure">
                                     <h5>{ServiceDetailedText[locale].title_second}</h5>{" "}

                                     <img
                                         className="img-fluid"
                                         src="/static/assets/img/img/about/zavod2.jpg"
                                         alt=""
                                     />
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </section>
                </>
             </Layout>
          </div>
       </>
   );
}

export default PostService;
