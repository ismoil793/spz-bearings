import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import Link from 'next/link'
import React, {useState, useEffect} from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";
import Fade from "../../components/Animations/Fade";
// import FadeTop from "../../components/Animations/FadeTop";
// import FadeLeft from "../../components/Animations/FadeLeft";
// import FadeRight from "../../components/Animations/FadeRight";
import axios from "axios";
import keys from "../../api-spz/constants";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {fetchSubCategory} from "../../store/actions/subCategory";
import homeText from "../../static/locales/home";
import SearchProducts from "../../components/SearchProducts";

export default function servicesPage(props) {

   const [animation, setAnimation] = useState(true)
   const {query} = useRouter()
   const dispatch = useDispatch();
   const {subCategories} = useSelector(state => state.subCategory)

   useEffect(() => {
      if (query.id)
         dispatch(fetchSubCategory(query.id))
   }, [query])

   const {categories, locale} = props
   const currentCategory = categories?.find(cat => cat.id === +query.id) || {}

   const renderSubCategories = () => (
       subCategories?.length && subCategories.map(subCat => {
          const bearing = (
              <div className="product_item sub-category">
                 <div className="product_img">
                    <img
                        className="img-fluid shop_fluid_img"
                        src={`${keys.BASE_URL}/${subCat.image}`}
                        alt=""
                    />
                    <Link href={`/shop/sub-category/${subCat.id}?categoryID=${currentCategory.id}`}>
                       <a className="theme_btn_two hover_style1">
                          {homeText[locale].technologies_section.button}
                       </a>
                    </Link>
                 </div>
                 <div className="product_text">
                    <h4>{subCat[`title_${locale}`]}</h4>
                 </div>
              </div>
          )
          return (
              <div key={subCat.id} className="col-lg-4 col-sm-6">
                 {
                    animation ?
                        <Fade scale={0.5} delay={subCat.delay}>
                           {bearing}
                        </Fade>
                        : bearing
                 }
              </div>
          )
       })
   )

   const getCategoryHtml = (currentCategory) => {
      const description = currentCategory[`description_${locale}`]
      if (description) {
         const parsed = JSON.parse(description)
         return parsed[1]
      }
      return ''
   }

   return (
       <>
          <Head>
             <title>{currentCategory[`meta_title_${locale}`]}</title>
             <meta name="description" content={currentCategory[`meta_description_${locale}`]}/>
             <meta name="keywords" content={currentCategory[`meta_keyword_${locale}`]}/>
             <meta property="og:title" content={currentCategory[`meta_title_${locale}`]}/>
             <meta property="og:description" content={currentCategory[`meta_description_${locale}`]}/>
             <meta property="og:image" content={`${keys.BASE_URL}/${currentCategory?.image}`}/>
             <meta property="og:url" content={`https://spz-bearings.uz/shop/${currentCategory?.id}`}/>
          </Head>
          <div className={`pace ${props.isLoading ? "pace-active" : "pace-inactive"}`}>
             <div
                 className="pace-progress"
                 data-progress-text="100%"
                 data-progress="99"
                 style={{transform: "translate3d(100%, 0px, 0px)"}}
             >
                <div className="pace-progress-inner"></div>
             </div>
             <div className="pace-activity"></div>
          </div>

          <div className="body_wrapper main_index">
             <div
                 id={`preloader`}
                 className={`preloader ${props.isLoading ? "" : "load_coplate"}`}
             >
                <div className={`product_name ${props.isLoading ? "" : "load_coplate"}`}>
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
                 hideBreadCrumbs={true}
             >
                <main id="content" role="main">
                   <OverlayComponent
                       isLoading={props.isLoading}
                       locale={props.locale}
                   />

                   <div className={'breadcrumb_area category-description'}>
                      <div className="container">
                         <div className="row">
                            <div className="col-lg-10">
                               <h1>{currentCategory[`title_${locale}`]}</h1>
                               <p key={new Date().getTime()} className={'html-paragraph'}
                                  dangerouslySetInnerHTML={{__html: getCategoryHtml(currentCategory)}}>
                               </p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <section className="product_area pt-5 shops_catalogs_page-section">

                      <SearchProducts />

                      <div className="container mt-5">
                         <div className="row product_inner">
                            {renderSubCategories()}
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

   // await axios.get(`${keys.BASE_URL}/api/get-sub-categories/${context.query.id}`,
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