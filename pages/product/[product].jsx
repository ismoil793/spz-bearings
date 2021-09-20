import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";

function PostProduct(props) {
  return (
    <>
      <Head>
        <title>{"Продукт"}</title>
        <meta charset="UTF-8" />
        <meta name="description" content={"Продукт"} />
        <meta name="keywords" content={"Продукт"} />
          
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
      <div className="super_container">
        <OverlayComponent isLoading={props.isLoading} locale={props.locale}/>
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
          title={"Продукт"}
          pageInfo={["Главная", "Магазин", "Продукт"]}
          locale={props.locale}
        >
          <>
            <section class="product_details_area pt_200">
              <div class="container">
                <div class="row product_details_inner">
                  <div class="col-lg-6">
                    <div class="project_details_img">
                      {" "}
                      <img
                        class="img-fluid"
                        src="/static/assets/img/img/product/product-details-1.jpg"
                        alt=""
                      />{" "}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="p_details_text">
                      <h3>Lorem, ipsum dolor.</h3>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Et iure tenetur explicabo at eos beatae.
                      </p>

                      <a class="theme_btn_two hover_style1" href="#">
                        Заказать
                      </a>
                      <ul class="nav flex-column team_list">
                        <li>
                          Номенклатура:<a href="#"> 3009829</a>
                        </li>
                        <li>
                          Категория:<a href="#"> Валлы</a>
                        </li>
                        <li>
                          Тэги:<a href="#"> Валлы</a>
                        </li>
                      </ul>
                      <ul class="nav share_icon">
                        <li>Поделиться:</li>
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
                <div class="p_details_tab">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      {" "}
                      <a
                        class="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Описание
                      </a>{" "}
                    </li>
                    <li class="nav-item" role="presentation">
                      {" "}
                      <a
                        class="nav-link"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Характеристики
                      </a>{" "}
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <h4>Описание</h4>
                      <div class="row">
                        <div class="col-lg-6">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aspernatur dolore adipisci sapiente quidem
                            eius, aliquam impedit nesciunt harum, ut consectetur
                            rerum, et quam delectus accusamus!
                          </p>
                        </div>
                        <div class="col-lg-6">
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Cupiditate at neque illo deserunt quaerat
                            aliquid, rerum dignissimos, similique id laudantium
                            magnam repellat dolores facilis corporis?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <h4>Характеристики</h4>
                      <div
                        class="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <h4>Описание</h4>
                        <div class="row">
                          <div class="col-lg-6">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Aspernatur dolore adipisci sapiente quidem
                              eius, aliquam impedit nesciunt harum, ut
                              consectetur rerum, et quam delectus accusamus!
                            </p>
                          </div>
                          <div class="col-lg-6">
                            <p>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Cupiditate at neque illo
                              deserunt quaerat aliquid, rerum dignissimos,
                              similique id laudantium magnam repellat dolores
                              facilis corporis?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="interested_product">
              <div class="container">
                <div class="section_title_one">
                  <h2 class="title_head">Возможно Вас заинтересуют</h2>
                </div>
                <div class="row product_inner">
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid"
                          src="/static/assets/img/img/product/product-7.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem ipsum dolor sit amet.</h4>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="product_item">
                      <div class="product_img">
                        {" "}
                        <img
                          class="img-fluid"
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
                          class="img-fluid"
                          src="/static/assets/img/img/product/product-9.jpg"
                          alt=""
                        />{" "}
                        <i class="far fa-heart heart_icon"></i>{" "}
                        <a class="theme_btn_two hover_style1" href="#">
                          Описание
                        </a>{" "}
                      </div>
                      <div class="product_text">
                        <h4>Lorem ipsum dolor sit.</h4>
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

export default PostProduct;
