import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import Link from 'next/link'
import React, {useEffect, useState} from "react";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";
import Fade from "../../components/Animations/Fade";
import keys from "../../api-spz/constants";
import homeText from "../../static/locales/home"
import SearchText from "../../static/locales/search";
import {useRouter} from "next/router";
import {API_searchProducts} from "../../api-spz/requests/search";
import SearchProductsComponent from "../../components/SearchProducts";

export default function SearchPage(props) {

   const {locale} = props
   const {query} = useRouter()
   const [products, setProducts] = useState([])
   const searchTranslate = SearchText[locale]

   useEffect(() => {
      API_searchProducts({
         q: query.search,
         lang: locale
      }).then(r => {
         setProducts(r.data.data)
      })
   }, [query])

   const renderSearchProducts = () => (
       products?.length && products.map(cat => {
          const description = JSON.parse(cat[`description_${locale}`])
          const image = JSON.parse(cat.image)[0]?.name

          const bearing = (
              <div className="product_item">
                 <div className="product_img">
                    <img
                        className="img-fluid shop_fluid_img"
                        src={`${keys.BASE_URL}/${image}`}
                        alt=""
                    />
                    <Link href={`/product/${cat.id}?subCategoryID=${cat.sub_category_id}`}>
                       <a className="theme_btn_two hover_style1">
                          {homeText[locale].technologies_section.button}
                       </a>
                    </Link>
                 </div>
                 <div className="product_text">
                    <h4>{cat[`title_${locale}`]}</h4>
                 </div>
              </div>
          )
          return (
              <div key={cat.id} className="col-lg-4 col-sm-6">
                 {
                    <Fade scale={0.5} delay={cat.delay}>
                       {bearing}
                    </Fade>
                 }
              </div>
          )
       })
   )

   return (
       <>
          <Head>
             <title>Результаты поиска</title>
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
                 title={searchTranslate.pageTitle}
                 pageInfo={searchTranslate.breadcrumb}
                 locale={props.locale}
             >
                <main id="content" role="main">
                   <OverlayComponent
                       isLoading={props.isLoading}
                       locale={props.locale}
                   />

                   <SearchProductsComponent />

                   <section className="product_area pt-5 shops_catalogs_page-section">

                      <div className="container">

                         <div className="row mt-2 mb-5">
                            <div className="col-12">
                               <h3>
                                  {searchTranslate.searchCount} {products.length} {searchTranslate.products} {searchTranslate.query} "{query.search}"
                               </h3>
                            </div>
                         </div>

                         <div className="row product_inner spz-categories">
                            {renderSearchProducts()}
                         </div>
                      </div>

                   </section>
                </main>
             </Layout>
          </div>
       </>
   );
}