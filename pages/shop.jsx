import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";

import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../components/url";
import OverlayComponent from "../components/Layout/overlay/overlay.component";
export default function servicesPage(props) {
  const [cartNumber, setCartNumber] = React.useState(0);
  const [compareNumber, setCompareNumber] = React.useState(0);

  return (
    <>
      <Head>
        <title>Сервисы</title>
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
          title={`Магазин`}
          pageInfo={["Главная", "Магазин"]}
        >
          <main id="content" role="main">
            <OverlayComponent />
            <section class="product_area pt_200">
              <div class="container">
                <div class="section_title_one">
                  <h2 class="title_head">Показано 9-18 из 170 результатов</h2>
                </div>
                <div class="row product_inner">
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid shop_fluid_img"
                          src="/static/assets/img/img/product/product-1.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem, ipsum dolor.</h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid shop_fluid_img"
                          src="/static/assets/img/img/product/product-2.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem, ipsum dolor.</h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid shop_fluid_img"
                          src="/static/assets/img/img/product/product-3.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem, ipsum dolor.</h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid shop_fluid_img"
                          src="/static/assets/img/img/product/product-4.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem, ipsum dolor.</h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid shop_fluid_img"
                          src="/static/assets/img/img/product/product-5.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem, ipsum dolor.</h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid shop_fluid_img"
                          src="/static/assets/img/img/product/product-6.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem, ipsum dolor.</h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid shop_fluid_img"
                          src="/static/assets/img/img/product/product-7.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem, ipsum dolor.</h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid shop_fluid_img"
                          src="/static/assets/img/img/product/product-8.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem, ipsum dolor.</h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid shop_fluid_img"
                          src="/static/assets/img/img/product/product-9.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem, ipsum dolor.</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pagination_area">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li class="page-item">
                        <a class="page-link" href="#">
                          Пред
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li class="page-item active">
                        <a class="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          4
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          ...
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          18
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          След
                        </a>
                      </li>
                    </ul>
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
