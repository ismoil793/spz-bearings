import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";
import Link from 'next/link'

import React, {useState, useEffect} from "react";
import OverlayComponent from "../components/Layout/overlay/overlay.component";
import Fade from "../components/Animations/Fade";

export default function servicesPage(props) {

   const [checkedArray, setCheckedArray] = React.useState([true, false, false, false, false])

   const SetChecked = (id) => {
      const array = checkedArray.map((item, index) => {
         if (index === id) return true;
         else return false;
      })
      setCheckedArray(array)
   }


   return (
       <>
          <Head>
             <title>Продукция</title>
             <link
                 rel="icon"
                 href="/static/assets/img/img/favicon.ico"
                 type="image/x-icon"
             />
             <meta charset="utf-8"/>
             <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

             <meta name="viewport" content="width=device-width, initial-scale=1"/>

             <link
                 rel="stylesheet"
                 type="text/css"
                 href="/static/assets/template/avtech/styles/blog_single_responsive.css"
             />
          </Head>
          <div class={`pace ${props.isLoading ? "pace-active" : "pace-inactive"}`}>
             <div
                 class="pace-progress"
                 data-progress-text="100%"
                 data-progress="99"
                 style={{transform: "translate3d(100%, 0px, 0px)"}}
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
             <Layout
                 isLoading={props.isLoading}
                 videoPreloader={props.videoPreloader}
                 title={`Магазин`}
                 pageInfo={["Главная", "Магазин"]}
                 locale={props.locale}
             >
                <main id="content" role="main">
                   <OverlayComponent
                       isLoading={props.isLoading}
                       locale={props.locale}
                   />
                   <section class="product_area pt_200 shops_catalogs_page-section">

                      <div className="tabs">


                         <input name="tabs" type="radio" id="tab-1" checked={checkedArray[0]} class="input"
                                onClick={(e) => {
                                   SetChecked(0);
                                   console.log(checkedArray)
                                }}/>
                         <label for="tab-1" class="label">Подшипники</label>
                         <div class="panel">
                            <div class="container">
                               <div class="section_title_one">
                                  <h2 class="title_head">Показано 1-6 из 6 результатов Подшипники</h2>
                               </div>
                               <div class="row product_inner">
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.2}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/podshipnik-radialno-uporniy.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/radialno-upornyiy-sharikovyiy`}>
                                                 <a class="theme_btn_two hover_style1">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Подшипник радиально упорный</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.4}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/podshipnik-rolikoviy-konicheskiy.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/rolikovyiy-konicheskiy`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Подшипник роликовый конический</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.6}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/podshipnik-rolikoviy-radialniy.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/rolikovyiy-radialnyiy-sfericheskiy`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Подшипник роликовый радиальный</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.8}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/podshipnik-sharikoviy.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/sharikovyiy-radialnyiy`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Подшипник шариковый</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={1}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/podshipnik-silindricheskiy.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link
                                                  href={`/product/rolikovyiy-radialnyiy-s-korotkimi-tsilindricheskimi-rolikami`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Подшипник цилиндрический роликовый</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={1.2}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/podshipnik-uporniy ili uporno-radialniy.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/upornyiy-ili-uporno-radialnyiy-sharikovyiy`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Подшипник упорный или упорно-радиальный</h4>
                                           </div>
                                        </div>
                                     </Fade>
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
                                        <li class="page-item active">
                                           <a class="page-link active" href="#">
                                              1
                                           </a>
                                        </li>
                                        {/* <li class="page-item">
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
                        </li> */}
                                        <li class="page-item">
                                           <a class="page-link" href="#">
                                              След
                                           </a>
                                        </li>
                                     </ul>
                                  </nav>
                               </div>
                            </div>
                         </div>


                         <input name="tabs" checked={checkedArray[1]} type="radio" id="tab-2" class="input"
                                onClick={(e) => {
                                   SetChecked(1);
                                   console.log(checkedArray)
                                }}/>
                         <label for="tab-2" class="label">Валлы</label>
                         <div class="panel">
                            <div class="container">
                               <div class="section_title_one">
                                  <h2 class="title_head">Показано 1-3 из 3 результатов Валлы</h2>
                               </div>
                               <div class="row product_inner">
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.2}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/vall-kulachkoviy.jpg"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/valyi`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Валл кулачковый</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.4}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/vall-korobok-peredach.jpg"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/valyi`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Валл коробок передач</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.6}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/vall-stupenchatiy.jpg"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/valyi`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Валл ступенчатый</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>

                               </div>
                               <div class="pagination_area">
                                  <nav aria-label="Page navigation example">
                                     <ul class="pagination">
                                        <li class="page-item">
                                           <Link href={`/product/valyi`}>
                                              <a class="theme_btn_two hover_style1" href="#">
                                                 Описание
                                              </a>
                                           </Link>
                                        </li>
                                        <li class="page-item active">
                                           <a class="page-link active" href="#">
                                              1
                                           </a>
                                        </li>
                                        {/* <li class="page-item">
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
                        </li> */}
                                        <li class="page-item">
                                           <a class="page-link" href="#">
                                              След
                                           </a>
                                        </li>
                                     </ul>
                                  </nav>
                               </div>
                            </div>
                         </div>

                         <input name="tabs" checked={checkedArray[2]} type="radio" id="tab-3" class="input"
                                onClick={(e) => {
                                   SetChecked(2);
                                   console.log(checkedArray)
                                }}/>
                         <label for="tab-3" class="label">Втулки</label>
                         <div class="panel">
                            <div class="container">
                               <div class="section_title_one">
                                  <h2 class="title_head">Показано 1-5 из 5 результатов Втулки</h2>
                               </div>
                               <div class="row product_inner">
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.2}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/vtulka-podshipnikoviye.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/vtulki`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Втулка подшипниковая</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.4}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/vtulka-rezbovaya.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/vtulki`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Втулка резьбовая</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.6}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/vtulka-shkvornya.jpg"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/vtulki`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Втулка шкворня</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.8}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/vtulka-skoljeniya.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/vtulki`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Втулка скольжения</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={1.0}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/vtulka-zakrepitelnaya.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/vtulki`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Втулка закрепительная</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>


                               </div>
                               <div class="pagination_area">
                                  <nav aria-label="Page navigation example">
                                     <ul class="pagination">
                                        <li class="page-item">
                                           <a class="page-link active" href="#">
                                              Пред
                                           </a>
                                        </li>
                                        <li class="page-item active">
                                           <a class="page-link" href="#">
                                              1
                                           </a>
                                        </li>
                                        {/* <li class="page-item">
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
                        </li> */}
                                        <li class="page-item">
                                           <a class="page-link" href="#">
                                              След
                                           </a>
                                        </li>
                                     </ul>
                                  </nav>
                               </div>
                            </div>
                         </div>


                         <input name="tabs" checked={checkedArray[3]} type="radio" id="tab-4" class="input"
                                onClick={(e) => {
                                   SetChecked(3);
                                   console.log(checkedArray)
                                }}/>
                         <label for="tab-4" class="label">Шестерня</label>
                         <div class="panel">
                            <div class="container">
                               <div class="section_title_one">
                                  <h2 class="title_head">Показано 1-5 из 5 результатов Шестерня</h2>
                               </div>
                               <div class="row product_inner">
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.2}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/shesternya-konicheskaya.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/shesterni`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Шестерня коническая</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.4}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/shesternya-kosozubaya.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/shesterni`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Шестерня косозубая</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.6}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/shesternya-tsilindricheskaya s pryamim zubom.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/shesterni`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Шестерня цилиндрическая с прямым зубом</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={1}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/shesternya-valla.jpg"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/shesterni`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Шестерня валла</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={1.2}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/shesternya-zubchataya.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/shesterni`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Шестерня зубчатая</h4>
                                           </div>
                                        </div>
                                     </Fade>
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
                                        <li class="page-item active">
                                           <a class="page-link" href="#">
                                              1
                                           </a>
                                        </li>
                                        {/* <li class="page-item">
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
                        </li> */}
                                        <li class="page-item">
                                           <a class="page-link" href="#">
                                              След
                                           </a>
                                        </li>
                                     </ul>
                                  </nav>
                               </div>
                            </div>
                         </div>


                         <input name="tabs" checked={checkedArray[4]} type="radio" id="tab-5" class="input"
                                onClick={(e) => {
                                   SetChecked(4);
                                   console.log(checkedArray)
                                }}/>
                         <label for="tab-5" class="label">Конвейерные ролики</label>
                         <div class="panel">
                            <div class="container">
                               <div class="section_title_one">
                                  <h2 class="title_head">Показано 1-5 из 5 результатов Конвейерные ролики</h2>
                               </div>
                               <div class="row product_inner">
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.2}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/konveyrniye roliki-gladkie.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/konveyernyie-roliki`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Конвейерные ролики гладкие</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.4}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/konveyrniye roliki-amortiziruyushie.jpg"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/konveyernyie-roliki`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Конвейерные ролики амортизирующие</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.6}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/konveyrniye roliki-stryaxivayushie.jfif"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/konveyernyie-roliki`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Конвейерные ролики стряхивающие</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={0.8}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/konveyrniye roliki-ochistniye.png"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/konveyernyie-roliki`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Конвейерные ролики очистные</h4>
                                           </div>
                                        </div>
                                     </Fade>
                                  </div>
                                  <div class="col-lg-4 col-sm-6">
                                     <Fade scale={0.5} delay={1}>
                                        <div class="product_item">
                                           <div class="product_img">
                                              {" "}
                                              <img
                                                  class="img-fluid shop_fluid_img"
                                                  src="/static/assets/img/img/product/products/konveyrniye roliki-girlyandovye.jfif"
                                                  alt=""
                                              />{" "}
                                              <i class="far fa-heart heart_icon"></i>{" "}
                                              <Link href={`/product/konveyernyie-roliki`}>
                                                 <a class="theme_btn_two hover_style1" href="#">
                                                    Описание
                                                 </a>
                                              </Link>
                                           </div>
                                           <div class="product_text">
                                              <h4>Конвейерные ролики гирляндовые</h4>
                                           </div>
                                        </div>
                                     </Fade>
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
                                        <li class="page-item active">
                                           <a class="page-link" href="#">
                                              1
                                           </a>
                                        </li>
                                        {/* <li class="page-item">
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
                        </li> */}
                                        <li class="page-item">
                                           <a class="page-link" href="#">
                                              След
                                           </a>
                                        </li>
                                     </ul>
                                  </nav>
                               </div>
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
