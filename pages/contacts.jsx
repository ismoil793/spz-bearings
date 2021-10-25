import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";
import React, {useState} from "react";
import OverlayComponent from "../components/Layout/overlay/overlay.component";
import ContactsText from '../static/locales/contacts'
import FadeLeft from "../components/Animations/FadeLeft";
import Fade from "../components/Animations/Fade";
import {Notyf} from "notyf";
import 'notyf/notyf.min.css';
import axios from "axios";

export function getStaticProps({locale}) {
   return {
      props: {
         locale
      }
   }
}


export default function Contact(props) {

   const initialState = {
      name: '',
      email: '',
      message: ''
   }

   const [formData, setFormData] = useState(initialState)

   const contactSubmit = e => {
      e.preventDefault()
      // https://api.telegram.org/bot1918916703:AAG5YeCqYZuB_j7g0swevqzQ1UvvmrB-mmY/getUpdates
      const {name, message, email} = formData
      const token = "2098100893:AAHDgyzZQy7Ia3X4TOUurjSLsQxRHXOdmas"
      const chat_id = "-703301534"
      const text = "Client: " + name + "%0AEmail: " + email + "%0A%0A" + message

      axios.get(`https://api.telegram.org/bot${token}/sendMessage?text=${text}&chat_id=${chat_id}`)
          .then((r) => {
             const notyf = new Notyf()
             notyf.success(ContactsText[props.locale].contactSuccess)
             setFormData(initialState)
          })
   }

   const onFormDataChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value})
   }

   return (
       <>
          <Head>
             <title>{ContactsText[props.locale].pageTitle}</title>
             <link
                 rel="icon"
                 href="/static/assets/img/img/favicon.ico"
                 type="image/x-icon"
             />
             <meta charSet="utf-8"/>
             <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>

             <meta name="viewport" content="width=device-width, initial-scale=1"/>

             <link
                 rel="stylesheet"
                 type="text/css"
                 href={"/static/assets/template/avtech/styles/blog_single_responsive.css"}
             />
          </Head>
          <div
              className={`pace ${
                  props.isLoading ? "pace-active" : "pace-inactive"
              }`}
          >
             <div
                 className="pace-progress"
                 data-progress-text="100%"
                 data-progress="99"
                 style={{transform: "translate3d(100%, 0px, 0px)"}}
             >
                <div className="pace-progress-inner">
                </div>
             </div>
             <div className="ace-activity">
             </div>
          </div>

          <div className="body_wrapper main_index">
             <div
                 id={`preloader`}
                 className={`preloader ${props.isLoading ? "" : "load_coplate"}`}
             >
                <div
                    className={`product_name ${
                        props.isLoading ? "" : "load_coplate"
                    }`}
                >
                   SPZ Bearings
                </div>
             </div>
          </div>
          <div className="super_container">

             <Layout
                 isLoading={props.isLoading}
                 videoPreloader={props.videoPreloader}
                 title={ContactsText[props.locale].breadcrumb.main}
                 pageInfo={[`${ContactsText[props.locale].breadcrumb.crumbs[0]}`, `${ContactsText[props.locale].breadcrumb.crumbs[1]}`]}
                 locale={props.locale}
             >
                <main id="content" role="main">
                   <OverlayComponent isLoading={props.isLoading} locale={props.locale}/>
                   <section className="cons_contact_area_two map_area">
                      <img
                          className="map img-fluid"
                          src="/static/assets/img/img/home-six/uzb-map.png"
                          alt=""
                      />
                      <div className="container">
                         <div className="row cons_contact_info_two">
                            {/*<div className="map_dot">*/}
                            {/*   <div className="map_marker one">*/}
                            {/*      <span>*/}
                            {/*      </span>*/}
                            {/*   </div>*/}
                            {/*</div>*/}
                            <div className="col-lg-6">
                               <div className="cons_about_content pr_100">
                                  <FadeLeft>
                                     <h6 className="title_top">{ContactsText[props.locale].adress_section.title}</h6>
                                     <h2 className="title_head">
                                        {ContactsText[props.locale].adress_section.adress}
                                     </h2>
                                     <h6 className="title_top">{ContactsText[props.locale].phone_section.title}</h6>
                                  </FadeLeft>
                                  <FadeLeft delay={0.5}>
                                     <ul className="contacts_ul">
                                        <li className="contacts_li">{ContactsText[props.locale].phone_section.numbers[0].position}</li>
                                        <li className="contacts_li_phones text_btn">+(99874) 755-20-04</li>
                                        <li className="contacts_li">{ContactsText[props.locale].phone_section.numbers[1].position}</li>
                                        <li className="contacts_li_phones text_btn">+(99874) 755-18-57</li>
                                        <li className="contacts_li">{ContactsText[props.locale].phone_section.numbers[2].position}</li>
                                        <li className="contacts_li_phones text_btn">+(99874) 755-23-59</li>
                                        <li className="contacts_li_phones text_btn">+(99899) 557-77-75</li>
                                     </ul>
                                     <p>
                                        <i className="far fa-clock"/> 7/7: 9:00 - 18:00
                                     </p>
                                  </FadeLeft>
                               </div>
                            </div>
                            <div className="col-lg-6">
                               <Fade scale={0.5}>
                                  <form onSubmit={contactSubmit} className="contact_form">
                                     <div className="form-group">
                                        <input
                                            type="text"
                                            name={'name'}
                                            value={formData.name}
                                            onChange={onFormDataChange}
                                            required
                                            className="form-control"
                                            placeholder={`${ContactsText[props.locale].form_section[0]}`}
                                        />
                                     </div>
                                     <div className="form-group">
                                        <input
                                            type="email"
                                            name={'email'}
                                            value={formData.email}
                                            onChange={onFormDataChange}
                                            required
                                            className="form-control"
                                            placeholder={`${ContactsText[props.locale].form_section[1]}`}
                                        />
                                     </div>
                                     <div className="form-group">
                                     <textarea
                                         className="form-control"
                                         name="message"
                                         value={formData.message}
                                         onChange={onFormDataChange}
                                         required
                                         id="message"
                                         cols="30"
                                         rows="10"
                                         placeholder={`${ContactsText[props.locale].form_section[2]}`}
                                     >
                                     </textarea>
                                     </div>
                                     <div className="form-group">
                                        <button
                                            type="submit"
                                            className="theme_btn theme_btn_three hover_style1"
                                        >
                                           {`${ContactsText[props.locale].form_section[3]}`}
                                        </button>
                                     </div>
                                  </form>
                               </Fade>
                            </div>
                         </div>
                      </div>
                   </section>
                </main>
             </Layout>
          </div>
       </>
   );
}
