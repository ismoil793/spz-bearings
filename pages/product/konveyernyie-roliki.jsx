import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React, { useState } from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";

const dataArray = {
  'konveyernyie-roliki': {
    content: [
      {
        textsArray: [
          {title: 'Конвейерные ролики', text: ' используются в различном конвейерном оборудовании.'},
          {text: 'Конвейерное оборудование представляет собой подвижное или стационарное транспортное средство, необходимое для перемещения продукции и материалов, сыпучих грузов и т.д. Область применения конвейерного оборудования чрезвычайно широка: от электроэнергетики, горнорудной промышленности, предприятий нефтегазового комплекса, черной и цветной металлургии до строительной индустрии, складского оборудования и железнодорожных станций.'},
          {text: 'Ролик является одной из важнейших деталей ленточного конвейера и представляет собой цилиндр, который вращается на шарикоподшипниках и обеспечивает бесперебойную работу транспортирующего оборудования в различных отраслях промышленности.'},
          {text: 'Ролики считаются самым нагруженным элементом в процессе работы, они нуждаются в постоянном контроле технического состояния и замены в случае необходимости, их поломка может вызвать серьезные проблемы и простой конвейера.'},
          {text: 'Мы знаем, что практически каждый конвейер — изделие уникально. Свои посадочные размеры, свои ленты, свой привод, своя система креплений. Мы готовы выполнить деталь почти для любого ленточного конвейера.'},
          {text: 'Изготовление роликов конвейерных является одним из направлений деятельности, СП “SPZ-BEARINGS” и  на нашем заводе вы можете заказать конвейерные ролики, цена на них зависит от вида и типоразмера изделия.'}
        ]
      }
    ]
  },
};

function PostProduct(props) {

  const [descriptionArray, setDescriptionArray] = useState([true, false, false])
  const setDescription = (id) => {
    let array = descriptionArray.map((item, index)=> (index === id ? true : false))
    setDescriptionArray(array)
  }
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
      <div class={`pace ${props.isLoading ? "pace-active" : "pace-inactive"}`}>
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
          <div class={`product_name ${props.isLoading ? "" : "load_coplate"}`}>
            SPZ Bearings
          </div>
        </div>
      </div>
      <div className="super_container">
        <OverlayComponent isLoading={props.isLoading} locale={props.locale} />
        <Layout
          isLoading={props.isLoading}
          videoPreloader={props.videoPreloader}
          title={"Конвейерные ролики"}
          pageInfo={["Главная", "Магазин", "Продукт"]}
          locale={props.locale}
        >
          <>
            <section class="product_details_area pt_200">
              <div class="container">
                <div class="row product_details_inner">
                
                  <div class="col-lg-12">
                    <div class="p_details_text products_without_image">
                      <h3>Конвейерные ролики</h3>

                      <a class="theme_btn_two hover_style1" href="#">
                        Контакты
                      </a>
                      <ul class="nav flex-column team_list">
                        <li>
                          Номенклатура:<a href="#"> 3009829</a>
                        </li>
                        <li>
                          Категория:<a href="#">Конвейерные ролики</a>
                        </li>
                        <li>
                          Тэги:<a href="#">Конвейерные ролики</a>
                        </li>
                      </ul>
                      {/*
                      {dataArray.podshipniki.['konveyernyie-roliki'].content[2].series[0]}
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
                      </ul> */}
                    </div>
                  </div>
                </div>

                <div class="p_details_tab">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      {" "}
                      <a onClick={(e)=>{e.preventDefault(); setDescription(0)}}
                        class={`nav-link ${descriptionArray[0] ? 'active' : ''}`}
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
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class={`tab-pane fade description_product_content ${descriptionArray[0] ? 'show active' : ''}`}
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div class="row">
                        
                        <div className="description_text">
                          <p><b>{dataArray.['konveyernyie-roliki'].content[0].textsArray[0].title}</b>{dataArray.['konveyernyie-roliki'].content[0].textsArray[0].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.['konveyernyie-roliki'].content[0].textsArray[2].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.['konveyernyie-roliki'].content[0].textsArray[3].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.['konveyernyie-roliki'].content[0].textsArray[4].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.['konveyernyie-roliki'].content[0].textsArray[5].text}</p>
                        </div>
                      

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>



            {/* <section class="interested_product">
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
            </section> */}



          </>
        </Layout>
      </div>
    </>
  );
}

export default PostProduct;
