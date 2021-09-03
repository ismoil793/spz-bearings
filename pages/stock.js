import { useRouter } from "next/router";
import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../components/url";
export default function aboutPage() {
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
        <title>Kitmach Premium - Акция </title>
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
            <div className="single_post">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 offset-lg-2">
                    <div className="single_post_text">
                      <div className="single_post_quote ">
                        <p
                          className="text-center"
                          style={{ fontWeight: "900" }}
                        >
                          {" "}
                          Стартует 4-й тур нашего розыгрыша - 1 000 000 сум
                          каждую неделю.
                        </p>

                        <div className="quote_text text-left">
                          ⠀
                          <span style={{ fontWeight: "500" }}>
                            Условия очень просты:
                          </span>{" "}
                          <br />
                          <span style={{ fontWeight: "500" }}>1.</span>{" "}
                          Подпишитесь на наши странички:
                          <br />
                          <span style={{ fontWeight: "500" }}>
                            <a href="https://www.instagram.com/Kitmach Premiumuzofficial/">
                              https://www.instagram.com/Kitmach Premiumuzofficial/{" "}
                            </a>{" "}
                          </span>
                          <br />
                          <span style={{ fontWeight: "500" }}>
                            <a href="https://www.facebook.com/Kitmach Premiumuzofficial/">
                              https://www.facebook.com/Kitmach Premiumuzofficial/{" "}
                            </a>{" "}
                          </span>
                          <br />
                          <span style={{ fontWeight: "500" }}>
                            <a href="https://t.me/Kitmach Premiumuzofficial/">
                              https://t.me/Kitmach Premiumuzofficial{" "}
                            </a>{" "}
                          </span>
                          <br />
                          <span style={{ fontWeight: "500" }}>2.</span>{" "}
                          Зарегистрируйтесь на сайте Kitmach Premium.UZ, где Вам
                          будет присвоен уникальный ID номер.
                          <br />
                          <span style={{ fontWeight: "500" }}>3.</span> Напишите
                          в комментариях под конкурсным постом свой ID номер и
                          отметьте 3-х друзей в комментариях.
                          <br />
                          <span style={{ fontWeight: "500" }}>4.</span>{" "}
                          Поделитесь в Сториз (Instagram) / поделитесь этой
                          публикацией (Facebook) ⠀ Победителя мы выберем с
                          помощью специальной программы.
                          <br />
                          Важно! Необходимо выполнить все пункты!
                          <br />
                          <br />
                          31 мая, ровно в 23:59 мы остановим конкурс и выберем
                          одного победителя с 2-х наших страничек по уникальному
                          ID, который получит купон на 1 000 000 сум и сможет
                          выбрать товар на эту сумму на нашем сайте! Еще 1
                          неделя мы будем проводить этот конкурс для вас.
                          Сделайте себе приятный подарок!
                          <br />
                          Срок акции с 4 мая по 31 мая!
                        </div>
                        <div className="footer_social text-center">
                          <ul>
                            <li>
                              <a href="https://www.facebook.com/Kitmach Premiumuzofficial/">
                                <img
                                  className="socials"
                                  src="/static/assets/template/avtech/images/socials/facebook.png"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.instagram.com/Kitmach Premiumuzofficial/">
                                <img
                                  className="socials"
                                  src="/static/assets/template/avtech/images/socials/instagram.png"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="https://t.me/Kitmach Premiumuzofficial">
                                <img
                                  className="socials"
                                  src="/static/assets/template/avtech/images/socials/telegram.png"
                                  alt=""
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <p></p>
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
