import React from "react";
import Link from "next/link";
import axios from "axios";
import "../../plugins/axios";
import Cookies from "universal-cookie";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Router from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import url from "../url";
import InputMask from "react-input-mask";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;

export default class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      // Anauthentificated
      phoneNumber: "",
      code: null,
      isSend: false,

      // Cart
      cartProducts: [],
      cartnum: "",
      totalPrice: "",
      total_with_discount: "",

      // Delivery
      deliveryID: "",
      deliveries: [],

      cities: [],
      regions: [],

      cityID: null,
      regionID: null,

      name: "",
      phone: "",
      full_name: "",
      address: "",
      region_id: "",
      addressID: "",

      // Payment
      payments: [],
      paymentID: "",

      // Order
      order: {},

      // Toggle
      isLoading: true,
      isAuth: true,
      isCoupon: false,

      //xls 
      showDownloadTable: false
    };
  }

  SingleAddress = () => {
    if (this.state.addressID) {
      axios
        .get(`${url}/api/user/address`, {
          params: {
            address_id: this.state.addressID
          }
        })
        .then(response => {
          this.setState({
            name: response.data.data.name,
            phone: response.data.data.phone,
            full_name: response.data.data.full_name,
            address: response.data.data.address,
            regionID: response.data.data.region.id,
            cityID: response.data.data.region.city.id
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleChange = e => {
    this.setState(
      { [e.target.name]: e.target.value },
      () => this.SingleAddress(),
      this.Region()
    );
  };

  // ***************   Phone Verification for unauthentificated User   *************** //

  PhoneSend = e => {
    const notyf = new Notyf();
    e.preventDefault();
    const { phoneNumber } = this.state;
    axios({
      method: "post",
      url: `${url}/api/auth/code/update`,
      data: {
        phone: phoneNumber.replace(/\s/g, "").replace("+", "")
      }
    })
      .then(response => {
        notyf.success("Пароль был отправлен");
        this.setState({ isSend: true });
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  // ***************  Code Verification for unauthentificated User   *************** //

  CodeSend = e => {
    e.preventDefault();
    const notyf = new Notyf();
    const { phoneNumber, code } = this.state;
    const cookies = new Cookies();
    axios({
      method: "post",
      url: `${url}/api/auth/verify`,
      data: {
        phone: phoneNumber.replace(/\s/g, "").replace("+", ""),
        code: code
      }
    })
      .then(response => {
        notyf.success("Вы успешно прошли проверку");
        cookies.set("user_key", response.data.key);
        cookies.set("user_id", response.data.id);
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  // ***************   After City select call the Regions of chosen city    *************** //

  Region = e => {
    // e.preventDefault();

    let regionId = this.state.cityID;

    axios
      .get(`${url}/api/regions`, {
        params: {
          city_id: regionId
        }
      })
      .then(response => {
        this.setState({ regions: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  GetRegion = e => {
    e.preventDefault();

    let regionId = e.target.value;

    axios
      .get(`${url}/api/regions`, {
        params: {
          city_id: regionId
        }
      })
      .then(response => {
        this.setState({ regions: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  async componentDidMount() {
    const cookies = new Cookies();

    // ***************   Fetching Payments from Back-end   *************** //
    await axios
      .get(`${url}/api/order/payments`)
      .then(response => {
        this.setState({ payments: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    // ***************   Fetching Deliveries from Back-end   *************** //
    await axios
      .get(`${url}/api/order/deliveries`)
      .then(response => {
        this.setState({ deliveries: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    // ***************   Fetching Cities from Back-end   *************** //

    await axios
      .get(`${url}/api/cities`)
      .then(response => {
        this.setState({ cities: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    // ***************   Fetching Adresses of LoggedIn User from Back-end   *************** //

    await axios
      .get(`${url}/api/user/address`)
      .then(response => {
        this.setState({ addresses: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    await axios
      .get(`${url}/api/cart/show`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type")
        }
      })
      .then(response => {
        console.log(response)
        this.setState({
          cartnum: response.data.data.items,
          cartProducts: response.data.data,
          total_with_discount: response.data.data.total_with_discount
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " "),          
          totalPrice: response.data.data.total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " "),
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleAuth = () => {
    this.setState(prevState => ({
      isAuth: !prevState.isAuth
    }));
  };

  toggleCoupon = () => {
    this.setState(prevState => ({
      isCoupon: !prevState.isCoupon
    }));
  };

  CartShow = e => {
    const notyf = new Notyf();
    const cookies = new Cookies();
    e.preventDefault();
    if (this.state.code) {
      axios
        .get(`${url}/api/cart/show`, {
          params: {
            device_token: cookies.get("device_token"),
            device_type: cookies.get("device_type"),
            code: this.state.code
          }
        })
        .then(response => {
          this.setState({
            cartnum: response.data.data.items,
            cartProducts: response.data.data,
            total_with_discount: response.data.data.total_with_discount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          });
          notyf.success("Купон успешно применен");
        })
        .catch(error => {
          notyf.error(error.data.message);
        });
    } else {
      notyf.error("Введите код купона");
    }
  };

  MakeOrder = e => {
    const notyf = new Notyf();
    const cookies = new Cookies();

    e.preventDefault();
    axios({
      method: "post",
      url: `${url}/api/order/create`,
      data: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
        user_id: cookies.get("user_id"),
        user_key: cookies.get("user_key"),
        delivery_id: this.state.deliveryID,
        payment_id: this.state.paymentID,
        address_id: this.state.addressID ? this.state.addressID : "",
        address: {
          phone: this.state.phone.replace(/\s/g, "").replace("+", ""),
          name: this.state.name,
          full_name: this.state.full_name,
          address: this.state.address,
          region_id: this.state.regionID
        }
      }
    })
      .then(response => {
        cookies.remove("user_id");
        cookies.remove("user_key");
        this.setState({ order: response.data.data });
        notyf.success("Ваш заказ оформлен");

        setTimeout(() => {
          Router.push({
            pathname: `/checkout/${this.state.order.id}`,
            query: {
              user_phone: this.state.order.user.phone,
              order_id: this.state.order.id
            }
          });
        }, 100);
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  PaymentChanged = e => {
    e.preventDefault();
    this.setState(
      {
        paymentID: e.target.value
      },
      () => {
        console.log("what is it: " + this.state.paymentID);
      }
    );
  };

  DeliveryChanged = e => {
    this.setState(
      {
        deliveryID: e.target.value
      },
      () => {
        console.log("what is it: " + this.state.deliveryID);
      }
    );
  };

  render() {
    const {
      phoneNumber,
      code,
      cartProducts,
      cartnum,
      totalPrice,
      total_with_discount,

      order,

      regions,
      cities,
      cityID,
      regionID
    } = this.state;
    const cookies = new Cookies();
    return (
      <main id="content" role="main" className="checkout-page">
        <div className="bg-gray-13 bg-md-transparent">
          <div className="container">
            <div className="my-md-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                  <li className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
                    <a>Главная</a>
                  </li>
                  <li
                    className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active"
                    aria-current="page"
                  >
                    Покупка
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="mb-5">
            <h1 className="text-center">Оформить заказ</h1>
          </div>

          {cookies.get("access_token") ? (
            <div id="shopCartAccordion" className="accordion rounded mb-5">
              <div className="card border-0">
                <div
                  id="shopCartHeadingOne"
                  className="alert alert-primary mb-0"
                  role="alert"
                >
                  Выберите один из ранее указываемых вами адресов, <b>если хотите
                  заказать на новый адрес заполните поля ниже.</b>
                </div>

                <div
                  id="shopCartOne"
                  className="border border-top-0"
                  aria-labelledby="shopCartHeadingOne"
                  data-parent="#shopCartAccordion"
                >
                  <form className="js-validate p-5">
                    <div className="row">
                      <div className="col-lg-6">
                        {this.state.addresses && this.state.addresses.length ? (
                          <select
                            value={this.state.addressID}
                            name="addressID"
                            onChange={this.handleChange}
                            className="form-control js-select selectpicker dropdown-select pointer  right-dropdown-0 px-2 px-xl-0 btn-sm bg-white font-weight-normal py-2 border text-gray-20 bg-lg-down-transparent border-lg-down-0"
                          >
                            <option value="0">Выберите Адрес доставки</option>
                            {this.state.addresses.map(adres => (
                              <option key={adres.id} value={adres.id}>
                                {adres.name
                                  ? adres.name
                                  : `Адрес (${adres.address})`}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <h5>
                            У вас нету адресов, заполните нижеуказанные поля
                          </h5>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div id="shopCartAccordion" className="accordion rounded mb-5">
              <div className="card border-0">
                <div
                  id="shopCartHeadingOne"
                  className="alert alert-primary mb-0"
                  role="alert"
                >
                  Пройдите авторизавцию перед тем как оформить заказ{" "}
                  <a
                    onClick={this.toggleAuth}
                    className="alert-link"
                    data-toggle="collapse"
                    data-target="#shopCartOne"
                    aria-expanded="false"
                    aria-controls="shopCartOne"
                  >
                    Авторизоваться
                  </a>
                </div>
                {this.state.isAuth ? (
                  <div
                    id="shopCartOne"
                    className="border border-top-0"
                    aria-labelledby="shopCartHeadingOne"
                    data-parent="#shopCartAccordion"
                  >
                    <form className="js-validate p-5">
                      <div className="mb-5">
                        <p className="text-gray-90 mb-2">
                          Добро пожаловать! Введите номер телефона, если у вас
                          нет аккаунта.
                        </p>
                        <p className="text-gray-90">
                          Если у вас есть аккаунт то авторизуйтесь пожалуйста.
                        </p>
                      </div>

                      <div className="row">
                    
                        <div className="col-lg-6">
                        <form onSubmit={this.PhoneSend}>
                          <div className="js-form-message form-group">
                            <label
                              className="form-label"
                              for="signinSrEmailExample3"
                            >
                              Номер телефона
                            </label>
                            <InputMask
                              mask="999 99 999 99 99"
                              onChange={this.handleChange}
                              name="phoneNumber"
                              value={phoneNumber}
                              placeholder="Номер телефона"
                              className="form-control"
                              id="phone"
                              required
                            />
                          </div>
                          <div className="mb-1">
                          {!this.state.isSend ? (
                          <div className="mb-3">
                          <button
                            type="submit"
                            className="btn btn-primary-dark-w px-5"
                          >
                             Получить код 
                          </button>
                        </div>) : null}
                        
                           </div>
                          </form>
                        </div>
                       
                        {this.state.isSend ? (
                         
                        <div className="col-lg-6">
                         <form onSubmit={this.CodeSend}>
                          <div className="js-form-message form-group">
                            <label
                              className="form-label"
                              for="signinSrPasswordExample2"
                            >
                              Код верификации
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="code"
                              value={code}
                              onChange={this.handleChange}
                              id="signinSrPasswordExample2"
                           
                            />
                          </div>
                          <div className="mb-1">
                          {this.state.isSend ? (
                          <div className="mb-3">
                          <button
                            type="submit"
                            className="btn btn-primary-dark-w px-5"
                          >
                             Подтвердить код 
                          </button>
                        </div>) : null}
                        
                           </div>
                          </form>
                        </div>) :null}
                      </div>

                    
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* <div  id="shopCartAccordion1" className="accordion rounded mb-6">
            <div className="card border-0">
              <div
                id="shopCartHeadingTwo"
                className="alert alert-primary mb-0"
                role="alert"
              >
                У вас есть купон?{" "}
                <a
                  onClick={this.toggleCoupon}
                  className="alert-link"
                  data-toggle="collapse"
                  data-target="#shopCartTwo"
                  aria-expanded="false"
                  aria-controls="shopCartTwo"
                >
                 Нажмите сюда чтобы ввести купон
                </a>
              </div>
              {this.state.isCoupon ? (
              <div
                id="shopCartTwo"
                className="border border-top-0"
                aria-labelledby="shopCartHeadingTwo"
                data-parent="#shopCartAccordion1"
              >
                <form className="js-validate p-5" novalidate="novalidate">
                  <p className="w-100 text-gray-90">
                    Если у вас есть код купона, примените его ниже.
                  </p>
                  <div className="input-group input-group-pill max-width-660-xl">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Coupon code"
                      aria-label="Promo code"
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-block btn-dark font-weight-normal btn-pill px-4"
                      >
                        <i className="fas fa-tags d-md-none"></i>
                        <span className="d-none d-md-inline">Применить</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>) : null}
            </div>
          </div> */}

          <form className="js-validate" novalidate="novalidate">
            <div className="row">
              <div className="col-lg-6 order-lg-2 mb-7 mb-lg-0">
                <div className="pl-lg-3 ">
                  <div className="bg-gray-1 rounded-lg">
                    <div className="p-4 mb-4 checkout-table">
                      <div className="row border-bottom border-color-1 mb-5 table-header">
                        <div className="col-sm-5 pos-relative">
                        <h3 className={`table-header-title mb-0 pb-2 font-size-25 ${!this.state.showDownloadTable ? "section-title active" : ""}`} onClick={()=>this.setState({showDownloadTable:false})}>
                          Ваш заказ
                        </h3>
                        </div>
                        <div className="col-sm-7 pos-relative">
                        <h3 className={`table-header-title mb-0 pb-2 font-size-25 ${this.state.showDownloadTable ? "section-title active" : ""}`} onClick={()=>this.setState({showDownloadTable:true})}>
                          Подробная таблица
                        </h3>
                        </div>
                      </div>



                      { !this.state.showDownloadTable ?
                      <>
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="product-name"> &nbsp;</th>
                            <th className="product-name"> Продукт</th>
                            <th className="product-total">Цена <span style={{fontSize: '10px'}}>Без учета НДС</span></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.cartProducts.items
                            ? this.state.cartProducts.items.map(item => (
                                <tr className="cart_item">
                                  <td>
                                    <img
                                      src={
                                        item.product.images[0].types
                                          .small_default
                                      }
                                      alt=""
                                    />
                                  </td>
                                  <td>
                                    {item.product.name}&nbsp;
                                    <strong className="product-quantity">
                                      × {item.quantity}
                                    </strong>
                                  </td>
                                  <td>
                                    {item.total_with_discount
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    сум
                                  </td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                        <tfoot>
                       
                          <tr>
                            <th>Всего</th>
                            <td>
                              <strong>{this.state.total_with_discount} сум</strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>

                      <div className="border-top border-width-3 border-color-1 pt-3 mb-3">
                        <div id="basicsAccordion1">
                          {this.state.payments
                            ? this.state.payments.map((pay, k) => (
                                <div
                                  key={pay.id}
                                  className="border-bottom border-color-1 border-dotted-bottom"
                                >
                                  <div className="p-3" id="basicsHeadingOne">
                                    <div className="custom-control custom-radio">
                                      <input
                                        type="radio"
                                        className="custom-control-input"
                                        id={`stylishRadio${k}`}
                                        value={pay.id}
                                        checked={this.state.paymentID == pay.id}
                                        onChange={this.PaymentChanged}
                                      />
                                      <label
                                        className="custom-control-label form-label"
                                        for={`stylishRadio${k}`}
                                      >
                                        {pay.name}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                      <div className="form-group d-flex align-items-center justify-content-between px-3 mb-5">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck10"
                            required
                            data-msg="Please agree terms and conditions."
                            data-error-className="u-has-error"
                            data-success-className="u-has-success"
                          />
                          <label
                            className="form-check-label form-label"
                            for="defaultCheck10"
                          >
                            Я согласен с условиями соглашения{" "}
                            <a href="#" className="text-blue">
                              и политикой сайта
                            </a>
                            <span className="text-danger">*</span>
                          </label>
                        </div>
                      </div> 
                      </>  :      
                      <>                   
                      <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button btn btn-primary btn-sm"
                      table="test_table_download"
                      filename="tablexls"
                      sheet="tablexls"
                      buttonText="Скачать в формате XLS"/>                    
                      <table responsive className="table_test downloading_table" id="test_table_download" cellPadding="4" cellSpacing="2" border="1px" style={{width:"100%", border:"1px solid black"}}>
                      <tr className="table_row" width="100%">
                        <th className="table_xls_th_header" colSpan="6" style={{width:"100%", border:"1px solid black"}}>Коммерческое предложение</th>
                      </tr>
                      <tr className="table_row">
                        <th className="table_xls_th element_1" width="45">№ п/п</th>
                        <th className="table_xls_th element_2" width="130">Наименование</th>
                        <th className="table_xls_th element_3" width="90">Фото</th>
                        <th className="table_xls_th element_4" width="68">Кол-во (шт)</th>
                        <th className="table_xls_th element_5" width="116">Цена (UZS)</th>
                        <th className="table_xls_th element_6" width="164">Общая сумма (UZS)</th>
                      </tr>

                        { this.state.cartProducts.items ? this.state.cartProducts.items.map((item, index) =>  {
                          return (
                          <tr className="table_row">
                            <th className="table_xls_th element_1" height="90">{index+1}</th>
                            <th className="table_xls_th element_2" height="90">{item.product.name}</th>
                            <th className="table_xls_th element_3" height="90">{``}<img marginTop="30"
                                  src={item.product.images[0].types.small_default}
                                  alt=""
                                />
                            </th>
                            <th className="table_xls_th element_4" height="90">{item.quantity}</th>
                            <th className="table_xls_th element_5" height="90">
                              {item.total_with_discount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                            </th>
                            <th className="table_xls_th element_6" height="90">
                              {(item.quantity*item.total_with_discount)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}</th>
                          </tr>
                          )
                        }) : null
                        }
                        <tr className="table_row">
                          <th className="table_xls_th_header" style={{width:"100%", border:"1px solid black"}} colSpan="6">Итоговая общая сумма составляет:</th>
                        </tr>
                        <tr className="table_row">
                          <td style={{width:"50%", border:"1px solid black"}} colSpan="3">Общая сумма заказа</td>
                          <td style={{width:"50%", border:"1px solid black"}} colSpan="3">Сумма заказа после применения скидки</td>
                        </tr>
                        <tr className="table_row" width="100%">
                      <td colSpan="3" style={{width:"50%", border:"1px solid black"}}>
                        {totalPrice
                          ? totalPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          : null} сум
                      </td>
                      <td colSpan="3" style={{width:"50%", border:"1px solid black"}}>
                        {total_with_discount
                          ? total_with_discount
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          : null} сум
                      </td>
                    </tr>

                      </table>
                      </> }





                      <button
                        onClick={this.MakeOrder}
                        type="submit"
                        className="btn btn-primary-dark-w btn-block btn-pill font-size-20 mb-3 py-3"
                      >
                        Оформить
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 order-lg-1">
                <div className="pb-1 mb-1">
                  <div className="border-bottom border-color-1 mb-5">
                    <h3 className="section-title mb-0 pb-2 font-size-25">
                      Адрес доставки
                    </h3>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="js-form-message mb-6">
                        <label className="form-label">
                          Назовите адрес
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                          placeholder="Например - Дом"
                          aria-label=""
                          required=""
                          data-msg="Please enter your frist name."
                          data-error-className="u-has-error"
                          data-success-className="u-has-success"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="js-form-message mb-6">
                        <label className="form-label">
                          Имя получателя
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="full_name"
                          value={this.state.full_name}
                          onChange={this.handleChange}
                          placeholder=""
                          aria-label=""
                          required=""
                          data-msg="Please enter your frist name."
                          data-error-className="u-has-error"
                          data-success-className="u-has-success"
                          autocomplete="off"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="js-form-message mb-6">
                        <label className="form-label">
                          Номер телефона получателя
                        </label>
                        <InputMask
                          mask="+999 99 999 99 99"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.handleChange}
                          placeholder=""
                          className="form-control"
                          id="phone"
                          required
                        />
                      </div>
                    </div>

                    <div className="w-100"></div>

                    <div className="col-md-6">
                      <div className="js-form-message mb-6">
                        <label className="form-label">
                          Город
                          <span className="text-danger">*</span>
                        </label>
                        {cities ? (
                          <select
                            onChange={this.GetRegion}
                            className="form-control js-select selectpicker dropdown-select pointer  right-dropdown-0 px-2 px-xl-0 btn-sm bg-white font-weight-normal py-2 border text-gray-20 bg-lg-down-transparent border-lg-down-0"
                            required
                            value={this.state.cityID}
                          >
                            <option value="Выберите Область">
                              Выберите Область
                            </option>
                            {cities.map(city => (
                              <option key={city.id} value={city.id}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="js-form-message mb-6">
                        <label className="form-label">
                          Регион
                          <span className="text-danger">*</span>
                        </label>

                        <select
                          onChange={this.handleChange}
                          value={regionID}
                          name="regionID"
                          className="form-control js-select selectpicker dropdown-select pointer  right-dropdown-0  btn-sm bg-white font-weight-normal  border text-gray-20 bg-lg-down-transparent border-lg-down-0"
                          required
                        >
                          <option value="Выберите Город">Выберите Город</option>
                          {regions
                            ? regions.map(region => (
                                <option key={region.id} value={region.id}>
                                  {region.name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="js-form-message mb-6">
                        <label className="form-label">
                          Адрес
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={this.state.address}
                          onChange={this.handleChange}
                          placeholder=""
                          required=""
                        />
                      </div>
                    </div>

                    <div className="w-100"></div>
                  </div>

                  {/* <div className="js-form-message mb-6">
                    <label className="form-label">
                      Примечания (необязательно)
                    </label>

                    <div className="input-group">
                      <textarea
                        className="form-control p-5"
                        rows="4"
                        name="text"
                        placeholder="Примечания о вашем заказе, например специальные заметки для доставки."
                      ></textarea>
                    </div>
                  </div> */}
                </div>

                <div className="pb-7 mb-7">
                  <div className="border-bottom border-color-1 mb-5">
                    <h3 className="section-title mb-0 pb-2 font-size-25">
                      Способ доставки
                    </h3>
                  </div>

                  <div className="row">
                    {this.state.deliveries
                      ? this.state.deliveries.map(deliver => (
                          <div key={deliver.id} className="col-md-6">
                            <label>
                              <input
                                value={deliver.id}
                                checked={this.state.deliveryID == deliver.id}
                                onChange={this.DeliveryChanged}
                                type="radio"
                                name="radio66"
                                id="sad"
                              />
                              <div
                                className={
                                  this.state.deliveryID == deliver.id
                                    ? "mini-card checked"
                                    : "mini-card "
                                }
                              >
                                <img
                                  style={{ width: "15%" }}
                                  src={`/static/assets/img/money/${deliver.id}.png`}
                                  alt={deliver.name}
                                />

                                <div className="state p-info-o">
                                  <div className="shipping-method">
                                    <b>{deliver.name} </b> <br/>
                                    <span>{deliver.description} </span>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        ))
                      : null}

                    <div className="w-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
