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
import Link from 'next/link'
import {fetchSubCategory} from "../../store/actions/subCategory";
import ContactsText from "../../static/locales/contacts";
import homeText from "../../static/locales/home";
import ImageFromJSON from "../../helpers/ImageFromJSON";

const dataArray = {
   podshipniki: {
      "radialno-upornyiy-sharikovyiy": {
         content: [
            {
               type: "table",
               contentTable: (
                   <div></div>
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
   const locale = props.locale

   const {query} = useRouter()
   const dispatch = useDispatch();
   const {subCategories} = useSelector(state => state.subCategory)

   useEffect(() => {
      if (query.categoryID)
         dispatch(fetchSubCategory(query.categoryID))
   }, [query])

   const currentSubCategory = subCategories.find(subCat => subCat.id === +query.subCategoryID) || {}
   const currentProduct = products.find(p => p.sub_category_id === +query.subCategoryID) || {}

   const createMarkup = () => {
      const description = currentProduct[`description_${locale}`]
      const html = JSON.parse(description || null)

      if (html && html[1]) {
         return html[1]
      }
      return ''
   }

   const parsedFeatures = JSON.parse(currentProduct.dynamic_features || null)

   const renderDescriptionTable = () => (
       <tbody>
       <tr className="tabletop">
          <td>Название</td>
          <td>Значение</td>
       </tr>
       {
          Object.entries(parsedFeatures).map((feat, i) => (
              <tr key={i}>
                 <td>{feat[0]}</td>
                 <td>{feat[1]}</td>
              </tr>
          ))
       }
       </tbody>
   )

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
                                     <h3>{currentProduct[`title_${locale}`]}</h3>
                                     <div
                                         key={new Date().getTime()}
                                         dangerouslySetInnerHTML={{__html: createMarkup()}}>
                                     </div>

                                     <a class="theme_btn_two hover_style1" href="#">
                                        {ContactsText[locale].breadcrumb.main}
                                     </a>
                                     <ul class="nav flex-column team_list">
                                        <li>
                                           Подкатегория:
                                           <Link
                                               href={`/shop/sub-category/${currentSubCategory.id}?categoryID=${currentSubCategory.category_id}`}
                                           >
                                              <a> {currentSubCategory[`title_${locale}`]}</a>
                                           </Link>
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
                                     {homeText[locale].technologies_section.tabDescription}
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
                                     {homeText[locale].technologies_section.blueprint}
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
                                     {homeText[locale].technologies_section.certificate}
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
                                     {renderDescriptionTable()}
                                  </div>
                               </div>


                               <div
                                   className={`tab-pane fade description_product_content ${descriptionArray[1] ? 'show active' : ''}`}
                                   id="profile"
                                   role="tabpanel"
                                   aria-labelledby="profile-tab"
                               >
                                  <div className="row centered">
                                     {/*<h4 className="description_title">*/}
                                     {/*   {homeText[locale].technologies_section.blueprint}*/}
                                     {/*</h4>*/}
                                     {/*<h5 className="description_title col-12">{dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[1].series}</h5>*/}

                                     <ImageFromJSON str={currentSubCategory?.chertej_image} index={0}/>
                                     <ImageFromJSON str={currentSubCategory?.chertej_image} index={1}/>
                                  </div>
                               </div>


                               <div
                                   class={`tab-pane fade description_product_content ${descriptionArray[2] ? 'show active' : ''}`}
                                   id="profile"
                                   role="tabpanel"
                                   aria-labelledby="profile-tab"
                               >
                                  <div class="row centered">
                                     {/*<h4 className="description_title col-12">*/}
                                     {/*   {homeText[locale].technologies_section.certificate}*/}
                                     {/*</h4>*/}
                                     {/*<br/>*/}
                                     {/*<h5 className="description_title col-10">{dataArray.podshipniki['radialno-upornyiy-sharikovyiy'].content[2].series[0]}</h5>*/}

                                     <ImageFromJSON str={currentSubCategory?.gost_image} index={0}/>
                                     <ImageFromJSON str={currentSubCategory?.gost_image} index={1}/>

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

   await axios.get(`${keys.BASE_URL}/api/get-products/${context.query.subCategoryID}`,
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