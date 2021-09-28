import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React, { useState } from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";

const dataArray = {
  podshipniki: {
    "sharikovyiy-radialnyiy": {
      content: [
        {
          type: "table",
          contentTable: (
            <tbody>
              <tr class="tabletop">
                <td>Название</td>
                <td>Символ</td>
                <td>Описание</td>
              </tr>
              <tr>
                <td rowspan="4">Тип уплотнения</td>
                <td>ZZ</td>
                <td>Металлические пыльники с обеих сторон</td>
              </tr>
              <tr>
                <td>2RS</td>
                <td>Резиновое уплотнение с обеих сторон</td>
              </tr>
              <tr>
                <td>Z</td>
                <td>Металлический пыльник с одной стороны</td>
              </tr>
              <tr>
                <td>RS</td>
                <td>Резиновое уплотнение с одной стороны</td>
              </tr>
              <tr>
                <td rowspan="5">Радиальный внутренний зазор</td>
                <td>C2</td>
                <td>Зазор подшипника меньше нормального</td>
              </tr>
              <tr>
                <td>CN</td>
                <td>Нормальный зазор</td>
              </tr>
              <tr>
                <td>C3</td>
                <td>Зазор подшипника больше нормального</td>
              </tr>
              <tr>
                <td>C4</td>
                <td>Зазор подшипника больше чем С3</td>
              </tr>
              <tr>
                <td>C5</td>
                <td>Зазор подшипника больше чем С4</td>
              </tr>
              <tr>
                <td rowspan="3">Другие технические изменения</td>
                <td>NR</td>
                <td>
                  Канавка с заложенным пружинным кольцом в наружном кольце
                </td>
              </tr>
              <tr>
                <td>N</td>
                <td>Канавка пружинного кольца в наружномкольце</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>Нержавеющая сталь</td>
              </tr>
              <tr>
                <td rowspan="3">Тип сепаратора</td>
                <td>M</td>
                <td>Латунный сепаратор, посаженный на шариках</td>
              </tr>
              <tr>
                <td>MB</td>
                <td>Латунный сепаратор, центрированный повнутреннему кольцу</td>
              </tr>
              <tr>
                <td>MA</td>
                <td>Латунный сепаратор, центрированный повнешнему кольцу</td>
              </tr>
              <tr>
                <td rowspan="4">Скоростные обороты</td>
                <td>V</td>
                <td>Нормальный уровень вибрации</td>
              </tr>
              <tr>
                <td>V2</td>
                <td>Уровень вибрации ниже нормального</td>
              </tr>
              <tr>
                <td>V3</td>
                <td>Уровень вибрации ниже, чем V2</td>
              </tr>
              <tr>
                <td>V4</td>
                <td>Уровень вибрации ниже, чем V3</td>
              </tr>
              <tr>
                <td rowspan="3">Класс точности</td>
                <td>P0</td>
                <td>
                  Нормальный класс точности. Не указывается в качестве стандарта
                </td>
              </tr>
              <tr>
                <td>P6</td>
                <td>Более высокий класс точности (чем нормальный)</td>
              </tr>
              <tr>
                <td>P5</td>
                <td>Более высокий класс точности (чем P6)</td>
              </tr>
            </tbody>
          ),
        },
        {
          type: "image",
          url: "/static/assets/img/img/product/productbyid/sharikovyiy - radialnyiy/1.jpg",
        },
        {
          type: "image",
          url: "/static/assets/img/img/product/productbyid/sharikovyiy - radialnyiy/2.jpg",
        },
        {type: 'imagesByDescription', decription: ['СЕРИЯ 60', "СЕРИЯ 62... 63...", "Серия: 64… 622… 623…", "Серия: 160…"], imagesSRC: [
          "/static/assets/img/img/product/productbyid/sharikovyiy - radialnyiy/gost-1.jpg",
          "/static/assets/img/img/product/productbyid/sharikovyiy - radialnyiy/gost-2.jpg",
          "/static/assets/img/img/product/productbyid/sharikovyiy - radialnyiy/gost-3.jpg",
          "/static/assets/img/img/product/productbyid/sharikovyiy - radialnyiy/gost-4.jpg",
          "/static/assets/img/img/product/productbyid/sharikovyiy - radialnyiy/gost-5.jpg",
          "/static/assets/img/img/product/productbyid/sharikovyiy - radialnyiy/gost-6.jpg",
          "/static/assets/img/img/product/productbyid/sharikovyiy - radialnyiy/gost-7.jpg",
        ]}
      ],
    },
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
          title={"Подшипник шариковый радиальный"}
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
                        src="/static/assets/img/img/product/products/podshipnik-sharikoviy.png"
                        alt=""
                      />{" "}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="p_details_text">
                      <h3>Подшипник шариковый</h3>
                      <p>
                      РАДИАЛЬНЫЕ ОДНОРЯДНЫЕ ШАРИКОВЫЕ ПОДШИПНИКИ СЕРИЯ: 60… 62… 63… 64… 622.. 623… 160… 618… 619…
                      </p>

                      <a class="theme_btn_two hover_style1" href="#">
                        Контакты
                      </a>
                      <ul class="nav flex-column team_list">
                        <li>
                          Номенклатура:<a href="#"> 3009829</a>
                        </li>
                        <li>
                          Категория:<a href="#"> Подшипники</a>
                        </li>
                        <li>
                          Тэги:<a href="#"> Подшипники</a>
                        </li>
                      </ul>
                      {/* <ul class="nav share_icon">
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
                    <li class="nav-item" role="presentation">
                      {" "}
                      <a onClick={(e)=>{e.preventDefault(); setDescription(1)}}
                        class={`nav-link ${descriptionArray[1] ? 'active' : ''}`}
                        id="profile-tab"
                        data-toggle="tab"
                        href="#"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Чертежи
                      </a>{" "}
                    </li>
                    <li class="nav-item" role="presentation">
                      {" "}
                      <a onClick={(e)=>{e.preventDefault(); setDescription(2)}}
                        class={`nav-link ${descriptionArray[2] ? 'active' : ''}`}
                        id="profile-tab"
                        data-toggle="tab"
                        href="#"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        ГОСТЫ
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
                      <h4 className="description_title">ОДНОРЯДНЫЕ</h4>
                      <div class="row centered">
                        
                        
                        {dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[0].contentTable}



                      </div>
                    </div>


                    <div
                      class={`tab-pane fade description_product_content ${descriptionArray[1] ? 'show active' : ''}`}
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >                 
                        <div class="row centered">
                        <h4 className="description_title">Чертежи</h4>
                        <h5 className="description_title col-12">{dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].decription[0]}</h5>
                          <img className="product_description_section_img" src={dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[1].url} />
                        <h5 className="description_title col-12">{dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].decription[2]}</h5>
                          <img className="product_description_section_img" src={dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[2].url} />
                      </div>
                    </div>


                    <div
                      class={`tab-pane fade description_product_content ${descriptionArray[2] ? 'show active' : ''}`}
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >                 
                        <div class="row centered">
                            <h4 className="description_title col-12">ГОСТЫ</h4>
                        <br/>
                        <h5 className="description_title col-12">{dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].decription[0]}</h5>
                        <div className="row centered">
                          <img className="description_gost_images col-lg-6"  src={dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].imagesSRC[0]} />
                          <img className="description_gost_images col-lg-6" src={dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].imagesSRC[1]} />
                        </div>
                        <h5 className="description_title col-12">{dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].decription[1]}</h5>
                        <div className="row centered">
                          <img className="description_gost_images col-lg-6"  src={dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].imagesSRC[2]} />
                          <img className="description_gost_images col-lg-6" src={dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].imagesSRC[3]} />
                          <img className="description_gost_images col-lg-6" src={dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].imagesSRC[4]} />
                          <img className="description_gost_images col-lg-6" src={dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].imagesSRC[5]} />
                        </div>
                        <h5 className="description_title col-12">{dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].decription[2]}</h5>
                        <div className="row centered">
                          <img className="description_gost_images col-lg-6"  src={dataArray.podshipniki.['sharikovyiy-radialnyiy'].content[3].imagesSRC[6]} />

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
