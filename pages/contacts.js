import { useRouter } from 'next/router';
import Layout from '../components/Layout/layout/layout.component';
import Head from 'next/head';
import Link from 'next/link'

import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios'
import url from '../components/url';
export default function Contact(props) {

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
      <div id={`preloader`} className={`preloader ${props.isLoading ? '' : "load_coplate"}`}>
                <div class="product_name">Bearings</div>
      </div>  
    <Layout compareNumber={compareNumber} cartNumber={cartNumber} title={`Контакты`} pageInfo={["Главная", "Контакты"]}>
	
        <main id="content" role="main">
        <section class="cons_contact_area_two map_area"> <img class="map img-fluid" src="/static/assets/img/img/home-six/map.png"
                alt=""/>
            <div class="container">
                <div class="row cons_contact_info_two">
                    <div class="map_dot">
                        <div class="map_marker one"><span></span></div>
                    </div>
                    <div class="col-lg-6">
                        <div class="cons_about_content pr_100">
                            <h6 class="title_top">Адрес:</h6>
                            <h2 class="title_head">Республика Узбекистан, Андижанская обл., Жалакудукский р-н, г. Ахунбабаев, Карасу, 3 </h2>
                            <p><i class="far fa-clock"></i> 7/7: 9:00 - 18:00</p> <a href="#"
                                class="text_btn" data-text="Позвонить">Позвонить</a>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <form action="#" class="contact_form">
                            <div class="form-group"> <input type="text" class="form-control" placeholder="Имя"/> </div>
                            <div class="form-group"> <input type="email" class="form-control"
                                    placeholder="Email"/> </div>
                            <div class="form-group"> <textarea class="form-control" name="Сообщение" id="message"
                                    cols="30" rows="10" placeholder="Message"></textarea> </div>
                            <div class="form-group"> <button type="submit"
                                    class="theme_btn theme_btn_three hover_style1">Отправить Сообщение</button> </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </main>
    

    </Layout>
		</div>
  </>)
}