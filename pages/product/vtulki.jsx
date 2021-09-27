import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React, { useState } from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";

const dataArray = {
  vtulki: {
    content: [
      {
        textsArray: [
          {title: 'Втулки', text: ' представляют собой вращающиеся детали, предназначенные для монтажа и крепления инструментов, а также различных частей механизмов. Использование в конструкции втулок позволяет снизить нагрузки на трущиеся элементы.'},
          {text: 'На нашем заводе квалифицированные специалисты проводят разработку, подготовку проекта и производство втулок согласно действующим стандартам, а также в соответствии с сертификатами качества. Имеем возможность изготовления продукции по собственным чертежам заказчика, что позволяет максимально адаптировать втулки к существующему оборудованию.'},
          {textUl: 'Большинство видов втулок мы изготавливаем литьем, а также с использованием заготовок из металлопроката, которые в дальнейшем подвергаются механической обработке. В качестве материала для подобных деталей используется бронза, латунь и чугун. Для обработки поверхностей применяются ручные токарные станки или оборудование с ЧПУ, которое обеспечивает выполнение следующих технологических операций:', listItems: ['Cверление и зенкерование;', 'Нарезку резьбы;', 'Точение уступов, торцов, канавок, пазов;', 'Черновую и финишную обработку.']},
          {text: 'Благодаря применению станков с ЧПУ удается добиться соответствующей точности обработки наружных и внутренних поверхностей.'},
          {text: 'СП “SPZ-BEARINGS” готово принять заявки на изготовление втулок самых разных видов.'},
          {textUl: 'ПРЕИМУЩЕСТВА СП “SPZ-BEARINGS”:', listItems: ['Быстрый прием заказов;', 'Обработка нестандартных заявок;', 'Наличие сертифицированной лаборатории;', 'Хорошее качество продукции;', "Конкурентная цена"]},      
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
          title={"Подшипник радиально-упорный шариковый"}
          pageInfo={["Главная", "Магазин", "Продукт"]}
          locale={props.locale}
        >
          <>
            <section class="product_details_area pt_200">
              <div class="container">
                <div class="row product_details_inner">
                
                  <div class="col-lg-12">
                    <div class="p_details_text products_without_image">
                      <h3>Втулки</h3>

                      <a class="theme_btn_two hover_style1" href="#">
                        Контакты
                      </a>
                      <ul class="nav flex-column team_list">
                        <li>
                          Номенклатура:<a href="#"> 3009829</a>
                        </li>
                        <li>
                          Категория:<a href="#">Втулки</a>
                        </li>
                        <li>
                          Тэги:<a href="#">Втулки</a>
                        </li>
                      </ul>
                      {/*
                      {dataArray.podshipniki.['vtulki'].content[2].series[0]}
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
                          <p><b>{dataArray.vtulki.content[0].textsArray[0].title}</b>{dataArray.vtulki.content[0].textsArray[0].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.vtulki.content[0].textsArray[1].text}</p>
                        </div>
                        <ul className="description_ul">
                          {dataArray.vtulki.content[0].textsArray[2].textUl}
                          {dataArray.vtulki.content[0].textsArray[2].listItems.map(item => (
                            <li>{item}</li>
                          ))}
                        </ul>
                        <div className="description_text">
                          <p>{dataArray.vtulki.content[0].textsArray[3].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.vtulki.content[0].textsArray[4].text}</p>
                        </div>
                        <ul className="description_ul">
                          {dataArray.vtulki.content[0].textsArray[5].textUl}
                          {dataArray.vtulki.content[0].textsArray[5].listItems.map(item => (
                            <li>{item}</li>
                          ))}
                        </ul>
                      

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
