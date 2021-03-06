import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React, {useState} from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";
import Fade from "../../components/Animations/Fade";
import FadeTop from "../../components/Animations/FadeTop";

const dataArray = {
   podshipniki: {
      "upornyiy-ili-uporno-radialnyiy-sharikovyiy": {
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
                      <td rowspan="2">Тип сепаратора</td>
                      <td>M</td>
                      <td>Латунный сепаратор</td>
                   </tr>
                   <tr>
                      <td></td>
                      <td>Стальной сепаратор. Не указывается в качестве&nbsp;стандарта</td>
                   </tr>
                   <tr>
                      <td>Другие технические измерения</td>
                      <td>U</td>
                      <td>Сферическая шайба</td>
                   </tr>
                   <tr>
                      <td rowspan="2">Класс точности</td>
                      <td>P0</td>
                      <td>Нормальный класс точности. Не указывается в качестве стандарта</td>
                   </tr>
                   <tr>
                      <td>P6</td>
                      <td>Более высокий класс точности (чем нормальный)</td>
                   </tr>
                   </tbody>
               ),
            },
            {
               type: "image",
               series: "Серия: : 70…",
               url: "/static/assets/img/img/product/productbyid/upornyiy-ili-uporno-radialnyiy-sharikovyiy/1.jpg",
            },
            {
               type: 'imagesByDescription',
               decription: ['СЕРИЯ 60', "СЕРИЯ 62... 63...", "Серия: 64… 622… 623…", "Серия: 160…"],
               imagesSRC: [
                  "/static/assets/img/img/product/productbyid/upornyiy-ili-uporno-radialnyiy-sharikovyiy/gost-1.jpg",
                  "/static/assets/img/img/product/productbyid/upornyiy-ili-uporno-radialnyiy-sharikovyiy/gost-2.jpg",
                  "/static/assets/img/img/product/productbyid/upornyiy-ili-uporno-radialnyiy-sharikovyiy/gost-3.jpg",
                  "/static/assets/img/img/product/productbyid/upornyiy-ili-uporno-radialnyiy-sharikovyiy/gost-4.jpg",
                  "/static/assets/img/img/product/productbyid/upornyiy-ili-uporno-radialnyiy-sharikovyiy/gost-5.jpg",
                  "/static/assets/img/img/product/productbyid/upornyiy-ili-uporno-radialnyiy-sharikovyiy/gost-6.jpg"
               ],
               series: [
                  'Серия: : 70…', 'Серия: 70… 72…', 'Серия: 72… 73…', 'Серия: 73…', 'Серия: 73… 74…'
               ]
            }
         ],
      },
   },
};

function PostProduct(props) {

   const [descriptionArray, setDescriptionArray] = useState([true, false, false])
   const setDescription = (id) => {
      let array = descriptionArray.map((item, index) => (index === id ? true : false))
      setDescriptionArray(array)
   }
   return (
       <>
          <Head>
             <title>{"Продукт"}</title>
             <meta charset="UTF-8"/>
             <meta name="description" content={"Продукт"}/>
             <meta name="keywords" content={"Продукт"}/>

             <meta
                 name="google-site-verification"
                 content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k"
             />
             <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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
             <OverlayComponent isLoading={props.isLoading} locale={props.locale}/>
             <Layout
                 isLoading={props.isLoading}
                 videoPreloader={props.videoPreloader}
                 title={"Подшипник упорный или упорно-радиальный шариковый"}
                 pageInfo={["Главная", "Магазин", "Продукт"]}
                 locale={props.locale}
             >
                <>
                   <section class="product_details_area pt_200">
                      <div class="container">
                         <div class="row product_details_inner">
                            <div class="col-lg-6">
                               <div class="project_details_img">
                                  <Fade scale={0.5} delay={1.8}>
                                     <img
                                         class="img-fluid"
                                         src="/static/assets/img/img/product/products/podshipnik-uporniy-ili-uporno-radialniy.jpg"
                                         alt=""
                                     />
                                  </Fade>
                               </div>
                            </div>
                            <div class="col-lg-6">
                               <div class="p_details_text">
                                  <FadeTop delay={1.8}>
                                     <h3>Подшипник упорный или упорно-радиальный шариковый</h3>
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
                                  </FadeTop>
                               </div>
                            </div>
                         </div>

                         <div class="p_details_tab">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                               <li class="nav-item" role="presentation">
                                  {" "}
                                  <a onClick={(e) => {
                                     e.preventDefault();
                                     setDescription(0)
                                  }}
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
                                  <a onClick={(e) => {
                                     e.preventDefault();
                                     setDescription(1)
                                  }}
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
                                  <a onClick={(e) => {
                                     e.preventDefault();
                                     setDescription(2)
                                  }}
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
                                  <div class="row centered">


                                     {dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[0].contentTable}


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
                                     <h5 className="description_title col-12">{dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[1].series}</h5>
                                     <img className="product_description_section_img"
                                          src={dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[1].url}/>
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
                                     <h5 className="description_title col-10">{dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].series[0]}</h5>
                                     <div className="row centered">
                                        <img className="description_gost_images col-6"
                                             src={dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].imagesSRC[0]}/>
                                        <img className="description_gost_images col-6"
                                             src={dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].imagesSRC[1]}/>
                                     </div>
                                     <h5 className="description_title col-10">{dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].series[1]}</h5>
                                     <div className="row centered">
                                        <img className="description_gost_images col-12"
                                             src={dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].imagesSRC[2]}/>
                                     </div>
                                     <h5 className="description_title col-10">{dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].series[2]}</h5>
                                     <div className="row centered">
                                        <img className="description_gost_images col-12"
                                             src={dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].imagesSRC[3]}/>
                                     </div>
                                     <h5 className="description_title col-10">{dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].series[3]}</h5>
                                     <div className="row centered">
                                        <img className="description_gost_images col-12"
                                             src={dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].imagesSRC[4]}/>
                                     </div>
                                     <h5 className="description_title col-10">{dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].series[4]}</h5>
                                     <div className="row centered">
                                        <img className="description_gost_images col-12"
                                             src={dataArray.podshipniki['upornyiy-ili-uporno-radialnyiy-sharikovyiy'].content[2].imagesSRC[5]}/>
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
