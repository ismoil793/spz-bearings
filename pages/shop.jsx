import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";
import Link from 'next/link'

import React, {useState, useEffect} from "react";
import OverlayComponent from "../components/Layout/overlay/overlay.component";
import Fade from "../components/Animations/Fade";
import FadeTop from "../components/Animations/FadeTop";
import FadeLeft from "../components/Animations/FadeLeft";
import FadeRight from "../components/Animations/FadeRight";

export default function servicesPage(props) {

   const [animation, setAnimation] = useState(true)
   const [checkedArray, setCheckedArray] = useState([true, false, false, false, false])
   const [bearingsData, setBearingsData] = useState({
      byNumber: '',
      bySize: ''
   })
   const defaultBearings = [
      {
         name: 'Подшипник радиально упорный',
         slug: '/product/radialno-upornyiy-sharikovyiy',
         src: '/static/assets/img/img/product/products/podshipnik-radialno-uporniy.jpg',
         delay: 0.2,
         number: "100200",
         size: "100x90"
      },
      {
         name: 'Подшипник роликовый конический',
         slug: '/product/rolikovyiy-konicheskiy',
         src: '/static/assets/img/img/product/products/podshipnik-rolikoviy-konicheskiy.jpg',
         delay: 0.4,
         number: "3009829",
         size: "90x100"
      },
      {
         name: 'Подшипник роликовый радиальный',
         slug: '/product/rolikovyiy-radialnyiy-sfericheskiy',
         src: '/static/assets/img/img/product/products/podshipnik-rolikoviy-radialniy.jpg',
         delay: 0.6,
         number: "400599",
         size: "50x100"
      },
      {
         name: 'Подшипник шариковый',
         slug: '/product/sharikovyiy-radialnyiy',
         src: '/static/assets/img/img/product/products/podshipnik-sharikoviy.jpg',
         delay: 0.8,
         number: "12345156",
         size: "45x100"
      },
      {
         name: 'Подшипник цилиндрический роликовый',
         slug: '/product/rolikovyiy-radialnyiy-s-korotkimi-tsilindricheskimi-rolikami',
         src: '/static/assets/img/img/product/products/podshipnik-silindricheskiy.jpg',
         delay: 1,
         number: "123123123",
         size: "75x100"
      },
      {
         name: 'Подшипник упорный или упорно-радиальный',
         slug: '/product/upornyiy-ili-uporno-radialnyiy-sharikovyiy',
         src: '/static/assets/img/img/product/products/podshipnik-uporniy-ili-uporno-radialniy.jpg',
         delay: 1.2,
         number: "883459",
         size: "30x40"
      },
   ]
   const [bearings, setBearings] = useState(defaultBearings)

   const SetChecked = (id) => {
      const array = checkedArray.map((item, index) => {
         if (index === id) return true;
         else return false;
      })
      setCheckedArray(array)
   }

   const renderBearings = () => (
       bearings.map(ring => {
          const bearing = (
              <div className="product_item">
                 <div className="product_img">
                    <img
                        className="img-fluid shop_fluid_img"
                        src={ring.src}
                        alt=""
                    />
                    <i className="far fa-heart heart_icon"></i>
                    <Link href={ring.slug}>
                       <a className="theme_btn_two hover_style1">
                          Описание
                       </a>
                    </Link>
                 </div>
                 <div className="product_text">
                    <h4>{ring.name}</h4>
                 </div>
              </div>
          )
          return (
              <div key={ring.slug} className="col-lg-4 col-sm-6">
                 {
                    animation ?
                        <Fade scale={0.5} delay={ring.delay}>
                           {bearing}
                        </Fade>
                        : bearing
                 }
              </div>
          )
       })
   )

   const bearingsFilterChange = e => {
      setAnimation(false)
      if (e.target.value.trim()) {
         if (e.target.name === 'byNumber') {
            setBearings([...defaultBearings.filter(f => f.number.includes(e.target.value))])
         } else if (e.target.name === 'bySize') {
            setBearings([...defaultBearings.filter(f => f.size.includes(e.target.value))])
         }
      } else {
         setBearings(defaultBearings)
      }
      setBearingsData({
         ...bearingsData,
         [e.target.name]: e.target.value
      })
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

                   <section className="product_area pt-5 shops_catalogs_page-section">

                      <div className="row mb-5 mt-5">
                         {
                            checkedArray[0] ?
                                <div className="col-md-8 col-10 offset-1 offset-md-2">
                                   <form className={"contact_form"}>
                                      <div className={"form-group row"}>
                                         <div className={"col-md-3"}>
                                            Поиск подшипника по номеру
                                         </div>
                                         <input
                                             type="text"
                                             name={"byNumber"}
                                             onChange={bearingsFilterChange}
                                             className={"form-control col"}
                                         />
                                      </div>
                                      <div className={"form-group row"}>
                                         <div className={"col-md-3"}>
                                            Поиск подшипника по размеру
                                         </div>
                                         <input
                                             type="text"
                                             name={"bySize"}
                                             onChange={bearingsFilterChange}
                                             className={"form-control col"}
                                         />
                                      </div>
                                   </form>
                                </div>
                                : null
                         }
                      </div>

                      <div className="tabs">
                         <input name="tabs" type="radio" id="tab-1" checked={checkedArray[0]} className="input"
                                onClick={(e) => {
                                   SetChecked(0);
                                }}/>
                         <label for="tab-1" class="label">Подшипники</label>
                         <div className="panel">
                            <div className="container">
                               <div className="section_title_one">
                                  <h2 className="title_head">Показано {bearings.length} из 6 результатов Подшипники</h2>
                               </div>
                               <div class="row product_inner">
                                  {renderBearings()}
                               </div>

                               {/*<div class="pagination_area">*/}
                               {/*   <nav aria-label="Page navigation example">*/}
                               {/*      <ul class="pagination">*/}
                               {/*         <li class="page-item">*/}
                               {/*            <a class="page-link" href="#">*/}
                               {/*               Пред*/}
                               {/*            </a>*/}
                               {/*         </li>*/}
                               {/*         <li class="page-item active">*/}
                               {/*            <a class="page-link active" href="#">*/}
                               {/*               1*/}
                               {/*            </a>*/}
                               {/*         </li>*/}
                               {/*         <li class="page-item">*/}
                               {/*            <a class="page-link" href="#">*/}
                               {/*               След*/}
                               {/*            </a>*/}
                               {/*         </li>*/}
                               {/*      </ul>*/}
                               {/*   </nav>*/}
                               {/*</div>*/}
                            </div>
                         </div>


                         <input name="tabs" checked={checkedArray[1]} type="radio" id="tab-2" className="input"
                                onClick={(e) => {
                                   SetChecked(1);
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

                               {/*<div class="pagination_area">*/}
                               {/*   <nav aria-label="Page navigation example">*/}
                               {/*      <ul class="pagination">*/}
                               {/*         <li class="page-item">*/}
                               {/*            <Link href={`/product/valyi`}>*/}
                               {/*               <a class="theme_btn_two hover_style1" href="#">*/}
                               {/*                  Описание*/}
                               {/*               </a>*/}
                               {/*            </Link>*/}
                               {/*         </li>*/}
                               {/*         <li class="page-item active">*/}
                               {/*            <a class="page-link active" href="#">*/}
                               {/*               1*/}
                               {/*            </a>*/}
                               {/*         </li>*/}
                               {/*         <li class="page-item">*/}
                               {/*            <a class="page-link" href="#">*/}
                               {/*               След*/}
                               {/*            </a>*/}
                               {/*         </li>*/}
                               {/*      </ul>*/}
                               {/*   </nav>*/}
                               {/*</div>*/}


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
                               {/*<div class="pagination_area">*/}
                               {/*   <nav aria-label="Page navigation example">*/}
                               {/*      <ul class="pagination">*/}
                               {/*         <li class="page-item">*/}
                               {/*            <a class="page-link active" href="#">*/}
                               {/*               Пред*/}
                               {/*            </a>*/}
                               {/*         </li>*/}
                               {/*         <li class="page-item active">*/}
                               {/*            <a class="page-link" href="#">*/}
                               {/*               1*/}
                               {/*            </a>*/}
                               {/*         </li>*/}
                               {/*         <li class="page-item">*/}
                               {/*            <a class="page-link" href="#">*/}
                               {/*               След*/}
                               {/*            </a>*/}
                               {/*         </li>*/}
                               {/*      </ul>*/}
                               {/*   </nav>*/}
                               {/*</div>*/}
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
                            </div>
                         </div>
                      </div>


                      <div className={"row mb-5 pb-5"}>
                         <div className="col-md-8 offset-md-2 offset-1">
                            <FadeTop delay={0.5}>
                               <h4 className={"text-center mb-5 pb-5"}>
                                  <strong>
                                     Разработка конструкторских чертежей деталей. Разработка конструкторских чертежей и
                                     изготовление нестандартного оборудования. Разработка технической документации.
                                  </strong>
                               </h4>
                            </FadeTop>
                            <div className="row">
                               <div className="col-lg-6 mb-5 d-flex align-items-center">
                                  <FadeRight>
                                     <div>
                                        <h5><strong>РАЗРАБОТКА КОНСТРУКТОРСКОЙ ДОКУМЕНТАЦИИ</strong></h5>
                                        <ul>
                                           <li>Разработка чертежей деталей и узлов</li>
                                           <li>Разработка схем</li>
                                           <li>Создание эксплуатационной документации</li>
                                           <li>Оцифровка КД</li>
                                           <li>Разработка чертежей по образцу изделия (Реверс-инжиниринг)</li>
                                        </ul>
                                     </div>
                                  </FadeRight>
                               </div>
                               <div className="col-lg-6 mb-5">
                                  <FadeLeft>
                                     <img
                                         src="/static/assets/img/img/shop/construct1.jpg"
                                         alt="Construct"
                                         className={"img-fluid"}
                                     />
                                  </FadeLeft>
                               </div>
                               <div className="col-lg-6 mb-5">
                                  <FadeRight>
                                     <img
                                         src="/static/assets/img/img/shop/project.jpg"
                                         alt="Project"
                                         className={"img-fluid"}
                                     />
                                  </FadeRight>
                               </div>
                               <div className="col-lg-6 mb-5 d-flex align-items-center">
                                  <FadeLeft>
                                     <div>
                                        <h5 className={"text-right"}><strong>ПРОЕКТИРОВАНИЕ ОБОРУДОВАНИЯ</strong></h5>
                                        <ul>
                                           <li>Формирование внешнего вида изделий (промышленный дизайн)</li>
                                           <li>Разработка конструкции</li>
                                           <li>Подбор компонентов и комплектующих</li>
                                           <li>Оформление конструкторской и технической документации</li>
                                           <li>Доработка существующих проектов</li>
                                        </ul>
                                     </div>
                                  </FadeLeft>
                               </div>
                               <div className="col-12 my-5">
                                  <Fade delay={0.3}>
                                     <h5 className={"text-center mb-5"}>
                                        <strong>РАЗРАБОТКА ТЕХНИЧЕСКОЙ ДОКУМЕНТАЦИИ</strong>
                                     </h5>
                                     <img
                                         src="/static/assets/img/img/shop/documentation.jpg"
                                         alt="Documentation"
                                         className={"d-block w-100 mb-5"}
                                     />
                                     <div className={"d-flex justify-content-around"}>
                                        <ul>
                                           <p><strong>Эксплуатационная документация:</strong></p>
                                           <li>Паспорт изделия (ПС)</li>
                                           <li>Руководство по эксплуатации (РЭ)</li>
                                           <li>Программы и методики испытаний (ПМ)</li>
                                           <li>Формуляры</li>
                                        </ul>

                                        <ul>
                                           <p><strong>Нормативная документация:</strong></p>
                                           <li>Технические условия (ТУ)</li>
                                           <li>Технические инструкции (ТИ)</li>
                                           <li>Регламенты</li>
                                           <li>Рабочие инструкции</li>
                                        </ul>
                                     </div>
                                  </Fade>
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
