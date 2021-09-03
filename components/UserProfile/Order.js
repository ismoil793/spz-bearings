import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import "../../plugins/axios";
import Cookies from "universal-cookie";
import url from "../url";

const SendtoPay = props => (
  <a href={props.url}>
    <div className="control">
      <label className="checkout-label"></label>
      <button
     
        type="submit"
        className="btn btn-primary-dark-w px-5"
      >
        <span>Оплатить</span>
      </button>
    </div>
  </a>
);

export default class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myOrder: {}
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    //Myorders placing to a table
    setTimeout(() => {
      axios
        .get(`${url}/api/user/orders`, {
          params: {
            order_id: this.props.order_id
          }
        })
        .then(response => {
          this.setState({
            myOrder: response.data.data
          });
        })
        .catch(error => {
          notyf.error(error.data.message);
        });
    }, 10);
  }

  render() {
    const { myOrder } = this.state;


    return (
      <main id="content" role="main" className="checkout-page">
      <div className="bg-gray-13 bg-md-transparent">
        <div className="container">
          <div className="my-md-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                <li className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
             <a >Главная</a>
                </li>
                <li
                  className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active"
                  aria-current="page"
                >
                  Оплата заказа
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mb-5">
          <h1 className="text-center">Заказ № {myOrder.id}</h1>
        </div>
      </div>

     
        <div className="row">
          <div className="col-lg-6 order-lg-2 mb-7 mb-lg-0">
            <div className="pl-lg-3 ">
              <div className="bg-gray-1 rounded-lg">
                <div className="p-4 mb-4 checkout-table">
                  <div className="border-bottom border-color-1 mb-5">
                    <h3 className="section-title mb-0 pb-2 font-size-25">
                      Ваш заказ
                    </h3>
                  </div>

                  {typeof this.state.myOrder.cart == "object" ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="product-name"> &nbsp;</th>
                          <th className="product-name"> Продукт</th>
                          <th className="product-total">Цена</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.myOrder.cart.items
                          ? this.state.myOrder.cart.items.map(item => (
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
                            <strong>{this.state.myOrder.cart.total_with_discount.toString()
                                    .replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      " "
                                    )} сум</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  ) : null}

                  {this.state.myOrder.payment &&
                  (this.state.myOrder.payment.id === 2 || this.state.myOrder.payment.id === 3) ? (
                    <div>
                      <div className="checkout-title">
                        <h2>Произвести оплату</h2>
                      </div>
                      <SendtoPay url={this.state.myOrder.url} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-lg-2 mb-7 mb-lg-0">
            <div className="pl-lg-3 ">
              <div className="bg-gray-1 rounded-lg">
                <div className="p-4 mb-4 checkout-table">
                  <div className="pb-2 mb-2">
                    <div className="border-bottom border-color-1 mb-5">
                      <h3 className="section-title mb-0 pb-2 font-size-25">
                       Статус
                      </h3>
                    </div>
                    <p>
                    
                      <b>Создан:</b> {myOrder.created_at}
                    </p>
                    {typeof myOrder.payment == "object" ? (
                      <p>
                        <b>Метод оплаты:</b> {myOrder.payment.name}
                      </p>
                    ) : null}

                    {typeof myOrder.state == "object" ? (
                      <p>
                        <b>Статус:</b> {myOrder.state.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="pb-1 mb-1">
                    <div className="border-bottom border-color-1 mb-5">
                      <h3 className="section-title mb-0 pb-2 font-size-25">
                        Доставка
                      </h3>
                    </div>
                    <div className="checkout-title">
                      {typeof myOrder.delivery == "object" ? (
                        <p>
                          
                          <b> Способ доставки:</b>
                          {myOrder.delivery.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="checkout-title">
                      {typeof myOrder.address == "object" ? (
                        <p>
                          <b>Адрес доставки:</b>{" "}
                          {myOrder.address
                            ? myOrder.address.region.city.name
                            : null}
                          ,{" "}
                          {myOrder.address
                            ? myOrder.address.region.name
                            : null}
                          , {myOrder.address ? myOrder.address.address : null}
                        </p>
                      ) : null}
                    </div>
                    <div className="checkout-title">
                      {typeof myOrder.user == "object" ? (
                        <p>
                          <b>Контактный номер:</b> +{myOrder.user.phone}
                        </p>
                      ) : null}
                    </div>
                    <div className="checkout-title">
                      {typeof myOrder.user == "object" ? (
                        <p>
                          <b>Контактное лицо:</b>{" "}
                          {myOrder.user.first_name} {myOrder.user.last_name}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
    </main>

      );
  }
}
