import Layout from '../components/Layout/layout/layout.component';
import Head from 'next/head';


import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import url from '../components/url';
export default function servicesPage(props) { 

	const [cartNumber, setCartNumber] = React.useState(0)
	const [compareNumber, setCompareNumber] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);

  return (
<>
    <Head>
        <title>Сервисы</title>
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
    <Layout isLoading={props.isLoading} compareNumber={compareNumber} cartNumber={cartNumber} title={`Сервисы`} pageInfo={["Главная", "Сервисы"]}>
	
        <main id="content" role="main">
        <section class="business_card pt_100">
            <div class="container">
                <div class="section_title_one title_two text-center">
                    <h6 class="title_top">Сервисы</h6>
                    </div></div></section>
        <div class="container business_card visit_main_wrapper">
        <section class="services_visit_wrapper">            
            <div class="col-md-12 container2">
            <div class={`card card--front ${toggle ? 'card--front--flip' : ''}`}>
              <div class="logo">
                <img src="/static/assets/img/img/home-one/logo_footer.png" class="logo__img"/>
              </div>
              <div onClick={()=>setToggle(true)} class="text">
                <div class="head">
                  <h1 class="head__name">
                    <b class="name__fn">Визитка</b>                    
                  </h1>
                  <p class="head__subtitle">Ахунбабаевский <br/> подшипниковый завод-27</p>
                  <p class="description">Информация по сервисам в обратной стороне</p>
                  <div class="our_f_item">
                    <div class="team_name">
                        <ul class="nav">
                            <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                        </ul>  
                    </div> 
                  </div>           
                </div>
                <div class="border-right"></div>
              </div>
            </div>
            
            <div class={`card card--back ${toggle ? 'card--back--flip' : ''}`}>
              <div class="card__content">
                <ul class="contact" onClick={()=>setToggle(false)}>
                  <li><a href="#">Помощь в расчетах</a></li>
                  <li><a href="#">Помощь в составлении тех задания</a></li>                  
                  <li><a href="#">Производство необходимой продукции в срок</a></li>
                  <li><a href="#">Доставка готовых изделий в любую точку мира</a></li>
                  </ul>
              </div>
            </div>
              
              <div class="card-shadow"></div>
              
            </div>
              </section>
        </div>
        
        <section class="services_area description_without-business_card pt_200">
            <div class="container">
                <div class="section_title_one title_two text-center">
                    <h6 class="title_top">Сервисы</h6>
                    <h2 class="title_head">Чем мы можем быть полезны</h2>
                    <p class="title_p">Перечень сервисов</p>
                </div>
                <div class="row services_inner">
                    <div class="col-md-6">
                        <div class="service_item">
                            <div class="media service_icon"> <img class="icon-modern-architecture" src="/static/assets/img/img/services/drawing.png"/>
                                <div class="media-body"> Помощь в составлении тех задания </div>
                            </div>
                            <a href="#" class="theme_btn_two hover_style1" tabindex="0">Подробнее</a>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="service_item">
                            <div class="media service_icon"> <img class="icon-modern-architecture" src="/static/assets/img/img/services/2431398_calculater_calculation_calculator_finance_math_icon.png"/>
                                <div class="media-body"> Помощь в расчетах </div>
                            </div>
                            <a href="#" class="theme_btn_two hover_style1" tabindex="0">Подробнее</a>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="service_item">
                            <div class="media service_icon"> <img class="icon-modern-architecture" src="/static/assets/img/img/services/3d-printer.png"/>
                                <div class="media-body"> Производство необходимой продукции в срок </div>
                            </div>
                            <a href="#" class="theme_btn_two hover_style1" tabindex="0">Подробнее</a>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="service_item">
                            <div class="media service_icon"> <img class="icon-modern-architecture" src="/static/assets/img/img/services/1054949_truck_delivery_shipping_transportation_icon.png"/>
                                <div class="media-body"> Доставка готовых изделий в любую точку мира </div>
                            </div>
                            <a href="#" class="theme_btn_two hover_style1" tabindex="0">Подробнее</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="cons_work_area cons_video_area p-0">
            <div class="cons_work_left">
                <div class="cons_about_content">
                    <h6 class="title_top">Подробное видео чем мы можем быть полезны</h6>
                    <h2 class="title_head">Посмотреть видео </h2>
                    <p>Исходя от полученного опыта в производстве в течении 30 лет мы обещаем Вам, что Вы будете довольны от сотрудничества  </p> 
                    <a href="#" class="text_btn" data-text="Контакты">Контакты</a>
                </div>
            </div>
            <div class="cons_work_right"> <img src="/static/assets/img/img/home-six/video_img.jpg" alt=""/> <a href="#"
                    class="video_icon"><span><i class="fas fa-play"></i></span></a> </div>
        </section>

        <section class="cons_logo_area_four pt_200">
            <div class="container">
                <div class="section_title_three title_three text-center">
                    <h6 class="title_top services_title_margin">Наши партнеры</h6>
                <div class="clients_logo_inner"> <a href="#" class="clients_logo"> <img
                            src="/static/assets/img/img/home-three/01.png" alt=""/> <img src="/static/assets/img/img/home-three/01-yellow.png"
                            alt=""/> </a> <a href="#" class="clients_logo"> <img src="/static/assets/img/img/home-three/02.png"
                            alt=""/> <img src="/static/assets/img/img/home-three/02-yellow.png" alt=""/> </a> <a href="#"
                        class="clients_logo"> <img src="/static/assets/img/img/home-three/03.png" alt=""/> <img
                            src="/static/assets/img/img/home-three/03-yellow.png" alt=""/> </a> <a href="#" class="clients_logo">
                        <img src="/static/assets/img/img/home-three/06.png" alt=""/> <img src="/static/assets/img/img/home-three/06-yellow.png"
                            alt=""/> </a> <a href="#" class="clients_logo"> <img src="/static/assets/img/img/home-three/03.png"
                            alt=""/> <img src="/static/assets/img/img/home-three/03-yellow.png" alt=""/> </a> <a href="#"
                        class="clients_logo"> <img src="/static/assets/img/img/home-three/06.png" alt=""/> <img
                            src="/static/assets/img/img/home-three/06-yellow.png" alt=""/> </a> 
                    </div></div>
            </div>
        </section>

        <section class="cons_contact_area_four work_offers">
            <div class="container">
                <div class="cons_contact_info_two bg_gradient text-center">
                    <h4>Заинтересовали Наши Сервисы?</h4>
                    <p>Свяжитесь с Нами, мы будем рады новому сотрудничеству</p> 
                    <a class="theme_btn theme_btn_three hover_style1" href="#">Контакты</a>
                </div>
            </div>
        </section>
        </main>
        </Layout>
		</div>
  </>)
}