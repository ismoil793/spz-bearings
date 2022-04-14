import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import Link from 'next/link'
import React, {useState} from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";
import Fade from "../../components/Animations/Fade";
import FadeTop from "../../components/Animations/FadeTop";
import FadeLeft from "../../components/Animations/FadeLeft";
import FadeRight from "../../components/Animations/FadeRight";
import axios from "axios";
import keys from "../../api-spz/constants";
import homeText from "../../static/locales/home"

export default function servicesPage(props) {

   const [animation, setAnimation] = useState(true)
   const [checkedArray, setCheckedArray] = useState([true, false, false, false, false])
   const {categories, locale} = props

   const renderCategories = () => (
       categories?.length && categories.map(cat => {
          const description = JSON.parse(cat[`description_${locale}`])
          const bearing = (
              <div className="product_item">
                 <div className="product_img">
                    <img
                        className="img-fluid shop_fluid_img"
                        src={`${keys.BASE_URL}/${cat.image}`}
                        alt=""
                    />
                    <Link href={`/shop/${cat.id}`}>
                       <a className="theme_btn_two hover_style1">
                          {homeText[locale].technologies_section.button}
                       </a>
                    </Link>
                 </div>
                 <div className="product_text">
                    <h4>{cat[`title_${locale}`]}</h4>
                    <div dangerouslySetInnerHTML={{__html: description[1]}} />
                 </div>
              </div>
          )
          return (
              <div key={cat.id} className="col-lg-4 col-sm-6">
                 {
                    animation ?
                        <Fade scale={0.5} delay={cat.delay}>
                           {bearing}
                        </Fade>
                        : bearing
                 }
              </div>
          )
       })
   )

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
                 title={`Категории`}
                 pageInfo={["Главная", "Категории"]}
                 locale={props.locale}
             >
                <main id="content" role="main">
                   <OverlayComponent
                       isLoading={props.isLoading}
                       locale={props.locale}
                   />

                   <section className="product_area pt-5 shops_catalogs_page-section">

                      <div className="container">
                         <div className="row product_inner spz-categories">
                            {renderCategories()}
                         </div>
                      </div>



                      <div className={"row mb-5 pb-5"}>
                         <div className="col-md-8 offset-md-2 col-10 offset-1">
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
                                        <h5 className={"text-lg-left text-center"}>
                                           <strong>РАЗРАБОТКА КОНСТРУКТОРСКОЙ ДОКУМЕНТАЦИИ</strong>
                                        </h5>
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
                                        <h5 className={"text-lg-right text-center"}><strong>ПРОЕКТИРОВАНИЕ
                                           ОБОРУДОВАНИЯ</strong></h5>
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
                                  <Fade delay={0.5}>
                                     <h5 className={"text-center mb-5"}>
                                        <strong>РАЗРАБОТКА ТЕХНИЧЕСКОЙ ДОКУМЕНТАЦИИ</strong>
                                     </h5>
                                     <img
                                         src="/static/assets/img/img/shop/documentation.jpg"
                                         alt="Documentation"
                                         className={"d-block w-100 mb-5"}
                                     />
                                     <div className={"d-md-flex justify-content-around d-block"}>
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

export const getServerSideProps = async (context) => {

   let data = {};

   await axios.get(`${keys.BASE_URL}/api/get-categories`,
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
         categories: data
      }
   }
}