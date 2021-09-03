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
export default function ContactPage() {
  const router = useRouter();
  const [phone, setPhone] = React.useState("");
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
        <title>Отследить товар</title>
        <link
          rel="icon"
          href="/static/assets/template/avtech/images/favicon.png"
          type="image/x-icon"
        />
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout compareNumber={compareNumber} cartNumber={cartNumber}>
        <main id="content" role="main">
          <BreadCrumb />
          <div class="container">
            <div class="mx-xl-10">
              <div class="mb-6 text-center">
                <h1 class="mb-6">Отследить ваш заказ</h1>
                <p class="text-gray-90 px-xl-10">
                  Для отслеживания вашего заказа, пожалуйста, введите ваш
                  идентификатор заказа в поле ниже и нажмите кнопку «Отследить».
                  Номер заказа вы можете посмотреть в вашем личном кабинете.
                </p>
              </div>
              <div class="my-4 my-xl-8">
                <form class="js-validate" novalidate="novalidate">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <div class="js-form-message form-group">
                        <label class="form-label" for="orderid">
                          Идентификатор заказа (ID)
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="text"
                          id="orderid"
                          placeholder="ID заказа вы можете посмотреть в вашем личном кабинете."
                          aria-label=" ID заказа вы можете посмотреть в вашем личном кабинете."
                        />
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <div class="js-form-message form-group">
                        <label class="form-label" for="billingemail">
                          Номер телефона
                        </label>
                        <InputMask
                          mask="+999 99 999 99 99"
                          type="text"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="Ваш номер телефона"
                          className="form-control"
                          id="phone"
                          required
                        />
                      </div>
                    </div>

                    <div class="col mb-1">
                      <button
                        type="button"
                        class="btn btn-soft-secondary mb-3 mb-md-0 font-weight-normal px-5 px-md-4 px-lg-5 w-100 w-md-auto"
                      >
                        Отследить
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
