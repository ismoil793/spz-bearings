import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import Cookies from "universal-cookie";

import Layout from '../components/Layout/layout/layout.component';
import BreadCrumb from "../components/BreadCrumb";
import Head from 'next/head';
import ContstructorForm from '../components/ContstructorForm';
import url from '../components/url';
// import forGamers from "../static/assets/template/avtech/images/for_gamers.jpg";
export default function Conctructor() {
  
  const router = useRouter();
  const [cartNumber, setCartNumber] = useState(0)
	const [compareNumber, setCompareNumber] = useState(0);


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
        <title>Собери свой ПК</title>
        <link rel="icon" href="/static/assets/template/avtech/images/favicon.png" type="image/x-icon"/>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="description" content="OneTech shop project"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      
      
        {/* <link rel="stylesheet" type="text/css" href="/static/assets/template/avtech/styles/contact_responsive.css"/> */}
      
      </Head>
      <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
        <> 
			    <BreadCrumb/>
          <div className="constructor_form">
            <div className="contact_form">
              <div className="text-on-top">
                <img src="/static/assets/template/avtech/images/for_gamers.jpg" alt='for-gamer'/>
                <h2>Собери свой ПК</h2>
              </div>
              <div className="container">
                <div className="row mt-3 mt-md-5">
                  <div className="col-lg-10 offset-lg-1">
                    <div className="contact_form_container">
                      <p style={{color: "#000"}}>Соберите свой компьютер онлайн и сделайте его таким, каким хотите видеть его именно вы. <br/>
                      Kitmach Premium предоставляет большой ассортимент комплектующих для ПК. Вписывайте в поля формы предпочитаемый вами процессор, блок питания, материнскую плату, видеокарту, оперативную память – в нашем интернет-магазине вы найдете все, что вам нужно. <br/>
                      Отправляйте нам заявку, заполнив форму с указанием всех конфигураций вашего ПК, и наш оператор свяжется с вами!<br/>
                      Для того, чтобы задать все вопросы и получить консультацию по проверке совместимости комплектующих, обратитесь в колл-центр по номеру +998 (71) 205-93-93</p>
                      <ContstructorForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </>
    </Layout>
  </>)
}