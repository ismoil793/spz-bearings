import { useRouter } from "next/router";
import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../components/url";
export default function newsPage() {
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
  return (
    <>
      <Head>
        <title>Новость</title>
        <link
          rel="icon"
          href="/static/assets/template/avtech/images/favicon.png"
          type="image/x-icon"
        />
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/blog_single_responsive.css"
        />
      </Head>
      <div className="super_container">
        <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
          <>
            <div className="home">
              <div
                className="home_background parallax-window"
                data-parallax="scroll"
                data-image-src="images/blog_single_background.jpg"
                data-speed="0.8"
              ></div>
            </div>

            <div className="single_post">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 offset-lg-2">
                    <div className="single_post_title">
                      XI Международная промышленная ярмарка и Кооперационной
                      биржи
                    </div>
                    <div className="single_post_text">
                      <p>
                        Группа компаний торговой марки «AVTECH» приглашает Вас
                        посетить Отраслевую промышленную ярмарку и
                        Кооперационную биржу Комплекса по вопросам образования и
                        науки, молодежной политики, культуры, информационных
                        систем и телекоммуникаций, в которой наша компания
                        примет участие. Период проведения ярмарки с 5-7 апреля
                        2017г., Павильон №3 в ОАО НВК «Узэкспоцентр». Вашему
                        вниманию будут представлены: - компьютеры; - новейшие
                        модели моноблоков; .
                      </p>

                      <div className="single_post_quote text-center">
                        {/* <div className="quote_image"><img src="images/quote.png" alt=""/></div> */}
                        <div className="quote_text">
                          Будем рады видеть Вас в числе наших гостей на ярмарке!
                          За дополнительной информацией Вы можете обращаться по
                          телефонам: +99871 2003366 Адрес места проведения
                          ярмарки «Узэкспоцентр»: Республика Узбекистан, 100084,
                          г.Ташкент, ул. Амира Темура, 107. Тел: (99871)
                          234-45-45, 238-56-11, факс: (99871) 234-54-40,
                          234-40-88. e-mail: info@uzexpocentre.uz, Ориентир:
                          станция метро «Бодомзор», гостиница «International
                          Hotel Tashkent».
                        </div>
                        <div className="quote_name">Ахмаджон Абдуллажанов</div>
                      </div>

                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="blog">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="blog_posts d-flex flex-row align-items-start justify-content-between">
                      <div className="blog_post">
                        <div
                          className="blog_image"
                          style={{
                            backgroundImage:
                              "url(" +
                              "../../static/assets/template/avtech/images/blog_1.jpg" +
                              ")"
                          }}
                        ></div>
                        <div className="blog_text">С праздником 9 Мая!</div>
                        <div className="blog_button">
                          <Link href="newspage">
                            <a href="blog_single.html">Прочитать</a>
                          </Link>
                        </div>
                      </div>

                      <div className="blog_post">
                        <div
                          className="blog_image"
                          style={{
                            backgroundImage:
                              "url(" +
                              "../../static/assets/template/avtech/images/blog_4.jpg" +
                              ")"
                          }}
                        ></div>
                        <div className="blog_text">
                          Avtech подготовила подарки и бонусы на Новый год!
                        </div>
                        <div className="blog_button">
                          <Link href="newspage">
                            <a href="blog_single.html">Прочитать</a>
                          </Link>
                        </div>
                      </div>

                      <div className="blog_post">
                        <div
                          className="blog_image"
                          style={{
                            backgroundImage:
                              "url(" +
                              "../../static/assets/template/avtech/images/blog_5.jpg" +
                              ")"
                          }}
                        ></div>
                        <div className="blog_text">
                          Начни учебный год вместе с Avtech!
                        </div>
                        <div className="blog_button">
                          <Link href="newspage">
                            <a href="blog_single.html">Прочитать</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Layout>
      </div>
    </>
  );
}
