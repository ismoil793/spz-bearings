
import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";


import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../components/url";
import OverlayComponent from "../components/Layout/overlay/overlay.component";
import AboutText from "../static/locales/about";
import ModalImage from "../components/ModalImage/modalImage";

export async function getStaticProps({locale}) {
  return {
    props: {locale}, // will be passed to the page component as props
  }
}

export default function aboutPage(props) {

  const [cartNumber, setCartNumber] = React.useState(0);
  const [compareNumber, setCompareNumber] = React.useState(0);
  const [modalImgUrl, setModalImgUrl] = React.useState('')

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
        <title>{AboutText.[props.locale].pageTitle}</title>
        <link
          rel="icon"
          href="/static/assets/img/img/favicon.ico"
          type="image/x-icon"
        />
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/blog_single_responsive.css"
        />
      </Head>
      <div className="super_container">
        <div
          class={`pace ${props.isLoading ? "pace-active" : "pace-inactive"}`}
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
        <div
          id={`preloader`}
          className={`preloader ${props.isLoading ? "" : "load_coplate"}`}
        >
          <div class="product_name">Bearings</div>
        </div>
        <Layout
          isLoading={props.isLoading}
          compareNumber={compareNumber}
          cartNumber={cartNumber}
          title={`История Завода`}
          pageInfo={["Главная", "О Нас"]}
          locale={props.locale}
        >
          <main id="content" role="main">
            <OverlayComponent isLoading={props.isLoading} locale={props.locale}/>
            
            <section class="about_main_area about_page">
              <div class="container">
                <div class="about_inner">
                  <h6 class="title_top">{AboutText.[props.locale].main_area_section.mainTitle}</h6>
                  <h2 class="title_head">{AboutText.[props.locale].main_area_section.title}</h2>
                  <div class="about_img">
                    {" "}
                    <img
                      class="img-fluid"
                      src="/static/assets/img/img/factoryAbout.jpg"
                      alt=""
                    />{" "}
                  </div>
                  <p>
                  {AboutText.[props.locale].main_area_section.description[0]}
                  </p>
                  <p>
                  {AboutText.[props.locale].main_area_section.description[1]}
                  </p>
                  <p>
                  {AboutText.[props.locale].main_area_section.description[2]}
                  </p>
                  <p>
                  {AboutText.[props.locale].main_area_section.description[3]}
                  </p>
                </div>
              </div>
            </section>

            <section class="cons_vision_area pad_btm about_page">
              <div class="container">
                <div class="section_title_one">
                  <h6 class="title_top">{AboutText.[props.locale].specificity_section.sectionTitle}</h6>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="vision_item">
                      {" "}
                      <a href="#" class="img_shadow">
                        <img
                          src="/static/assets/img/img/podshipniki_proizvodstvo.jpg"
                          alt=""
                        />
                      </a>
                      <div class="content pr_100">
                        <h3 class="page_head">
                        {AboutText.[props.locale].specificity_section.elements[0].title}
                        </h3>
                        <ul className="circle_list">
                        {AboutText.[props.locale].specificity_section.elements[0].descriptionList.map(element => (<li>{element}</li>))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="vision_item pl_100">
                      {" "}
                      <a href="#" class="img_shadow">
                        <img
                          src="/static/assets/img/img/bearing_640.jpg"
                          alt=""
                        />
                      </a>
                      <div class="content">
                        <h3 class="page_head">
                        {AboutText.[props.locale].specificity_section.elements[1].title}
                        </h3>
                        <ul className="circle_list">
                        {AboutText.[props.locale].specificity_section.elements[1].descriptionList.map(element => (<li>{element}</li>))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="cons_service_area">
              <div class="container">
                <div class="row flex-row-reverse align-items-center service_teb_item">
                  <div class="col-lg-6 col-md-5">
                    <div class="service_img">
                      {" "}
                      <img
                        class="img-fluid"
                        src="/static/assets/img/img/about/service4.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-7">
                    <div class="cons_about_content">
                      <h6 class="title_top">{AboutText.[props.locale].service_section[0].mainTitle}</h6>
                      <h2 class="title_head">
                      {AboutText.[props.locale].service_section[0].title}
                      </h2>
                      <p>
                      {AboutText.[props.locale].service_section[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="cons_service_area">
              <div class="container">
                <div class="row flex-row-reverse align-items-center service_teb_item">
                  <div class="col-lg-6 col-md-7">
                    <div class="cons_about_content">
                      <h6 class="title_top">{AboutText.[props.locale].service_section[1].mainTitle}</h6>
                      <h2 class="title_head">
                      {AboutText.[props.locale].service_section[1].title}
                      </h2>
                      <p>
                      {AboutText.[props.locale].service_section[1].description}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-5">
                    <div class="service_img">
                      {" "}
                      <img
                        class="img-fluid"
                        src="/static/assets/img/img/about/service4.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="about_page images_container">
                    <div class="col-md-3 col-sm-6 order-md-2 order-sm-4 item-sertificates clearfix image_item_wrapper">
                      {" "}
                      <img onClick={()=>setModalImgUrl("/static/assets/img/img/about/sertificate4.jpg")}
                        class="img-fluid sertificate_pre-modal"
                        src="/static/assets/img/img/about/sertificate4.jpg"
                        alt=""
                      />{" "}
                    </div>
                    <div class="col-md-3 col-sm-6 order-md-4 order-sm-1 item-sertificates clearfix image_item_wrapper">
                      {" "}
                      <img onClick={()=>setModalImgUrl("/static/assets/img/img/about/sertificate1.jpg")}
                        class="img-fluid sertificate_pre-modal"
                        src="/static/assets/img/img/about/sertificate1.jpg"
                        alt=""
                      />{" "}
                    </div>
                    <div class="col-md-3 col-sm-6 order-md-1 order-sm-2 item-sertificates clearfix image_item_wrapper">
                      {" "}
                      <img onClick={()=>setModalImgUrl("/static/assets/img/img/about/sertificate2.jpg")}
                        class="img-fluid sertificate_pre-modal"
                        src="/static/assets/img/img/about/sertificate2.jpg"
                        alt=""
                      />{" "}
                    </div>
                    <div class="col-md-3 col-sm-6  order-md-3 order-sm-3 item-sertificates clearfix image_item_wrapper">
                      {" "}
                      <img onClick={()=>setModalImgUrl("/static/assets/img/img/about/sertificate3.jpg")}
                        class="img-fluid sertificate_pre-modal"
                        src="/static/assets/img/img/about/sertificate3.jpg"
                        alt=""
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {modalImgUrl ? <ModalImage src={modalImgUrl} hide={()=>setModalImgUrl('')}/> : null}

            <section class="cons_contact_area_four work_offers about_page">
              <div class="container">
                <div class="cons_contact_info_two bg_gradient text-center">
                  <h4>{AboutText.[props.locale].redirect_card.mainTitle}</h4>
                  <p>{AboutText.[props.locale].redirect_card.title}</p>{" "}
                  <a class="theme_btn theme_btn_three hover_style1" href="#">
                  {AboutText.[props.locale].redirect_card.button}
                  </a>
                </div>
              </div>
            </section>
          </main>
        </Layout>
      </div>
    </>
  );
}
