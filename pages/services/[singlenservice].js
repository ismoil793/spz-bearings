import { useRouter } from "next/router";
import { connect } from "react-redux";

import * as actions from "../../redux/actions/";
import BreadCrumb from "../../components/BreadCrumb";
import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../../components/url";
import Link from "next/link";


function PostService({ data, setProductCategory, isLoading }) {


  return (
    <>
      <Head>
        <title>{'Технический центр'}</title>
        <meta charset="UTF-8" />
        <meta name="description" content={'Технический центр'} />
        <meta name="keywords" content={'Технический центр'} />
          
        <meta
          name="google-site-verification"
          content="3kTZ1AFA-Ys6DV-oZgCXUqlfNqsP6r2YJ0mpAmcaL-k"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="/static/assets/template/avtech/images/favicon.png"
          type="image/x-icon"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/product_responsive.css"
        />
      </Head>
      <div className="super_container">
            <div id={`preloader`} className={`preloader ${isLoading ? '' : "load_coplate"}`}>
              <div class="product_name">Bearings</div>
            </div>  
        <Layout title={'Технический центр'} pageInfo={['Главная', "Сервисы", "Технический Центр"]}>
          <>
          <section class="service_details_area pt_200">
            <div class="container">
                <div class="row service_details_img">
                    <div class="col-lg-12"> <img class="img-fluid" src="/static/assets/img/img/about/single-service-1.jpg" alt=""/>
                    </div>
                    <div class="col-md-4 col-sm-6"> <img class="img-fluid" src="/static/assets/img/img/about/single-service-2.jpg"
                            alt=""/> </div>
                    <div class="col-md-4 col-sm-6"> <img class="img-fluid" src="/static/assets/img/img/about/single-service-3.jpg"
                            alt=""/> </div>
                    <div class="col-md-4 col-sm-6"> <img class="img-fluid" src="/static/assets/img/img/about/single-service-4.jpg"
                            alt=""/> </div>
                </div>
                <div class="service_details_text">
                    <div class="row">
                        <div class="col-lg-7 col-md-7">
                            <div class="left">
                                <h3>Технический Центр</h3>
                                <p>На заводе имеется технический отдел и конструкторское бюро, состоящие из
                                    высококвалифицированных специалистов, которые ведут разработку и совершенствование
                                    продукции на основе современных инженерных решений.
                                </p>
                                <p>Высококвалифицированные специалисты нашего предприятия выполняют комплекс работ,
                                    связанных с проектированием, изготовлением, монтажом, накладкой и пуском в работу
                                    разных оборудований в соответствии со стандартом, изучая потребности потребителя.
                                </p>
                                <p>Значительный исследовательский потенциал позволяет предприятию постоянно расширять
                                    номенклатуру своей продукции, производить подшипниковую и иную продукцию по чертежам
                                    заказчика.
                                </p>
                                <p>Предприятие имеет возможность изготовления разных роликов, шариков, валы, шестерни и
                                    другие детали сложной конфигурации, нестандартное оборудование, поддерживающие
                                    конвейерные ролики и опорные ролики.
                                </p>
                                <a class="theme_btn theme_btn_three hover_style1" href="#">Контакты</a>
                            </div>
                        </div>
                        <div class="col-lg-5 col-md-5">
                            <div class="right_brochure">
                                <h5>Примеры</h5> <a href="#">Скачать примеры работ<i
                                        class="fas fa-download"></i></a> <a href="#">Скачать пример тех задания <i
                                        class="fas fa-download"></i></a> <img class="img-fluid"
                                    src="/static/assets/img/img/about/service-d-call.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
          </>
        </Layout>
      </div>
    </>
  );
}



export default PostService;
