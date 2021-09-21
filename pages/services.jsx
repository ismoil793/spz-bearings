import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";

import React, { useState, useEffect } from "react";
import YouTube from 'react-youtube';

import OverlayComponent from "../components/Layout/overlay/overlay.component";
import ServicesText from "../static/locales/services";


const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};


export default function servicesPage(props) {
  const [cartNumber, setCartNumber] = React.useState(0);
  const [compareNumber, setCompareNumber] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);
  const [showPlayer, setShowPlayer] = React.useState(false)

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  return (
    <>
      <Head>
        <title>{ServicesText.[props.locale].pageTitle}</title>
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
          title={`Сервисы`}
          pageInfo={["Главная", "Сервисы"]}
          locale={props.locale}
        >
          <main id="content" role="main">
            <OverlayComponent isLoading={props.isLoading} locale={props.locale} />
            <section class="business_card pt_100">
              <div class="container">
                <div class="section_title_one title_two text-center">
                  <h6 class="title_top">{ServicesText.[props.locale].pageTitle}</h6>
                </div>
              </div>
            </section>
            <div class="container business_card visit_main_wrapper">
              <section className="services-business_card">
                <h1 class="title">SPZ-BEARINGS</h1>
                <div class="card-container business_card_wrapper">
                  <div
                    onClick={() => setToggle(!toggle)}
                    class={`card ${toggle ? "is-flipped" : ""}`}
                  >
                    <div class="card-faces back">
                      <div class="logo-back">
                        <img
                          className="business_card_logo_main"
                          src="/static/assets/img/img/logo.png"
                        />
                      </div>
                      <h4 class="back-title">SPZ-BEARINGS</h4>
                      <h4 class="back-sub-title">{ServicesText.[props.locale].business_card}</h4>
                      {/* <h3 class="back-name">Adam <span class="wizard">Whiz</span></h3>
      <h6 class="back-sub-name">Front-end developer</h6> */}
                      <ul class="back-list">
                        <li class="back-list-item">
                          <i class="list-icon fas fa-calculator"></i> {ServicesText.[props.locale].services_array[0]}
                        </li>
                        <li class="back-list-item">
                          <i class="list-icon fas fa-file-image"></i> {ServicesText.[props.locale].services_array[1]}
                        </li>
                        <li class="back-list-item">
                          <i class="list-icon fas fa-cogs"></i> {ServicesText.[props.locale].services_array[2]}
                        </li>
                        <li class="back-list-item">
                          <i class="list-icon fas fa-truck"></i>{ServicesText.[props.locale].services_array[3]}
                        </li>
                      </ul>
                      <div class="blue-bar"></div>
                    </div>
                    <div class="card-faces front">
                      <div class="logo">
                        <img
                          class="business_card_logo"
                          src="/static/assets/img/img/logo.png"
                        />
                      </div>
                      <h4 class="front-title">SPZ-BEARINGS</h4>
                      <h4 class="front-sub-title">{ServicesText.[props.locale].business_card}</h4>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section class="services_area description_without-business_card pt_200">
              <div class="container">
                <div class="section_title_one title_two text-center">
                  <h6 class="title_top">{ServicesText.[props.locale].pageTitle}</h6>
                  <h2 class="title_head">{ServicesText.[props.locale].title_second_section_not_main}</h2>
                  <p class="title_p">{ServicesText.[props.locale].title_second_section_paragraph}</p>
                </div>
                <div class="row services_inner">
                  <div class="col-md-6">
                    <div class="service_item">
                      <div class="media service_icon">
                        {" "}
                        <img
                          class="icon-modern-architecture"
                          src="/static/assets/img/img/services/drawing.png"
                        />
                        <div class="media-body">
                          {" "}
                          {ServicesText.[props.locale].services_array[1]}{" "}
                        </div>
                      </div>
                      <a
                        href="#"
                        class="theme_btn_two hover_style1"
                        tabindex="0"
                      >
                        {ServicesText.[props.locale].services_array_button}
                      </a>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="service_item">
                      <div class="media service_icon">
                        {" "}
                        <img
                          class="icon-modern-architecture"
                          src="/static/assets/img/img/services/2431398_calculater_calculation_calculator_finance_math_icon.png"
                        />
                        <div class="media-body"> {ServicesText.[props.locale].services_array[0]} </div>
                      </div>
                      <a
                        href="#"
                        class="theme_btn_two hover_style1"
                        tabindex="0"
                      >
                        {ServicesText.[props.locale].services_array_button}
                      </a>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="service_item">
                      <div class="media service_icon">
                        {" "}
                        <img
                          class="icon-modern-architecture"
                          src="/static/assets/img/img/services/3d-printer.png"
                        />
                        <div class="media-body">
                          {" "}
                          {ServicesText.[props.locale].services_array[2]}
                        </div>
                      </div>
                      <a
                        href="#"
                        class="theme_btn_two hover_style1"
                        tabindex="0"
                      >
                        {ServicesText.[props.locale].services_array_button}
                      </a>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="service_item">
                      <div class="media service_icon">
                        {" "}
                        <img
                          class="icon-modern-architecture"
                          src="/static/assets/img/img/services/1054949_truck_delivery_shipping_transportation_icon.png"
                        />
                        <div class="media-body">
                        {ServicesText.[props.locale].services_array[3]}
                        </div>
                      </div>
                      <a
                        href="#"
                        class="theme_btn_two hover_style1"
                        tabindex="0"
                      >
                        {ServicesText.[props.locale].services_array_button}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {showPlayer ? 
              <div className="modal_youtube_wrapper">
                <div className="youtube_button_player_wrapper">
                  <button onClick={()=>setShowPlayer(false)} className="youtube_close_button">X</button>
                  <YouTube className="youtube_player" videoId="qrG0N3bC9iU" opts={opts} onReady={_onReady} />
                </div>
              </div> : null}

            <section class="cons_work_area cons_video_area p-0">
              <div class="cons_work_left">
                <div class="cons_about_content">
                  <h6 class="title_top">
                  {ServicesText.[props.locale].video_section_title}
                  </h6>
                  <h2 class="title_head">{ServicesText.[props.locale].video_section_title_not_main} </h2>
                  <p>
                  {ServicesText.[props.locale].video_section_description}
                  </p>
                  <a href="#" class="text_btn" data-text="Контакты">
                  {ServicesText.[props.locale].video_section_button}
                  </a>
                </div>
              </div>
              <div class="cons_work_right">
                {" "}
                <img
                  src="/static/assets/img/img/services/video_img.jpg"
                  alt=""
                />{" "}
                <a onClick={(e)=>{e.preventDefault(); setShowPlayer(true)}} href="#" class="video_icon">
                  <span>
                    <i class="fas fa-play"></i>
                  </span>
                </a>{" "}
              </div>
            </section>

            <section class="cons_logo_area_four pt_200">
              <div class="container">
                <div class="section_title_three title_three text-center">
                  <h6 class="title_top services_title_margin">{ServicesText.[props.locale].partners_title}</h6>
                  <div class="clients_logo_inner">
                    {" "}
                    <a href="#" class="clients_logo">
                      {" "}
                      <img
                        src="/static/assets/img/img/home-three/01.png"
                        alt=""
                      />{" "}
                      <img
                        src="/static/assets/img/img/home-three/01-yellow.png"
                        alt=""
                      />{" "}
                    </a>{" "}
                    <a href="#" class="clients_logo">
                      {" "}
                      <img
                        src="/static/assets/img/img/home-three/02.png"
                        alt=""
                      />{" "}
                      <img
                        src="/static/assets/img/img/home-three/02-yellow.png"
                        alt=""
                      />{" "}
                    </a>{" "}
                    <a href="#" class="clients_logo">
                      {" "}
                      <img
                        src="/static/assets/img/img/home-three/03.png"
                        alt=""
                      />{" "}
                      <img
                        src="/static/assets/img/img/home-three/03-yellow.png"
                        alt=""
                      />{" "}
                    </a>{" "}
                    <a href="#" class="clients_logo">
                      <img
                        src="/static/assets/img/img/home-three/06.png"
                        alt=""
                      />{" "}
                      <img
                        src="/static/assets/img/img/home-three/06-yellow.png"
                        alt=""
                      />{" "}
                    </a>{" "}
                    <a href="#" class="clients_logo">
                      {" "}
                      <img
                        src="/static/assets/img/img/home-three/03.png"
                        alt=""
                      />{" "}
                      <img
                        src="/static/assets/img/img/home-three/03-yellow.png"
                        alt=""
                      />{" "}
                    </a>{" "}
                    <a href="#" class="clients_logo">
                      {" "}
                      <img
                        src="/static/assets/img/img/home-three/06.png"
                        alt=""
                      />{" "}
                      <img
                        src="/static/assets/img/img/home-three/06-yellow.png"
                        alt=""
                      />{" "}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section class="cons_contact_area_four work_offers">
              <div class="container">
                <div class="cons_contact_info_two bg_gradient text-center">
                  <h4>{ServicesText.[props.locale].redirect_card_title}</h4>
                  <p>{ServicesText.[props.locale].redirect_card_title_second}</p>
                  <a class="theme_btn theme_btn_three hover_style1" href="#">
                  {ServicesText.[props.locale].redirect_card_button}
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
