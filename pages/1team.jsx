import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";
import Link  from "next/link"
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../components/url";
import OverlayComponent from "../components/Layout/overlay/overlay.component";
import TeamText from "../static/locales/team";
export default function teamPage(props) {
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
        <title>{TeamText[props.locale].pageTitle}</title>
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
      <div
            class={`pace ${
              props.isLoading ? "pace-active" : "pace-inactive"
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
          isLoading={props.isLoading}
          videoPreloader={props.videoPreloader}
          compareNumber={compareNumber}
          cartNumber={cartNumber}
          title={TeamText[props.locale].breadcrumb.main}
          pageInfo={[`${TeamText[props.locale].breadcrumb.crumbs[0]}`, `${TeamText[props.locale].breadcrumb.crumbs[1]}`, `${TeamText[props.locale].breadcrumb.crumbs[2]}`]}
          locale={props.locale}
        >
          <main id="content" role="main">
            <OverlayComponent isLoading={props.isLoading} locale={props.locale}/>
            <section class="our_founder_area pt_100 team_page_animation_section team_page-animated_part">
              <h2 class="title_head">{TeamText[props.locale].title}</h2>
            </section>
            <section class="our_founder_area pt_100 second_wrapper team_page_animation_section team_page-animated_part">
              <div class="team_page_animation_wrapper">
                <ul>
                  <li value={`${TeamText[props.locale].colegues_animated[0].position}`} data={`${TeamText[props.locale].colegues_animated[0].full_name}`}>
                    <a href="#">
                      <img src="/static/assets/img/img/about/team-1.jpg" />
                    </a>
                  </li>
                  <li value={`${TeamText[props.locale].colegues_animated[1].position}`} data={`${TeamText[props.locale].colegues_animated[1].full_name}`}>
                    <a href="#">
                      <img src="/static/assets/img/img/about/team-3.jpg" />
                    </a>
                  </li>
                  <li value={`${TeamText[props.locale].colegues_animated[2].position}`} data={`${TeamText[props.locale].colegues_animated[2].full_name}`}>
                    <a href="#">
                      <img src="/static/assets/img/img/about/team-2.jpg" />
                    </a>
                  </li>
                  <li value={`${TeamText[props.locale].colegues_animated[3].position}`} data={`${TeamText[props.locale].colegues_animated[3].full_name}`}>
                    <a href="#">
                      <img src="/static/assets/img/img/about/team-3.jpg" />
                    </a>
                  </li>
                  <li value={`${TeamText[props.locale].colegues_animated[4].position}`} data={`${TeamText[props.locale].colegues_animated[4].full_name}`}>
                    <a href="#">
                      <img src="/static/assets/img/img/about/team-2.jpg" />
                    </a>
                  </li>
                  <li value={`${TeamText[props.locale].colegues_animated[5].position}`} data={`${TeamText[props.locale].colegues_animated[5].full_name}`}>
                    <a href="#">
                      <img src="/static/assets/img/img/about/team-1.jpg" />
                    </a>
                  </li>
                </ul>
              </div>
            </section>
            <section class="our_founder_area pt_200 team_page-not_animated_part">
              <div class="container">
                <div class="section_title_one">
                  <h2 class="title_head">{TeamText[props.locale].title}</h2>
                </div>
                <div class="row justify-content-center">
                  <div class="col-md-6 col-6 photo_team">
                    <div class="our_f_item">
                      <div class="team_inner">
                        {" "}
                        <img
                          class="img-fluid"
                          src="/static/assets/img/img/about/team-1.jpg"
                          alt=""
                        />
                      </div>
                      <div class="team_name">
                        <h6>{TeamText[props.locale].colegues_not_animated[0].position}</h6>
                        <h3>{TeamText[props.locale].colegues_not_animated[0].full_name}</h3>
                        <ul class="nav">
                          <li>
                            <a href="#">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-6 photo_team">
                    <div class="our_f_item">
                      <div class="team_inner">
                        {" "}
                        <img
                          class="img-fluid"
                          src="/static/assets/img/img/about/team-2.jpg"
                          alt=""
                        />
                      </div>
                      <div class="team_name">
                      <h6>{TeamText[props.locale].colegues_not_animated[1].position}</h6>
                        <h3>{TeamText[props.locale].colegues_not_animated[1].full_name}</h3>
                        <ul class="nav">
                          <li>
                            <a href="#">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="our_founder_area pt_200 pb_100 team_page-not_animated_part">
              <div class="container">
                <div class="section_title_one">
                  <h2 class="title_head">{TeamText[props.locale].title_second}</h2>
                </div>
                <div class="row">
                  <div class="col-lg-3 col-md-4 col-6">
                    <div class="our_f_item">
                      <div class="team_inner">
                        {" "}
                        <img
                          class="img-fluid"
                          src="/static/assets/img/img/about/team-4.jpg"
                          alt=""
                        />
                      </div>
                      <div class="team_name">
                      <h6>{TeamText[props.locale].colegues_not_animated[2].position}</h6>
                        <h3>{TeamText[props.locale].colegues_not_animated[2].full_name}</h3>
                        <ul class="nav">
                          <li>
                            <a href="#">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-6">
                    <div class="our_f_item">
                      <div class="team_inner">
                        {" "}
                        <img
                          class="img-fluid"
                          src="/static/assets/img/img/about/team-5.jpg"
                          alt=""
                        />
                      </div>
                      <div class="team_name">
                      <h6>{TeamText[props.locale].colegues_not_animated[3].position}</h6>
                        <h3>{TeamText[props.locale].colegues_not_animated[3].full_name}</h3>
                        <ul class="nav">
                          <li>
                            <a href="#">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-6">
                    <div class="our_f_item">
                      <div class="team_inner">
                        {" "}
                        <img
                          class="img-fluid"
                          src="/static/assets/img/img/about/team-6.jpg"
                          alt=""
                        />
                      </div>
                      <div class="team_name">
                      <h6>{TeamText[props.locale].colegues_not_animated[4].position}</h6>
                        <h3>{TeamText[props.locale].colegues_not_animated[4].full_name}</h3>
                        <ul class="nav">
                          <li>
                            <a href="#">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-6">
                    <div class="our_f_item">
                      <div class="team_inner">
                        {" "}
                        <img
                          class="img-fluid"
                          src="/static/assets/img/img/about/team-7.jpg"
                          alt=""
                        />
                      </div>
                      <div class="team_name">
                      <h6>{TeamText[props.locale].colegues_not_animated[5].position}</h6>
                        <h3>{TeamText[props.locale].colegues_not_animated[5].full_name}</h3>
                        <ul class="nav">
                          <li>
                            <a href="#">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="cons_contact_area_four work_offers">
              <div class="container">
                <div class="cons_contact_info_two bg_gradient text-center">
                  <h4>{TeamText[props.locale].redirect_card.title}</h4>
                  <p>
                  {TeamText[props.locale].redirect_card.title_second}
                  </p>
                  <Link href={"/contacts"}>
                    <a className="theme_btn theme_btn_three hover_style1">
                      {TeamText[props.locale].redirect_card.button}
                    </a>
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </Layout>
      </div>
    </>
  );
}
