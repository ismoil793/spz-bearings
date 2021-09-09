import { useRouter } from 'next/router';
import Layout from '../components/Layout/layout/layout.component';
import Head from 'next/head';
import Link from 'next/link'

import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import url from '../components/url';
import OverlayComponent from '../components/Layout/overlay/overlay.component';
export default function NewsPage(props) {

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
        <title>Новости</title>
        <link rel="icon" href="/static/assets/template/avtech/images/favicon.png" type="image/x-icon"/>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
				
      
<link rel="stylesheet" type="text/css" href="/static/assets/template/avtech/styles/blog_single_responsive.css"/>    


     </Head>
		 <div className="super_container">
            <div class={`pace ${props.isLoading ? 'pace-active' : 'pace-inactive'}`}><div class="pace-progress" data-progress-text="100%" data-progress="99" style={{'transform': 'translate3d(100%, 0px, 0px)'}}>
            <div class="pace-progress-inner"></div>
                </div>
            <div class="pace-activity"></div></div>
            <div id={`preloader`} className={`preloader ${props.isLoading ? '' : "load_coplate"}`}>
                    <div class="product_name">Bearings</div>
            </div>  
    <Layout isLoading={props.isLoading} compareNumber={compareNumber} cartNumber={cartNumber} title={`Главная`} pageInfo={["Главная", "Новости"]}>
	
        <main id="content" role="main">
        <OverlayComponent/>
        <section class="blog_list_area pt_200">
            <div class="container">
                <div class="blog_list_inner">
                    <div class="row blog_l_item">
                        <div class="col-lg-6">
                            <div class="blog_l_img"> <img class="img-fluid" src="/static/assets/img/img/blog/blog-1.jpg" alt=""/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="blog_l_text">
                                <h6>Опубликовано 1 месяц назад</h6> <a href="#">
                                    <h4>Мы запустили технический центр</h4>
                                </a>
                                <p>Мы уверены что это поможет нам в реализации новых проектов</p> <a
                                    class="more_btn" href="#">Подробнее<i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="row blog_l_item">
                        <div class="col-lg-6">
                            <div class="blog_l_img"> <img class="img-fluid" src="/static/assets/img/img/blog/blog-2.jpg" alt=""/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="blog_l_text">
                                <h6>Опубликовано 2 месяца назад</h6> <a href="#">
                                    <h4>Мы выпускаем
                                        ещё одну линейку продуктов
                                        </h4>
                                </a>
                                <p>Довольных клиентов станет ещё больше</p> <a
                                    class="more_btn" href="#">Подробнее <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="row blog_l_item">
                        <div class="col-lg-6">
                            <div class="blog_l_img"> <img class="img-fluid" src="/static/assets/img/img/blog/blog-3.jpg" alt=""/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="blog_l_text">
                                <h6>Опубликовано 3 месяца назад</h6> <a href="#">
                                    <h4>Наш завод выполнил
                                        крупный заказ для Компании ...</h4>
                                </a>
                                <p>За поджимающий срок для заказчика мы успели выполнить заказ. Итог: ещё один довольный заказчик</p> <a
                                    class="more_btn" href="#">Подробнее <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="row blog_l_item">
                        <div class="col-lg-6">
                            <div class="blog_l_img"> <img class="img-fluid" src="/static/assets/img/img/blog/blog-1.jpg" alt=""/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="blog_l_text">
                                <h6>Опубликовано 4 месяца назад</h6> <a href="#">
                                    <h4>Мы запустили технический центр</h4>
                                </a>
                                <p>Мы уверены что это поможет нам в реализации новых проектов</p> <a
                                    class="more_btn" href="#">Подробнее<i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="row blog_l_item">
                        <div class="col-lg-6">
                            <div class="blog_l_img"> <img class="img-fluid" src="/static/assets/img/img/blog/blog-2.jpg" alt=""/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="blog_l_text">
                                <h6>Опубликовано 5 месяцев назад</h6> <a href="#">
                                    <h4>Мы выпускаем
                                        ещё одну линейку продуктов
                                        </h4>
                                </a>
                                <p>Довольных клиентов станет ещё больше</p> <a
                                    class="more_btn" href="#">Подробнее <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pagination_area">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item active"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">4</a></li>
                            <li class="page-item"><a class="page-link" href="#">...</a></li>
                            <li class="page-item"><a class="page-link" href="#">18</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
        </main>
    

    </Layout>
		</div>
  </>)
}