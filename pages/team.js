import Layout from '../components/Layout/layout/layout.component';
import Head from 'next/head';


import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import url from '../components/url';
export default function teamPage(props) {

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
         <div class={`pace ${props.isLoading ? 'pace-active' : 'pace-inactive'}`}><div class="pace-progress" data-progress-text="100%" data-progress="99" style={{'transform': 'translate3d(100%, 0px, 0px)'}}>
          <div class="pace-progress-inner"></div>
            </div>
        <div class="pace-activity"></div></div>
         <div id={`preloader`} className={`preloader ${props.isLoading ? '' : "load_coplate"}`}>
              <div class="product_name">Bearings</div>
        </div>   
    <Layout isLoading={props.isLoading} compareNumber={compareNumber} cartNumber={cartNumber} title={`Наша Команда`} pageInfo={["Главная", "О Нас", "Наше Руководство"]}>
	
        <main id="content" role="main">
        <section class="our_founder_area pt_100 team_page_animation_section team_page-animated_part">
            <h2 class="title_head">Наше Руководство</h2>
        </section>
        <section class="our_founder_area pt_100 second_wrapper team_page_animation_section team_page-animated_part">
            <div class="team_page_animation_wrapper">

                <ul>
                    <li value="Генеральный Директор" data="Васильев Антон">
                        <a href="#">
                            <img src="/static/assets/img/img/about/team-1.jpg" />
                        </a>
                    </li>
                    <li value="Зам. Ген. Директора" data="Новиков Роман">
                        <a href="#">
                            <img src="/static/assets/img/img/about/team-3.jpg" />
                        </a>
                    </li>
                    <li value="Зам. Ген. Директора" data="Левина Екатерина">
                        <a href="#">
                            <img src="/static/assets/img/img/about/team-2.jpg" />
                        </a>
                    </li>
                    <li value="Зам. Ген. Директора" data="Андреев Анатолий">
                        <a href="#">
                            <img src="/static/assets/img/img/about/team-3.jpg" />
                        </a>
                    </li>
                    <li value="Зам. Ген. Директора" data="Румянцева Софья">
                        <a href="#">
                            <img src="/static/assets/img/img/about/team-2.jpg" />
                        </a>
                    </li>
                    <li value="Зам. Ген. Директора" data="Степанов Владислав">
                        <a href="#">
                            <img src="/static/assets/img/img/about/team-1.jpg" />
                        </a>
                    </li>
                </ul>
            </div>
        </section>
        <section class="our_founder_area pt_200 team_page-not_animated_part">
            <div class="container">
                <div class="section_title_one">
                    <h2 class="title_head">Наше Руководство</h2>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-6 col-6 photo_team">
                        <div class="our_f_item">
                            <div class="team_inner"> <img class="img-fluid" src="/static/assets/img/img/about/team-1.jpg" alt=""/>
                            </div>
                            <div class="team_name">
                                <h6>Генеральный директор</h6>
                                <h3>Сорокин Михаил Иванович</h3>
                                <ul class="nav">
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-6 photo_team">
                        <div class="our_f_item">
                            <div class="team_inner"> <img class="img-fluid" src="/static/assets/img/img/about/team-2.jpg" alt=""/>
                            </div>
                            <div class="team_name">
                                <h6>Главный инженер</h6>
                                <h3>Дмитриева Анна Ильинична</h3>
                                <ul class="nav">
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>

    <section class="our_founder_area pt_200 pb_100 team_page-not_animated_part">
        <div class="container">
            <div class="section_title_one">
                <h2 class="title_head">Заместители Генерального Директора</h2>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="our_f_item">
                        <div class="team_inner"> <img class="img-fluid" src="/static/assets/img/img/about/team-4.jpg" alt=""/>
                        </div>
                        <div class="team_name">
                            <h6>Зам. Ген. Директора</h6>
                            <h3>Комарова Ксения</h3>
                            <ul class="nav">
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="our_f_item">
                        <div class="team_inner"> <img class="img-fluid" src="/static/assets/img/img/about/team-5.jpg" alt=""/>
                        </div>
                        <div class="team_name">
                            <h6>Зам. Ген. Директора</h6>
                            <h3>Соколова Екатерина</h3>
                            <ul class="nav">
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="our_f_item">
                        <div class="team_inner"> <img class="img-fluid" src="/static/assets/img/img/about/team-6.jpg" alt=""/>
                        </div>
                        <div class="team_name">
                            <h6>Зам. Ген. Директора</h6>
                            <h3>Никулин Михаил</h3>
                            <ul class="nav">
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="our_f_item">
                        <div class="team_inner"> <img class="img-fluid" src="/static/assets/img/img/about/team-7.jpg" alt=""/>
                        </div>
                        <div class="team_name">
                            <h6>Зам. Ген. Директора</h6>
                            <h3>Николаева Анастасия</h3>
                            <ul class="nav">
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="cons_contact_area_four work_offers">
        <div class="container">
            <div class="cons_contact_info_two bg_gradient text-center">
                <h4>Хотите Попасть В Нашу Команду?</h4>
                <p>Мы Набираем Целеустремленных Сотрудников<br />Вы Можете Присоединиться В Нашу Команду</p> <a
                    class="theme_btn theme_btn_three hover_style1" href="#">Посмотреть Вакансии</a>
            </div>
        </div>
    </section> 
        </main>
        </Layout>
		</div>
  </>)
}