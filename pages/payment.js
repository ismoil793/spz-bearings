import { useRouter } from "next/router";
import Layout from "../components/Layout/layout/layout.component";
import Head from "next/head";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import url from "../components/url";
export default function policyPage() {
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
        <title>Способы оплаты и доставки</title>
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
          href="/static/assets/template/avtech/styles/bootstrap4/bootstrap.min.css"
        />
        <link
          href="/static/assets/template/avtech/plugins/fontawesome-free-5.0.1/css/fontawesome-all.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/blog_single_styles.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/template/avtech/styles/blog_single_responsive.css"
        />
      </Head>
      <div className="super_container">
        <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
          <div className="container">
            <div className="row">
              <div className="col">
                <p>&nbsp;</p>
                <p>
                  <strong>Способы оплаты и доставки</strong>
                </p>
                <br />
                <p>
                  <strong>Способы оплаты для физ.лиц.: </strong>
                </p>
                <p>
                  Для того, чтобы оплатить товар, который Вы выбрали и добавили
                  в "Корзину" необходимо:{" "}
                </p>
                <p>1. Нажать кнопку купить </p>
                <p>
                  2. В новом окне появится «Контактная информация» и «Способы
                  доставки», которые Вам необходимо заполнить.
                </p>
                <p>
                  3. Вы можете выбрать более подходящий для Вас способ оплаты:
                </p>
                <p>
                  - Оплата на месте: наличный расчет, либо посредством UzCard по
                  терминалу;
                </p>
                <p>- Оплата через платёжные системы, такие как CLICK и Payme</p>
                <p>
                  <strong>Способы оплаты для юр.лиц.: </strong>
                </p>
                <p>- Возможна оплата перечислением.</p>
                <p>
                  Для этого свяжитесь с нашим менеджером по номеру 998 (99)
                  916-1771. Либо обратитесь в наш call-центр для оформления
                  заказа: 71 205 93 93.
                </p>
                <br /> <br />
                <p>
                  <strong>Доставка</strong>
                </p>
                <p>
                  Доставка может осуществляться в буние дни с 10:00 до 19:00, в
                  выходные дни с 10.00 до 17.00
                </p>
                <p>
                  Доставка осуществляется по адресу, указанному при оформлении
                  заказа. В случае, если адрес доставки изменился, оповестите об
                  этом операторов Колл Центра по номеру +99871205-93-93.
                  Сделайте это до того, как курьер начнет осуществлять процедуру
                  доставки.
                </p>
                <p>
                  Доставка осуществляется следующим образом, в зависимости от
                  того, в какое время был оформлен заказ:
                </p>
                <p>В Ташкент:</p>
                <ul>
                  <p>
                    <li>
                      <strong>Бесплатная доставка:</strong>
                      <ul>
                        <li>
                          Доставка в пределах города Ташкент осуществляется в
                          течение 48 рабочих часов.
                        </li>
                      </ul>
                    </li>
                  </p>
                </ul>
                <p>&nbsp;</p>
              </div>{" "}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}
