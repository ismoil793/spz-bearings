import { useRouter } from 'next/router';
import Layout from '../components/Layout/layout/layout.component';
import Head from 'next/head';
import Link from 'next/link'

import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import url from '../components/url';
import OverlayComponent from '../components/Layout/overlay/overlay.component';
export default function aboutPage(props) {

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
    <Layout isLoading={props.isLoading} compareNumber={compareNumber} cartNumber={cartNumber} title={`История Завода`} pageInfo={["Главная", "О Нас"]}>
	
        <main id="content" role="main">
        <OverlayComponent/> 
        <section class="about_main_area about_page">
            <div class="container">
                <div class="about_inner">
                    <h6 class="title_top">Как всё начиналось</h6>
                    <h2 class="title_head">О Заводе </h2>
                    <div class="about_img"> <img class="img-fluid" src="/static/assets/img/img/factoryAbout.jpg" alt=""/> </div>
                    <p> Ахунбабаевский подшипниковый завод-27 (ГПЗ-27) был построен и запущен в производство подшипников
                        в 1986 году. Это единственный в Узбекистане подшипниковый завод, специализированный по выпуску
                        роликовых и шариковых подшипников качения для разных отраслей промышленности, для
                        горнодобывающих отраслей, химической и нефтегазовой промышленности, металлургических комбинатов,
                        министерства сельского хозяйства, тепловых и гидроэлектростанций, автомобилестроения и народного
                        хозяйства.</p>
                    <p>Подшипниковую промышленность имеют только высокоразвитые страны мира: Германия, Япония, США,
                        Китай, Швеция, Россия, ещё несколько стран. Среди этих стран есть и Узбекистан. Поэтому наличие
                        в Узбекистане подшипникового завода всегда будет символом высокой технической культуры народа,
                        флагманом его промышленности. </p>
                    <p>В 2004 году на базе российских и узбекских производителей подшипниковой продукции было создано
                        совместное предприятие “SPZ-BEARINGS”. Благодаря финансовой и технической поддержке российских
                        партнёров на сегодняшний день успешно развивается производство подшипников качения, других узлов
                        и механизмов для автомобилестроения, а также запасных частей для различных областей
                        промышленности Республики Узбекистан. </p>
                    <p>СП “SPZ-BEARINGS” является единственным производителем подшипников качения в Узбекистане и
                        работает на мировом рынке более 30 лет. </p>
                </div>
            </div>
        </section>

        <section class="cons_vision_area pad_btm about_page">
            <div class="container">
                <div class="section_title_one">
                    <h6 class="title_top">Our way of thinking</h6>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="vision_item"> <a href="#" class="img_shadow"><img
                                    src="/static/assets/img/img/podshipniki_proizvodstvo.jpg" alt=""/></a>
                            <div class="content pr_100">
                                <h3 class="page_head">Производственная программа СП “SPZ-BEARINGS” включает в себя
                                    изготовление:</h3>
                                <ul className="circle_list">
                                    <li>шариковых однорядных и двухрядных – радиальных подшипников;</li>
                                    <li>радиально – сферических, радиально – упорных подшипников;</li>
                                    <li>упорных, роликовых однорядных и двухрядных — радиальных подшипников с короткими
                                        цилиндрическими роликами;</li>
                                    <li>радиально-упорных конических, радиально – сферических, радиально – упорных,
                                        подшипников.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="vision_item pl_100"> <a href="#" class="img_shadow"><img
                                    src="/static/assets/img/img/bearing_640.jpg" alt=""/></a>
                            <div class="content">
                                <h3 class="page_head">Подшипниковая продукция Ахунбабаевского подшипникового завода
                                    применяется:</h3>
                                <ul className="circle_list">
                                    <li>Горно-металлургической промышленности;</li>
                                    <li>Химической промышленности;</li>
                                    <li>Нефтегазодобывающих отраслях,
                                        предприятиях входящих в состав ГАК «Узбекэнерго»;</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        <section class="cons_service_area">
            <div class="container">
                <div class="row flex-row-reverse align-items-center service_teb_item">
                    <div class="col-lg-6 col-md-5">
                        <div class="service_img"> <img class="img-fluid" src="/static/assets/img/img/about/service4.jpg" alt=""/>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-7">
                        <div class="cons_about_content">
                            <h6 class="title_top">Мы развиваемся</h6>
                            <h2 class="title_head">С самого открытия <br />Завода мы не останавливались в развитии </h2>
                            <p>Имеющийся на подшипниковом заводе производственный и интеллектуальный потенциал позволяет
                                подшипниковому заводу выйти на высший уровень развития. Высокий уровень технического
                                персонала,
                                технологии и модернизированные оборудования позволяют обеспечивать выпуск подшипников по
                                международным стандартам ISO, разрабатывать и осваивать новые типы подшипников.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        <section class="cons_service_area">
            <div class="container">
                <div class="row flex-row-reverse align-items-center service_teb_item">
                    <div class="col-lg-6 col-md-7">
                        <div class="cons_about_content">
                            <h6 class="title_top">Качество</h6>
                            <h2 class="title_head">На предприятии действует система качества в соответствии со
                                стандартами ISO 9001</h2>
                            <p>Все подшипники компании имеют сертификат соответствия федерального агентства по
                                техническому регулированию и метрологии Российской Федерации и Национальной системы
                                сертификации республики Узбекистан, а также другие необходимые сертификаты соответствия
                                Госстандарта Республики Узбекистан и гигиенические удостоверения. Инженерно-технические
                                работники предприятия, изучая спрос потребителей, ведут постоянную работу по расширению
                                номенклатуры продукции завода.</p>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-5">
                        <div class="service_img"> <img class="img-fluid" src="/static/assets/img/img/about/service4.jpg" alt=""/>
                        </div>
                    </div>
                    <div class="about_page images_container">
                    <div class="col-md-3 col-sm-6 order-md-2 order-sm-4 item-sertificates clearfix image_item_wrapper"> <img
                            class="img-fluid" src="/static/assets/img/img/about/sertificate4.jpg" alt=""/> </div>
                    <div class="col-md-3 col-sm-6 order-md-4 order-sm-1 item-sertificates clearfix image_item_wrapper"> <img
                            class="img-fluid" src="/static/assets/img/img/about/sertificate1.jpg" alt=""/> </div>
                    <div class="col-md-3 col-sm-6 order-md-1 order-sm-2 item-sertificates clearfix image_item_wrapper"> <img
                            class="img-fluid" src="/static/assets/img/img/about/sertificate2.jpg" alt=""/> </div>
                    <div class="col-md-3 col-sm-6  order-md-3 order-sm-3 item-sertificates clearfix image_item_wrapper"> <img
                            class="img-fluid" src="/static/assets/img/img/about/sertificate3.jpg" alt=""/> </div>
                    </div>
                </div>
            </div>
        </section> 
        
        <section class="cons_contact_area_four work_offers about_page">
            <div class="container">
                <div class="cons_contact_info_two bg_gradient text-center">
                    <h4>Готовы С Нами Сотрудничать?</h4>
                    <p>Мы готовы реализовать заказ любой трудности.</p> <a
                        class="theme_btn theme_btn_three hover_style1" href="#">Написать на почту</a>
                </div>
            </div>
        </section> 		
        </main>
    

    </Layout>
		</div>
  </>)
}