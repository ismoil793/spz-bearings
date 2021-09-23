import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React, { useEffect } from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";
import ServiceDetailedText from "../../static/locales/services_details";

function PostService({ data, setProductCategory, isLoading, locale }) {
  return (
    <>
      <Head>
        <title>{`${ServiceDetailedText.[locale].pageTitle}`}</title>
        <meta charset="UTF-8" />
        <meta name="description" content={"Технический центр"} />
        <meta name="keywords" content={"Технический центр"} />
          
        <meta
          name="google-site-verification"
          content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            class={`pace ${
              isLoading ? "pace-active" : "pace-inactive"
            }`}
          >
            <div
              class="pace-progress"
              data-progress-text="100%"
              data-progress="99"
              style={{ transform: "translate3d(100%, 0px, 0px)" }}
            >
              <div class="pace-progress-inner"></div>
            </div>
            <div class="pace-activity"></div>
          </div>

          <div className="body_wrapper main_index">
            <div
              id={`preloader`}
              className={`preloader ${isLoading ? "" : "load_coplate"}`}
            >
              <div
                class={`product_name ${
                  isLoading ? "" : "load_coplate"
                }`}
              >
               SPZ Bearings
              </div>
            </div>
          </div>
      <div className="super_container">
        <OverlayComponent isLoading={isLoading} locale={locale} />
        <Layout
          isLoading={isLoading}
          title={`${ServiceDetailedText.[locale].title}`}
          pageInfo={["Главная", "Сервисы", "Технический Центр"]}
          locale={locale}
        >
          <>
            <section class="service_details_area pt_200">
              <div class="container">
                <div class="row service_details_img">
                  <div class="col-lg-12">
                    {" "}
                    <img
                      class="img-fluid"
                      src="/static/assets/img/img/about/single-service-1.jpg"
                      alt=""
                    />
                  </div>
                  <div class="col-md-4 col-sm-6">
                    {" "}
                    <img
                      class="img-fluid"
                      src="/static/assets/img/img/about/single-service-2.jpg"
                      alt=""
                    />{" "}
                  </div>
                  <div class="col-md-4 col-sm-6">
                    {" "}
                    <img
                      class="img-fluid"
                      src="/static/assets/img/img/about/single-service-3.jpg"
                      alt=""
                    />{" "}
                  </div>
                  <div class="col-md-4 col-sm-6">
                    {" "}
                    <img
                      class="img-fluid"
                      src="/static/assets/img/img/about/single-service-4.jpg"
                      alt=""
                    />{" "}
                  </div>
                </div>
                <div class="service_details_text">
                  <div class="row">
                    <div class="col-lg-7 col-md-7">
                      <div class="left">
                        <h3>{ServiceDetailedText.[locale].title}</h3>
                        <p>
                          {ServiceDetailedText.[locale].paragraphs[0]}
                        </p>
                        <p>
                        {ServiceDetailedText.[locale].paragraphs[1]}
                        </p>
                        <p>
                        {ServiceDetailedText.[locale].paragraphs[2]}
                        </p>
                        <p>
                        {ServiceDetailedText.[locale].paragraphs[3]}
                        </p>
                        <a
                          class="theme_btn theme_btn_three hover_style1"
                          href="#"
                        >
                          {ServiceDetailedText.[locale].button_main}
                        </a>
                      </div>
                    </div>
                    <div class="col-lg-5 col-md-5">
                      <div class="right_brochure">
                        <h5>{ServiceDetailedText.[locale].title_second}</h5>{" "}
                        <a href="#">
                        {ServiceDetailedText.[locale].button_download_works}<i class="fas fa-download"></i>
                        </a>{" "}
                        <a href="#">
                        {ServiceDetailedText.[locale].button_download_tech}
                          <i class="fas fa-download"></i>
                        </a>{" "}
                        <img
                          class="img-fluid"
                          src="/static/assets/img/img/about/service-d-call.jpg"
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
