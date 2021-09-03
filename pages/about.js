import { useRouter } from 'next/router';
import Layout from '../components/Layout/layout/layout.component';
import Head from 'next/head';
import Link from 'next/link'

import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import url from '../components/url';
export default function aboutPage() {

	const [cartNumber, setCartNumber] = React.useState(0)
	const [compareNumber, setCompareNumber] = React.useState(0);


	useEffect(() => {
		const cookies = new Cookies();
      axios
      .get(`${url}/api/cart/show`, {
        params: {
					device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type"),
        }
      })
      .then(response => {
    		 setCartNumber( response.data.data.items.length)
      })
      .catch(error => {
        console.log(error);
			});
			
			axios
      .get(`${url}/api/comparison/features`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type"),
         
        }
      })
      .then(response => {
      setCompareNumber(response.data.data.products.length)
      })
      .catch(error => {
        console.log(error);
      })

	}, []);
  return (
<>
    <Head>
        <title>О нас</title>
        <link rel="icon" href="/static/assets/template/avtech/images/favicon.png" type="image/x-icon"/>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
				
      
<link rel="stylesheet" type="text/css" href="/static/assets/template/avtech/styles/blog_single_responsive.css"/>    


     </Head>
		 <div className="super_container">
    <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
	
        <main id="content" role="main">
						<div className="bg-img-hero mb-14" 
						 style={{
							backgroundImage:
								"url(" + "/static/assets/img/1920x422/img1.jpg" + ")"
						}}>
					
                <div className="container">
                    <div className="flex-content-center max-width-620-lg flex-column mx-auto text-center min-height-564">
                        <h1 className="h1 font-weight-bold">О нас </h1>
                        <p className="text-gray-39 font-size-18 text-lh-default">Наши основные ценности: честность, уважение, инновация, разнообразие.</p>
                    </div>
                </div>
            </div>
            {/* <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4 mb-md-0">
                        <div className="card mb-3 border-0 text-center rounded-0">
                            <img className="img-fluid mb-3" src="/static/assets/img/500X300/img1.jpg" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="font-size-18 font-weight-semi-bold mb-3">What we really do?</h5>
                                <p className="text-gray-90 max-width-334 mx-auto">Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi faucibus magna,vitae ultrices lacus purus vitae metus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4 mb-md-0">
                        <div className="card mb-3 border-0 text-center rounded-0">
                            <img className="img-fluid mb-3" src="/static/assets/img/500X300/img2.jpg" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="font-size-18 font-weight-semi-bold mb-3">Our Vision</h5>
                                <p className="text-gray-90 max-width-334 mx-auto">Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi faucibus magna,vitae ultrices lacus purus vitae metus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-3 border-0 text-center rounded-0">
                            <img className="img-fluid mb-3" src="/static/assets/img/500X300/img3.jpg" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="font-size-18 font-weight-semi-bold mb-3">History of Beginning</h5>
                                <p className="text-gray-90 max-width-334 mx-auto">Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi faucibus magna,vitae ultrices lacus purus vitae metus.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-1 py-12 mb-10 mb-lg-15">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img className="img-fluid mb-3 rounded-circle" src="/static/assets/img/300X300/img16.jpg" alt="Card image cap"/>
                            <h2 className="font-size-18 font-weight-semi-bold mb-0">Thomas Snow</h2>
                            <span className="text-gray-41">CEO/Founder</span>
                        </div>
                        <div className="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img className="img-fluid mb-3 rounded-circle" src="/static/assets/img/300X300/img17.jpg" alt="Card image cap"/>
                            <h2 className="font-size-18 font-weight-semi-bold mb-0">Anna Baranov</h2>
                            <span className="text-gray-41">Client Care</span>
                        </div>
                        <div className="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img className="img-fluid mb-3 rounded-circle" src="/static/assets/img/300X300/img18.jpg" alt="Card image cap"/>
                            <h2 className="font-size-18 font-weight-semi-bold mb-0">Andre Kowalsy</h2>
                            <span className="text-gray-41">Support Boss</span>
                        </div>
                        <div className="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img className="img-fluid mb-3 rounded-circle" src="/static/assets/img/300X300/img19.jpg" alt="Card image cap"/>
                            <h2 className="font-size-18 font-weight-semi-bold mb-0">Pamela Doe</h2>
                            <span className="text-gray-41">Delivery Driver</span>
                        </div>
                        <div className="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img className="img-fluid mb-3 rounded-circle" src="/static/assets/img/300X300/img20.jpg" alt="Card image cap"/>
                            <h2 className="font-size-18 font-weight-semi-bold mb-0">Susan McCain</h2>
                            <span className="text-gray-41">Packaging Girl</span>
                        </div>
                        <div className="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img className="img-fluid mb-3 rounded-circle" src="/static/assets/img/300X300/img21.png" alt="Card image cap"/>
                            <h2 className="font-size-18 font-weight-semi-bold mb-0">See Details</h2>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="container mb-8 mb-lg-0">
                <div className="row mb-8">
                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-lg-6 mb-5 mb-lg-8">
                                <h3 className="font-size-18 font-weight-semi-bold text-gray-39 mb-4">Наша деятельность</h3>
                                <p className="text-gray-90">Мы поставляем профессиональное кухонное оборудование по всему Узбекистану и некоторым другим странам Центральной Азии. Оборудование, которое у нас есть, подходит для использования в ресторанах, кафе, отелях и в пищевых производствах, поскольку у нас есть тепловое, холодильное, электромеханическое, нейтральное оборудование, а также широкий ассортимент продукции для фаст-фуда. Мы работаем с ведущими производителями кухонного оборудования из Китая, Турции, России, Ирана и других стран.</p>
                            </div>
                            <div className="col-lg-6 mb-5 mb-lg-8">
                                <h3 className="font-size-18 font-weight-semi-bold text-gray-39 mb-4">История компании</h3>
                                <p className="text-gray-90">Компания «Kitmach» была основана в 2012 году в Ташкенте. Слово «Kitmach» (“kitchen” – кухня, “machinery” – оборудование) в переводе с английского означает «кухонное оборудование». В настоящее время компания имеет три филиала в городе Ташкент и более тридцати целеустремленных сотрудников работают на благо компании. Мы поставляем профессиональное кухонное оборудование по всему Узбекистану и некоторым другим странам Центральной Азии. Оборудование, которое у нас есть, подходит для использования в ресторанах, кафе, отелях и в пищевых производствах, поскольку у нас есть тепловое, холодильное, электромеханическое, нейтральное оборудование, а также широкий ассортимент продукции для фаст-фуда. Мы работаем с ведущими производителями кухонного оборудования из Китая, Турции, России, Ирана и других стран.</p>
                            </div>
                            <div className="col-lg-6 mb-5 mb-lg-8">
                                <h3 className="font-size-18 font-weight-semi-bold text-gray-39 mb-4">Наша миссия: </h3>
                                <p className="text-gray-90">Постоянно изучать рынок, искать новые продукты и быстро доставлять их нашим клиентам. </p>
                            </div>
                            <div className="col-lg-6 mb-5 mb-lg-8">
                                <h3 className="font-size-18 font-weight-semi-bold text-gray-39 mb-4">Наша цель:</h3>
                                <p className="text-gray-90">Обеспечить Узбекистан и Центральную Азию лучшим ассортиментом пищевого оборудования.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="ml-lg-8">
                            <h3 className="font-size-18 font-weight-semi-bold text-gray-39 mb-4">Наши услуги:</h3>
                    
                            <div id="basicsAccordion1" className="about-accordion">
                              
                                <div className="card mb-4 border-color-4 rounded-0">
                                    <div className="card-header card-collapse border-color-4" id="basicsHeadingOne">
                                        <h5 className="mb-0">
                                            <button type="button" className="btn btn-link btn-block flex-horizontal-center card-btn p-0 font-size-18"
                                                data-toggle="collapse"
                                                data-target="#basicsCollapseOnee"
                                                aria-expanded="true"
                                                aria-controls="basicsCollapseOnee">
                                                <span className="border border-color-5 rounded font-size-12 mr-5">
                                                    <i className="fas fa-plus"></i>
                                                    <i className="fas fa-minus"></i>
                                                </span>
                                                Поддержка 24/7
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="basicsCollapseOnee" className="collapse show"
                                        aria-labelledby="basicsHeadingOne"
                                        data-parent="#basicsAccordion1">
                                        <div className="card-body">
                                            <p className="mb-0">Находясь в сфере B2B (бизнес для бизнесa), мы чувствуем, что продукты, которые мы продаем, положительно влияют на повседневную жизни людей. Так как, покупая оборудование у нас, предприятия используют его для создания ценности для конечных потребителей. Поставляя нашим клиентам высококачественное оборудование мы упрощаем их работу, в результате чего производители будут обслуживать потребителей более качественными продуктами. Таким образом, для нас очень важно пожелания и мнение  клиентов для их работы, мы поставляем любые виды продукции из зарубежных стран исходя из потребностей и пожеланий наших клиентов. Мы рады, если предприятия, с которыми мы работаем преуспеют в своей собственной профессиональной сфере деятельности. </p>
                                        </div>
                                    </div>
                                </div>
                            

                              
                                <div className="card mb-4 border-color-4 rounded-0">
                                    <div className="card-header card-collapse border-color-4" id="basicsHeadingTwo">
                                        <h5 className="mb-0">
                                            <button type="button" className="btn btn-link btn-block flex-horizontal-center card-btn p-0 font-size-18"
                                                data-toggle="collapse"
                                                data-target="#basicsCollapseTwo"
                                                aria-expanded="false"
                                                aria-controls="basicsCollapseTwo">
                                                <span className="border border-color-5 rounded font-size-12 mr-5">
                                                    <i className="fas fa-plus"></i>
                                                    <i className="fas fa-minus"></i>
                                                </span>
                                                Лучшее качество
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="basicsCollapseTwo" className="collapse"
                                        aria-labelledby="basicsHeadingTwo"
                                        data-parent="#basicsAccordion1">
                                        <div className="card-body">
                                            <p className="mb-0">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
                            

                              
                                <div className="card mb-4 border-color-4 rounded-0">
                                    <div className="card-header card-collapse border-color-4" id="basicsHeadingThree">
                                        <h5 className="mb-0">
                                            <button type="button" className="btn btn-link btn-block flex-horizontal-center card-btn p-0 font-size-18"
                                                data-toggle="collapse"
                                                data-target="#basicsCollapseThree"
                                                aria-expanded="false"
                                                aria-controls="basicsCollapseThree">
                                                <span className="border border-color-5 rounded font-size-12 mr-5">
                                                    <i className="fas fa-plus"></i>
                                                    <i className="fas fa-minus"></i>
                                                </span>
                                                Удобная доставка
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="basicsCollapseThree" className="collapse"
                                        aria-labelledby="basicsHeadingThree"
                                        data-parent="#basicsAccordion1">
                                        <div className="card-body">
                                            <p className="mb-0">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
                            

                              
                                <div className="card mb-4 border-color-4 rounded-0">
                                    <div className="card-header card-collapse border-color-4" id="basicsHeadingFour">
                                        <h5 className="mb-0">
                                            <button type="button" className="btn btn-link btn-block flex-horizontal-center card-btn p-0 font-size-18"
                                                data-toggle="collapse"
                                                data-target="#basicsCollapseFour"
                                                aria-expanded="false"
                                                aria-controls="basicsCollapseFour">
                                                <span className="border border-color-5 rounded font-size-12 mr-5">
                                                    <i className="fas fa-plus"></i>
                                                    <i className="fas fa-minus"></i>
                                                </span>
                                                Мы заботимся о клиентах
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="basicsCollapseFour" className="collapse"
                                        aria-labelledby="basicsHeadingFour"
                                        data-parent="#basicsAccordion1">
                                        <div className="card-body">
                                            <p className="mb-0">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
             
                                <div className="card mb-4 border-color-4 rounded-0">
                                    <div className="card-header card-collapse border-color-4" id="basicsHeadingFive">
                                        <h5 className="mb-0">
                                            <button type="button" className="btn btn-link btn-block flex-horizontal-center card-btn p-0 font-size-18"
                                                data-toggle="collapse"
                                                data-target="#basicsCollapseFive"
                                                aria-expanded="false"
                                                aria-controls="basicsCollapseFive">
                                                <span className="border border-color-5 rounded font-size-12 mr-5">
                                                    <i className="fas fa-plus"></i>
                                                    <i className="fas fa-minus"></i>
                                                </span>
                                                Больше 1500+ ассортимента
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="basicsCollapseFive" className="collapse"
                                        aria-labelledby="basicsHeadingFive"
                                        data-parent="#basicsAccordion1">
                                        <div className="card-body">
                                            <p className="mb-0">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
                             
                            </div>
                           
                        </div>
                    </div>
                </div>
              
             
             
            </div>
        </main>
    

    </Layout>
		</div>
  </>)
}