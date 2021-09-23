import { useRouter } from "next/router";
import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../components/url";
import OverlayComponent from "../components/Layout/overlay/overlay.component";

import ContactsText from '../static/locales/contacts'

export function getStaticProps({locale}) {
  return {
    props: {
      locale
    }
  }
}


export default function Contact(props) {
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
        <title>{ContactsText.[props.locale].pageTitle}</title>
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
          <div class="product_name">SPZ Bearings</div>
        </div>
        <Layout
          isLoading={props.isLoading}
          compareNumber={compareNumber}
          cartNumber={cartNumber}
          title={`Контакты`}
          pageInfo={["Главная", "Контакты"]}
          locale={props.locale}
        >
          <main id="content" role="main">
            <OverlayComponent isLoading={props.isLoading} locale={props.locale} />
            <section class="cons_contact_area_two map_area">
              {" "}
              <img
                class="map img-fluid"
                src="/static/assets/img/img/home-six/map.png"
                alt=""
              />
              <div class="container">
                <div class="row cons_contact_info_two">
                  <div class="map_dot">
                    <div class="map_marker one">
                      <span></span>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="cons_about_content pr_100">
                      <h6 class="title_top">{ContactsText.[props.locale].adress_section.title}</h6>
                      <h2 class="title_head">
                      {ContactsText.[props.locale].adress_section.adress}
                      </h2>
                      <h6 className="title_top">{ContactsText.[props.locale].phone_section.title}</h6>
                      <ul className="contacts_ul">
                        <li className="contacts_li">{ContactsText.[props.locale].phone_section.numbers[0].position}</li>
                        <li className="contacts_li_phones text_btn">+(99874) 755-20-04</li>
                        <li className="contacts_li">{ContactsText.[props.locale].phone_section.numbers[1].position}</li>
                        <li className="contacts_li_phones text_btn">+(99874) 755-18-57</li>
                        <li className="contacts_li">{ContactsText.[props.locale].phone_section.numbers[2].position}</li>
                        <li className="contacts_li_phones text_btn">+(99874) 755-23-59</li>
                        <li className="contacts_li_phones text_btn">+(99899) 557-77-75</li>
                      </ul>
                      <p>
                        <i class="far fa-clock"></i> 7/7: 9:00 - 18:00
                      </p>{" "}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <form action="#" class="contact_form">
                      <div class="form-group">
                        {" "}
                        <input
                          type="text"
                          class="form-control"
                          placeholder={`${ContactsText.[props.locale].form_section[0]}`}
                        />{" "}
                      </div>
                      <div class="form-group">
                        {" "}
                        <input
                          type="email"
                          class="form-control"
                          placeholder={`${ContactsText.[props.locale].form_section[1]}`}
                        />{" "}
                      </div>
                      <div class="form-group">
                        {" "}
                        <textarea
                          class="form-control"
                          name="Сообщение"
                          id="message"
                          cols="30"
                          rows="10"
                          placeholder={`${ContactsText.[props.locale].form_section[2]}`}
                        ></textarea>{" "}
                      </div>
                      <div class="form-group">
                        {" "}
                        <button
                          type="submit"
                          class="theme_btn theme_btn_three hover_style1"
                        >
                          {`${ContactsText.[props.locale].form_section[3]}`}
                        </button>{" "}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </Layout>
      </div>
    </>
  );
}
