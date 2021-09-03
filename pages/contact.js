import { useRouter } from "next/router";
import Layout from "../components/Layout/layout/layout.component";
import BreadCrumb from "../components/BreadCrumb";
import Head from "next/head";
import ContactForm from "../components/ContactForm/ContactForm";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import InputMask from "react-input-mask";
import url from "../components/url";
import YandexMap from "../components/YandexMap/yandexMap";
export default function ContactPage() {
  const router = useRouter();
  const [cartNumber, setCartNumber] = React.useState(0);
  const [compareNumber, setCompareNumber] = React.useState(0);

  useEffect(() => {
    const cookies = new Cookies();
    axios
      .get(`${url}/api/cart/show`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type")
        }
      })
      .then(response => {
        setCartNumber(response.data.data.items.length);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${url}/api/comparison/features`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type")
        }
      })
      .then(response => {
        setCompareNumber(response.data.data.products.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  //   const router = useRouter();

  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };
  return (
    <>
      <Head>
        <title>Контакты</title>
        <link
          rel="icon"
          href="/static/assets/template/avtech/images/favicon.png"
          type="image/x-icon"
        />
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/contact_responsive.css"
        />
      </Head>
      <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
      
        
        <main id="content" role="main">
        <BreadCrumb />
            {/* <div className="mb-8">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835252972956!2d144.95592398991224!3d-37.817327693787625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649:0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1575470633967!5m2!1sen!2sin" width="100%" height="514" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
            </div> */}

            <div className="container">
                <div className="row mb-10">
                    <div className="col-md-8 col-xl-9">
                        <div className="mr-xl-6">
                            <div className="border-bottom border-color-1 mb-5">
                                <h3 className="section-title mb-0 pb-2 font-size-25">Оставьте нам сообщение</h3>
                            </div>
                            <p className="max-width-830-xl text-gray-90">Мы будем рады вашим отзывам.</p>
                            <form className="js-validate" novalidate="novalidate">
                                <div className="row">
                                    <div className="col-md-6">
                                       
                                        <div className="js-form-message mb-4">
                                            <label className="form-label">
                                                Имя
                                                <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" className="form-control" name="firstName" placeholder="" aria-label="" required="" data-msg="" data-error-className="u-has-error" data-success-className="u-has-success" autocomplete="off"/>
                                        </div>
                                       
                                    </div>

                                    <div className="col-md-6">
                                      
                                        <div className="js-form-message mb-4">
                                            <label className="form-label">
                                                Номер телефона
                                                <span className="text-danger">*</span>
                                            </label>
                                            <InputMask
                              mask="+999 99 999 99 99"
                              // onChange={this.handleChange}
                              // name="phone"
                              // value={phone}
                              placeholder="Ваш номер телефона"
                              className="form-control"
                              id="phone"
                              required
                            />
                                         
                                        </div>
                                       
                                    </div>

                                    <div className="col-md-12">
                                       
                                        <div className="js-form-message mb-4">
                                            <label className="form-label">
                                               Email
                                            </label>
                                            <input type="email" className="form-control" name="" placeholder="" aria-label="" data-msg="" data-error-className="u-has-error" data-success-className="u-has-success"/>
                                        </div>
                                       
                                    </div>
                                    <div className="col-md-12">
                                        <div className="js-form-message mb-4">
                                            <label className="form-label">
                                                Ваше сообщение
                                            </label>

                                            <div className="input-group">
                                                <textarea className="form-control p-5" rows="4" name="text" placeholder=""></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary-dark-w px-5">Отправить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4 col-xl-3">
                        <div className="border-bottom border-color-1 mb-5">
                            <h3 className="section-title mb-0 pb-2 font-size-25">Наши магазины </h3>
                        </div>
                        
                        <div className="mr-xl-6">
                        <h5 className="font-size-14 font-weight-bold mb-3">Контакты</h5>
                            <p>998 99 802 74 00 </p>
                            <p>998 71 241 02 41</p>
                        <h5 className="font-size-14 font-weight-bold mb-3">Адреса</h5>
                            <address className="mb-6">
                            <span style={{fontWeight: '900'}}>Адрес:</span>: город Ташкент, Шайхантахурский район, ул. Абая 13А. <br/>
                            <span style={{fontWeight: '900'}}>Ориентир: </span>  Рядом с "Абай корзинка"
                           
                            <br/>
                            <br/>
                            <span style={{fontWeight: '900'}}>Адрес:</span> город Ташкент, Учтепинский район, ул. Фархад, Г30 блок 8.<br/>
                            <span style={{fontWeight: '900'}}>Ориентир: </span> На территории Фархадского рынка
                          
                            <br/>
                            <br/>
                            <span style={{fontWeight: '900'}}>Адрес:</span> город Ташкент, Яшнаабадский район, ул. Тол арык, 67.<br/>
                            <span style={{fontWeight: '900'}}>Ориентир: </span>  Рынок “Янгиабад”
                           
                            <br/>
                            <br/>

                            <br/>
                            <br/>
                            <span style={{fontWeight: '900'}}>Адрес:</span> город Ташкент, Бунёдкор проспект, 156А. Рынок Абу Сахий, магазин G-153.<br/>
                            <span style={{fontWeight: '900'}}>Ориентир: </span>  Рынок “Абу Сахий”
                           
                            <br/>
                            <br/>
                              
                            </address>
                            <h5 className="font-size-14 font-weight-bold mb-3">Часы работы</h5>
                            <ul className="list-unstyled mb-6">
                                <li className="flex-center-between mb-1"><span className="">Понедельник:</span><span className="">9:00 - 19:00</span></li>
                                <li className="flex-center-between mb-1"><span className="">Вторник:</span><span className="">9:00 - 19:00</span></li>
                                <li className="flex-center-between mb-1"><span className="">Среда:</span><span className="">9:00 - 19:00</span></li>
                                <li className="flex-center-between mb-1"><span className="">Четверг:</span><span className="">9:00 - 19:00</span></li>
                                <li className="flex-center-between mb-1"><span className="">Пятница:</span><span className="">9:00 - 19:00</span></li>
                                <li className="flex-center-between mb-1"><span className="">Суббота:</span><span className="">9:00 - 19:00</span></li>
                                <li className="flex-center-between"><span className="">Воскресенье</span><span className="">Закрыто</span></li>
                            </ul>
                            <h5 className="font-size-14 font-weight-bold mb-3">Сотрудничество</h5>
                            <p className="text-gray-90">По поводу сотрудничества пишите на нашу электронную почту: <a className="text-blue text-decoration-on" href="mailto:contact@yourstore.com">kitmachpremium@gmail.com</a></p>
                        </div>
                    </div>
                </div>
             
            </div>

            <YandexMap />
        </main>
       

      </Layout>
    </>
  );
}
