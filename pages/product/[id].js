import React, {useEffect, useState} from 'react';
import Head from "next/head";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";
import Layout from "../../components/Layout/layout/layout.component";
import Fade from "../../components/Animations/Fade";
import FadeTop from "../../components/Animations/FadeTop";
import axios from 'axios'
import keys from "../../api-spz/constants";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllCategories} from "../../store/actions/category";
import {fetchSubCategory} from "../../store/actions/subCategory";

const dataArray = {
   podshipniki: {
      "radialno-upornyiy-sharikovyiy": {
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
                      <td rowspan="3">Тип сепаратора</td>
                      <td>M</td>
                      <td>Латунный сепаратор, посаженный на шариках</td>
                   </tr>
                   <tr>
                      <td>E</td>
                      <td>Полимерный сепаратор</td>
                   </tr>
                   <tr>
                      <td>—</td>
                      <td>Сепаратор из стального листа. Не указывается в &nbsp;качестве стандарта</td>
                   </tr>
                   <tr>
                      <td rowspan="3">Контактный угол</td>
                      <td>C</td>
                      <td>Контактный угол 15°</td>
                   </tr>
                   <tr>
                      <td>AC</td>
                      <td>Контактный угол 25°</td>
                   </tr>
                   <tr>
                      <td>B</td>
                      <td>Контактный угол 40°</td>
                   </tr>
                   <tr>
                      <td rowspan="3">Класс точности</td>
                      <td>P0</td>
                      <td>Нормальный класс точности. Не указывается в качестве стандарта</td>
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
               series: 'Серия: : 70…',
               url: "/static/assets/img/img/product/productbyid/radialno-upornyiy-sharikovyiy/1.jpg",
            },
            {
               type: 'imagesByDescription',
               decription: ['СЕРИЯ 60', "СЕРИЯ 62... 63...", "Серия: 64… 622… 623…", "Серия: 160…"],
               imagesSRC: [
                  "/static/assets/img/img/product/productbyid/radialno-upornyiy-sharikovyiy/gost-1.jpg",
                  "/static/assets/img/img/product/productbyid/radialno-upornyiy-sharikovyiy/gost-2.jpg",
                  "/static/assets/img/img/product/productbyid/radialno-upornyiy-sharikovyiy/gost-3.jpg",
                  "/static/assets/img/img/product/productbyid/radialno-upornyiy-sharikovyiy/gost-4.jpg",
                  "/static/assets/img/img/product/productbyid/radialno-upornyiy-sharikovyiy/gost-5.jpg",
                  "/static/assets/img/img/product/productbyid/radialno-upornyiy-sharikovyiy/gost-6.jpg"
               ],
               series: [
                  'Серия: : 70…', 'Серия: 70… 72…', 'Серия: Серия: 72… 73…', 'Серия: 73…', 'Серия: 73… 74…'
               ]
            }
         ],
      },
   },
};

const ProductPage = (props) => {
   const [descriptionArray, setDescriptionArray] = useState([true, false, false])
   const setDescription = (id) => {
      let array = descriptionArray.map((item, index) => (index === id ? true : false))
      setDescriptionArray(array)
   }

   const products = props.products || []

   const createMarkup = (html) => {
      return {__html: html};
   }

   const {query} = useRouter()
   const dispatch = useDispatch();
   const {subCategories} = useSelector(state => state.subCategory)

   useEffect(() => {
      dispatch(fetchSubCategory(query.categoryID))
   }, [])

   const currentSubCategory = subCategories.find(subCat => subCat.id === +query.id) || {}

   console.log(currentSubCategory)

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
                 videoPreloader={props.videoPreloader}
                 isLoading={props.isLoading}
                 title={"Подшипник радиально-упорный шариковый"}
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
                                         src="/static/assets/img/img/product/products/podshipnik-radialno-uporniy.jpg"
                                         alt=""
                                     />
                                  </Fade>
                               </div>
                            </div>
                            <div class="col-lg-6">
                               <FadeTop delay={1.8}>
                                  <div class="p_details_text">
                                     <h3>{products[0].title_ru}</h3>
                                     <div
                                         dangerouslySetInnerHTML={createMarkup(JSON.parse(products[0].description_ru)[1])}>
                                     </div>

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
                                  </div>
                               </FadeTop>
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


                                     {dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[0].contentTable}


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
                                     <h5 className="description_title col-12">{dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[1].series}</h5>
                                     <img className="product_description_section_img"
                                          src={dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[1].url}/>
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
                                     <h5 className="description_title col-10">{dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[2].series[0]}</h5>
                                     <div className="row centered">
                                        <img className="description_gost_images col-6"
                                             src={dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[2].imagesSRC[0]}/>
                                        <img className="description_gost_images col-6"
                                             src={dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[2].imagesSRC[1]}/>
                                     </div>
                                     <h5 className="description_title col-10">{dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[2].series[1]}</h5>
                                     <div className="row centered">
                                        <img className="description_gost_images col-12"
                                             src={dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[2].imagesSRC[2]}/>
                                     </div>
                                     <h5 className="description_title col-10">{dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[2].series[2]}</h5>
                                     <div className="row centered">
                                        <img className="description_gost_images col-12"
                                             src={dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[2].imagesSRC[3]}/>
                                     </div>
                                     <h5 className="description_title col-10">{dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[2].series[3]}</h5>
                                     <div className="row centered">
                                        <img className="description_gost_images col-12"
                                             src={dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[2].imagesSRC[4]}/>
                                     </div>
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
};


export const getServerSideProps = async (context) => {

   let data = {};

   await axios.get(`${keys.BASE_URL}/api/get-products/${context.query.id}`,
       {params: {}})
       .then(res => data = res.data.data)
       .catch(e => {
          // for some reason it is not reaching this line when product is not found
          context.res.statusCode = 302
          context.res.setHeader('Location', `/404`)
          return {props: {}}
       })

   // same as in catch -> it will redirect to 404
   if (!Array.isArray(data)) {
      return {
         redirect: {
            permanent: false,
            destination: "/404",
         },
         props: {},
      };
   }

   return {
      props: {
         products: data
      }
   }
}

export default ProductPage;