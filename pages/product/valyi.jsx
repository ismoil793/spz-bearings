import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React, { useState } from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";

const dataArray = {
  valyi: {
    content: [
      {
        textsArray: [
          {title: 'Валы', text: ' — это металлические детали цилиндрической формы с круглым или квадратным сечением, используемые в различных устройствах и механизмах машин для передачи механической энергии. Валы передают крутящий момент и воспринимают действующие силы со стороны расположенных на них деталей или опор.'},
          {text: 'В зависимости от назначения, валы могут изготавливаться различных размеров и форм.'},
          {text: 'Также  различным бывает и материал, из которого изготавливаются валы:  они  могут быть сделаны как из алюминиевых сплавов, специальных  жаропрочных сталей или титановых сплавов, наиболее часто валы производятся из  качественной легированной стали.'},
          {text: 'В процессе изготовления валов стальные заготовки подвергаются большому количеству операций:  первоначально  заготовке придаются основные формы и размеры:  обточка и расточка валов осуществляется  на токарных станках с ЧПУ и прецизионными борштангами, что  позволяет осуществить качественную обработку даже больших валов как изнутри, так и с наружной поверхности.  В дальнейшем осуществляется сварка отдельных элементов вала и фрезерование шпоночных канавок и проточек. После этого почти готовые валы шлифуются для придания им  особо точных размеров. Осуществить точную шлифовку валов на производстве помогают лазерные методы измерения размеров.'},
          {text: 'Для проверки качества все валы проходят динамическую балансировку: некачественный  вал  может создавать существенные потери при передаче энергии, а значит  приводить к сбоям в работе оборудования.'},
          {text: 'Производство валов – одно из востребованных направлений  в металлургической промышленности. Производство валов  может осуществляться как по  государственным стандартам для техники и оборудования, регламентируемого ГОСТами,  так и на основании  индивидуальных чертежей и  макетов для отдельных видов  оборудования.'},
          {textUl: 'Наш завод имеет возможность изготовления валов и валов-шестерней со следующими параметрами:', listItems: ['Ø до 1500 мм;', 'длина до 4000 мм;', 'зубонарезание до модуля 8;', 'шлиценарезание Ø до 12  мм, длина до 1000 мм;', 'термообработка: ТВЧ, улучшение, нормализация;']},
          {textUl: 'Наши преимущества:', listItems: ['Заготовка в наличии, контроль УЗК;', 'Срок изготовления 25 — 45 дней в зависимости от конфигурации;', 'Конкурентная цена;']},      
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
                      <h3>Валлы</h3>

                      <a class="theme_btn_two hover_style1" href="#">
                        Контакты
                      </a>
                      <ul class="nav flex-column team_list">
                        <li>
                          Номенклатура:<a href="#"> 3009829</a>
                        </li>
                        <li>
                          Категория:<a href="#">Валлы</a>
                        </li>
                        <li>
                          Тэги:<a href="#">Валлы</a>
                        </li>
                      </ul>
                      {/*
                      {dataArray.podshipniki.['valyi'].content[2].series[0]}
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
                          <p><b>{dataArray.valyi.content[0].textsArray[0].title}</b>{dataArray.valyi.content[0].textsArray[0].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.valyi.content[0].textsArray[1].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.valyi.content[0].textsArray[2].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.valyi.content[0].textsArray[3].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.valyi.content[0].textsArray[4].text}</p>
                        </div>
                        <div className="description_text">
                          <p>{dataArray.valyi.content[0].textsArray[5].text}</p>
                        </div>
                        <ul className="description_ul">
                          {dataArray.valyi.content[0].textsArray[6].textUl}
                          {dataArray.valyi.content[0].textsArray[6].listItems.map(item => (
                            <li>{item}</li>
                          ))}
                        </ul>
                        <ul className="description_ul">
                          {dataArray.valyi.content[0].textsArray[7].textUl}
                          {dataArray.valyi.content[0].textsArray[7].listItems.map(item => (
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
